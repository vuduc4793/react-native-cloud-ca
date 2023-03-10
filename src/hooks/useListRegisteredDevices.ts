import { useState, useCallback } from 'react';
import { listRegisteredDevices } from 'react-native-cloud-ca';
import type {
  CustomError,
  ListRegisteredDevicesParams,
  ListRegisteredDevicesResponse,
} from 'lib/typescript';

type ListRegisteredDevicesFunc = (params: ListRegisteredDevicesParams) => void;

type ListRegisteredDevicesReturn = [
  ListRegisteredDevicesResponse | null,
  CustomError | null,
  ListRegisteredDevicesFunc,
  boolean
];

const useListRegisteredDevices = (): ListRegisteredDevicesReturn => {
  const [result, setResult] = useState<ListRegisteredDevicesResponse | null>(
    null
  );
  const [error, setError] = useState<CustomError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const listRegisteredDevicesFunc = useCallback(
    async (params: ListRegisteredDevicesParams) => {
      try {
        setIsLoading(true);
        const response = await listRegisteredDevices(params);
        setResult(response);
      } catch (e) {
        setError(e as CustomError);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return [result, error, listRegisteredDevicesFunc, isLoading];
};

export default useListRegisteredDevices;
