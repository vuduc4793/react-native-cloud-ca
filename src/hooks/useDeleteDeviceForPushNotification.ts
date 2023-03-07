import { useState, useCallback } from 'react';
import { deleteDeviceForPushNotification } from 'react-native-cloud-ca';
import type {
  BaseResponse,
  CustomError,
  DeleteDeviceForPushNotificationParams,
} from 'src/types';

type DeleteDeviceForPushNotificationFunc = (
  params: DeleteDeviceForPushNotificationParams
) => void;

type DeleteDeviceForPushNotificationReturn = [
  BaseResponse | null,
  string | null,
  DeleteDeviceForPushNotificationFunc
];

const useDeleteDeviceForPushNotification =
  (): DeleteDeviceForPushNotificationReturn => {
    const [result, setResult] = useState<BaseResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const deleteDeviceForPushNotificationFunc = useCallback(
      async (params: DeleteDeviceForPushNotificationParams) => {
        try {
          const response = await deleteDeviceForPushNotification(params);
          setResult(response);
        } catch (e) {
          setError((e as CustomError)?.message);
        }
      },
      []
    );

    return [result, error, deleteDeviceForPushNotificationFunc];
  };

export default useDeleteDeviceForPushNotification;
