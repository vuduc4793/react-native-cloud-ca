import React, { useState } from 'react';
import type {
  DeviceRegistrationProps,
  DeviceRegistrationResponse,
} from './types';
import { TouchableOpacity, Text, TextInput, View } from 'react-native';
import {
  CloudCAProviderContext,
  CustomError,
  Dialogue,
  DialogueConfirm,
  Loading,
  authenticateClient,
  authenticateUser,
  registerDevice,
  verifyOTP,
} from 'react-native-cloud-ca';
import styles from './styles';
import { KeyboardAvoidingView } from 'react-native';

const MAX_LENGTH_OTP = 6;

const DeviceRegistrationView = (props: DeviceRegistrationProps) => {
  const { buttonLabel, onDone, children, registerDeviceParams, ...rest } =
    props;

  const cloudCAProviderContext = React.useContext(CloudCAProviderContext);
  const { themeColor } = cloudCAProviderContext;
  const [isShowRequestRegister, setIsShowRequestRegister] =
    useState<boolean>(false);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [isShowSuccess, setIsShowSuccess] = useState<boolean>(false);
  const [isShowOtp, setIsShowOtp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState<string>('');
  const [successResponse, setSuccessResponse] = useState<string>('');
  const [otpSms, setOtpSms] = useState<string>('');
  const [otpTimeLeft, setOtpTimeLeft] = React.useState(0);
  const [allResult, setAllResult] = useState<DeviceRegistrationResponse>();

  React.useEffect(() => {
    if (otpTimeLeft === 0) return;
    const intervalId = setInterval(() => {
      setOtpTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [otpTimeLeft]);

  const handleShowRequestRegister = (state: boolean) => {
    setIsShowRequestRegister(state);
  };

  const onRegister = async () => {
    setIsLoading(true);
    try {
      const authenticateClientResult = await authenticateClient();
      setAllResult({
        ...allResult,
        authenticateClientResponse: authenticateClientResult,
      });
      await getOtp();
      handleShowRequestRegister(false);
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
      setErrorResponse((error as CustomError)?.message);
      handleShowRequestRegister(false);
      setIsShowError(true);
      setIsLoading(false);
    }
  };

  const getOtp = async () => {
    try {
      const authenticateUserResult = await authenticateUser();
      if (authenticateUserResult?.auth_type === 'OTP') {
        setOtpTimeLeft(120);
        setIsShowOtp(true);
      }
      setAllResult({
        ...allResult,
        authenticateUserResponse: authenticateUserResult,
      });
    } catch (error) {
      console.log('error', error);
      setErrorResponse((error as CustomError)?.message);
      setIsShowError(true);
    }
  };

  const onConfirmOtp = async () => {
    try {
      const otpResult = await verifyOTP({ otpSms: otpSms, otpMail: '' });
      setAllResult({
        ...allResult,
        verifyOTPResponse: otpResult,
      });
      setOtpSms('');
      setIsShowOtp(false);
      await onRegisterDevices();
    } catch (error) {
      setOtpSms('');
      setErrorResponse((error as CustomError)?.message);
      setIsShowError(true);
      setIsShowOtp(false);
    }
  };

  const onRegisterDevices = async () => {
    try {
      const result = await registerDevice(registerDeviceParams);
      setAllResult({
        ...allResult,
        registerDeviceResponse: result,
      });
      setSuccessResponse('Đã đăng ký thiết bị thành công');
      setIsShowSuccess(true);
    } catch (error) {
      setErrorResponse((error as CustomError)?.message);
      setIsShowError(true);
    }
  };

  const handleDone = () => {
    setIsShowSuccess(false);
    onDone?.(allResult!);
  };

  const renderChildren = () => {
    return <>{children ? children : <Text>{buttonLabel}</Text>}</>;
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => handleShowRequestRegister(true)}
        {...rest}
      >
        {renderChildren()}
      </TouchableOpacity>
      {isLoading && <Loading />}
      <Dialogue visible={isShowSuccess} onClose={handleDone}>
        <Text style={styles.contentStyle}>{successResponse}</Text>
      </Dialogue>
      <Dialogue
        modalType="ERROR"
        onClose={() => setIsShowError(false)}
        visible={isShowError}
      >
        <Text style={styles.contentStyle}>{errorResponse}</Text>
      </Dialogue>
      <DialogueConfirm
        title="Đăng ký thiết bị"
        closeOnPress={() => handleShowRequestRegister(false)}
        closeLabel="Bỏ qua"
        confirmOnPress={onRegister}
        confirmLabel="Tiếp tục"
        confirmDisable={isLoading}
        visible={isShowRequestRegister}
      >
        <Text style={styles.contentStyle}>
          Bạn có muốn đăng ký thiết bị này để uỷ quyền từ xa?
        </Text>
      </DialogueConfirm>
      <DialogueConfirm
        title="Xác thực người dùng"
        visible={isShowOtp}
        closeLabel="Bỏ qua"
        closeOnPress={() => setIsShowOtp(false)}
        confirmLabel="Tiếp tục"
        confirmOnPress={onConfirmOtp}
        confirmDisable={!(otpSms?.length <= MAX_LENGTH_OTP)}
      >
        <KeyboardAvoidingView style={styles.avoidContainer}>
          <Text style={styles.contentStyle}>
            Nhập mã xác thực được gửi về số điện thoại đã đăng ký
          </Text>
          <Text style={styles.otpLabel}>OTP</Text>
          <View style={styles.otpContainer}>
            <TextInput
              value={otpSms}
              onChangeText={setOtpSms}
              style={styles.otpInputContainer}
              keyboardType="number-pad"
              selectionColor={'#121517'}
              maxLength={MAX_LENGTH_OTP}
            />
            <TouchableOpacity disabled={otpTimeLeft !== 0} onPress={getOtp}>
              <Text style={[styles.resendText, { color: themeColor }]}>
                Gửi lại ({otpTimeLeft}s)
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </DialogueConfirm>
    </>
  );
};

export default DeviceRegistrationView;
