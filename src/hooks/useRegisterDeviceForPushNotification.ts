import { useState, useCallback } from 'react';
import { registerDeviceForPushNotification } from 'react-native-cloud-ca';
import type {
  BaseResponse,
  CustomError,
  RegisterDeviceForPushNotificationParams,
} from 'src/types';

type RegisterDeviceForPushNotificationFunc = (
  params: RegisterDeviceForPushNotificationParams
) => void;

type RegisterDeviceForPushNotificationReturn = [
  BaseResponse | null,
  string | null,
  RegisterDeviceForPushNotificationFunc
];

const useRegisterDeviceForPushNotification =
  (): RegisterDeviceForPushNotificationReturn => {
    const [result, setResult] = useState<BaseResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const registerDeviceForPushNotificationFunc = useCallback(
      async (params: RegisterDeviceForPushNotificationParams) => {
        try {
          const response = await registerDeviceForPushNotification(params);
          setResult(response);
        } catch (e) {
          setError((e as CustomError)?.message);
        }
      },
      []
    );

    return [result, error, registerDeviceForPushNotificationFunc];
  };

export default useRegisterDeviceForPushNotification;
