import React, { useState } from 'react';
import type {
  DeviceRegistrationProps,
  DeviceRegistrationResponse,
} from './types';
import { TouchableOpacity, Text, TextInput, View } from 'react-native';
import {
  CustomError,
  Dialogue,
  DialogueConfirm,
  authenticateClient,
  authenticateUser,
  sdkSetup,
  verifyOTP,
} from 'react-native-cloud-ca';
import styles from './styles';

const DeviceRegistrationView = (props: DeviceRegistrationProps) => {
  const {
    buttonLabel,
    clientId,
    clientSecret,
    grantType,
    userId,
    onDone,
    ...rest
  } = props;

  const [isShowRequestRegister, setIsShowRequestRegister] =
    useState<boolean>(false);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [isShowSuccess, setIsShowSuccess] = useState<boolean>(false);
  const [isShowOtp, setIsShowOtp] = useState<boolean>(false);
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
    try {
      const settingSDK = await sdkSetup({
        baseUrl: 'https://remotesigning.viettel.vn',
      });
      console.log(settingSDK);
      const authenticateClientResult = await authenticateClient({
        clientId: clientId,
        clientSecret: clientSecret,
        grantType: grantType,
      });
      setAllResult({
        ...allResult,
        authenticateClientResponse: authenticateClientResult,
      });
      await getOtp();
      handleShowRequestRegister(false);
    } catch (error) {
      console.log('error', error);
      setErrorResponse((error as CustomError)?.message);
      handleShowRequestRegister(false);
      setIsShowError(true);
    }
  };

  const getOtp = async () => {
    try {
      const authenticateUserResult = await authenticateUser({
        userId: userId,
      });
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
      setSuccessResponse('Đã đăng ký thiết bị thành công');
      setIsShowOtp(false);
      setIsShowSuccess(true);
    } catch (error) {
      setErrorResponse((error as CustomError)?.message);
      setIsShowError(true);
      setIsShowOtp(false);
    }
  };

  const handleDone = () => {
    setIsShowSuccess(false);
    onDone?.(allResult!);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => handleShowRequestRegister(true)}
        {...rest}
      >
        <Text>{buttonLabel}</Text>
      </TouchableOpacity>
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
        visible={isShowRequestRegister}
      >
        <Text style={styles.contentStyle}>
          Bạn có muốn đăng ký thiết bị này để uỷ quyền từ xa
        </Text>
      </DialogueConfirm>
      <DialogueConfirm
        title="Xác thực người dùng"
        visible={isShowOtp}
        closeLabel="Bỏ qua"
        closeOnPress={() => setIsShowOtp(false)}
        confirmLabel="Tiếp tục"
        confirmOnPress={onConfirmOtp}
        confirmDisable={!(otpSms?.length > 0)}
      >
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
          />
          <TouchableOpacity disabled={otpTimeLeft !== 0} onPress={getOtp}>
            <Text style={styles.resendText}>Gửi lại ({otpTimeLeft}s)</Text>
          </TouchableOpacity>
        </View>
      </DialogueConfirm>
    </>
  );
};

export default DeviceRegistrationView;
