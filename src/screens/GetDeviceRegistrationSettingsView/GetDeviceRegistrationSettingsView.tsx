import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import {
  CustomError,
  Dialogue,
  GetDeviceRegistrationSettingsResponse,
  Header,
  InfoField,
  Loading,
  getDeviceRegistrationSettings,
} from 'react-native-cloud-ca';
import type { GetDeviceRegistrationSettingsViewProps } from './types';

const GetDeviceRegistrationSettingsView = (
  props: GetDeviceRegistrationSettingsViewProps
) => {
  const { goBack, headerProps } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState<string>('');
  const [deviceInfo, setDeviceInfo] =
    useState<GetDeviceRegistrationSettingsResponse>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const result = await getDeviceRegistrationSettings();
        setDeviceInfo(result);
        setIsLoading(false);
      } catch (error) {
        setIsShowError(true);
        setErrorResponse((error as CustomError)?.message);
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <Header {...headerProps} label="Thông tin tài khoản" goBack={goBack} />
      <View style={styles.contentContainer}>
        <InfoField
          title="Kiểu mã hoá"
          info={deviceInfo?.device_key_type || ''}
        />
        <InfoField
          title="Kích thước"
          info={deviceInfo?.device_key_type || ''}
        />
        <InfoField
          title="Yêu cầu xác thực sinh trắc học"
          info={deviceInfo?.biometric_required ? 'Bắt buộc' : 'Không bắt buộc'}
        />
        <InfoField
          title="Giới hạn thiết bị đăng ký"
          info={
            parseInt(deviceInfo?.allowed_devices!, 10) <= 0
              ? 'Không giới hạn'
              : 'Hiển thị số đó'
          }
        />
      </View>
      <Dialogue
        modalType="ERROR"
        onClose={() => setIsShowError(false)}
        visible={isShowError}
      >
        <Text style={styles.contentStyle}>{errorResponse}</Text>
      </Dialogue>
      {isLoading && <Loading />}
    </View>
  );
};

export default GetDeviceRegistrationSettingsView;
