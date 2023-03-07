import { useState, useCallback } from 'react';
import { deleteDevice } from 'react-native-cloud-ca';
import type { BaseResponse, CustomError, DeleteDeviceParams } from 'src/types';

type DeleteDeviceFunc = (params: DeleteDeviceParams) => void;

type DeleteDeviceReturn = [
  BaseResponse | null,
  string | null,
  DeleteDeviceFunc
];

const useDeleteDevice = (): DeleteDeviceReturn => {
  const [result, setResult] = useState<BaseResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const deleteDeviceFunc = useCallback(async (params: DeleteDeviceParams) => {
    try {
      const response = await deleteDevice(params);
      setResult(response);
    } catch (e) {
      setError((e as CustomError)?.error);
    }
  }, []);

  return [result, error, deleteDeviceFunc];
};

export default useDeleteDevice;
