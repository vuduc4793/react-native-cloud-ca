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
  CustomError | null,
  RegisterDeviceForPushNotificationFunc,
  boolean
];

const useRegisterDeviceForPushNotification =
  (): RegisterDeviceForPushNotificationReturn => {
    const [result, setResult] = useState<BaseResponse | null>(null);
    const [error, setError] = useState<CustomError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const registerDeviceForPushNotificationFunc = useCallback(
      async (params: RegisterDeviceForPushNotificationParams) => {
        try {
          setIsLoading(true);
          const response = await registerDeviceForPushNotification(params);
          setResult(response);
        } catch (e) {
          setError(e as CustomError);
        } finally {
          setIsLoading(false);
        }
      },
      []
    );

    return [result, error, registerDeviceForPushNotificationFunc, isLoading];
  };

export default useRegisterDeviceForPushNotification;
