import { useState, useCallback } from 'react';
import { deleteDeviceForPushNotification } from 'react-native-cloud-ca';
import type {
  BaseResponse,
  CustomError,
  DeleteDeviceForPushNotificationParams,
} from 'react-native-cloud-ca';

type DeleteDeviceForPushNotificationFunc = (
  params: DeleteDeviceForPushNotificationParams
) => void;

type DeleteDeviceForPushNotificationReturn = [
  BaseResponse | null,
  CustomError | null,
  DeleteDeviceForPushNotificationFunc,
  boolean
];

const useDeleteDeviceForPushNotification =
  (): DeleteDeviceForPushNotificationReturn => {
    const [result, setResult] = useState<BaseResponse | null>(null);
    const [error, setError] = useState<CustomError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteDeviceForPushNotificationFunc = useCallback(
      async (params: DeleteDeviceForPushNotificationParams) => {
        try {
          setIsLoading(true);
          const response = await deleteDeviceForPushNotification(params);
          setResult(response);
        } catch (e) {
          setError(e as CustomError);
        } finally {
          setIsLoading(false);
        }
      },
      []
    );

    return [result, error, deleteDeviceForPushNotificationFunc, isLoading];
  };

export default useDeleteDeviceForPushNotification;
