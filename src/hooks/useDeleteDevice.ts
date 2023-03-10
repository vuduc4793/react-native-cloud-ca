import { useState, useCallback } from 'react';
import { deleteDevice } from 'react-native-cloud-ca';
import type {
  BaseResponse,
  CustomError,
  DeleteDeviceParams,
} from 'react-native-cloud-ca';

type DeleteDeviceFunc = (params: DeleteDeviceParams) => void;

type DeleteDeviceReturn = [
  BaseResponse | null,
  CustomError | null,
  DeleteDeviceFunc,
  boolean
];

const useDeleteDevice = (): DeleteDeviceReturn => {
  const [result, setResult] = useState<BaseResponse | null>(null);
  const [error, setError] = useState<CustomError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteDeviceFunc = useCallback(async (params: DeleteDeviceParams) => {
    try {
      setIsLoading(true);
      const response = await deleteDevice(params);
      setResult(response);
    } catch (e) {
      setError(e as CustomError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [result, error, deleteDeviceFunc, isLoading];
};

export default useDeleteDevice;
