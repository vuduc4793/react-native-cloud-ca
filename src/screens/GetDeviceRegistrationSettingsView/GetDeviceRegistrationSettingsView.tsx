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
  validateToken,
} from 'react-native-cloud-ca';
import type {
  GetDeviceRegistrationSettingsAllResponse,
  GetDeviceRegistrationSettingsViewProps,
} from './types';

const GetDeviceRegistrationSettingsView = (
  props: GetDeviceRegistrationSettingsViewProps
) => {
  const { goBack, headerProps, onDone } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState<string>('');
  const [deviceInfo, setDeviceInfo] =
    useState<GetDeviceRegistrationSettingsResponse>();
  const [allResponse, setAllResponse] =
    useState<GetDeviceRegistrationSettingsAllResponse>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        await validateToken();
        const result = await getDeviceRegistrationSettings();
        setDeviceInfo(result);
        setAllResponse({
          ...allResponse,
          getDeviceRegistrationSettingsResponse: result,
        });
        setIsLoading(false);
      } catch (error) {
        setIsShowError(true);
        setErrorResponse(`${(error as CustomError)?.message}`);
        setAllResponse({ ...allResponse, error: error as CustomError });
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onDone?.(allResponse!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allResponse]);

  return (
    <View style={styles.container}>
      <Header
        {...headerProps}
        label="Thông tin cấu hình cài đặt"
        goBack={goBack}
      />
      <View style={styles.contentContainer}>
        <InfoField
          title="Kiểu mã hoá"
          info={deviceInfo?.device_key_type || ''}
        />
        <InfoField
          title="Kích thước"
          info={deviceInfo?.device_key_size?.toString() || ''}
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
              : deviceInfo?.allowed_devices!
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
