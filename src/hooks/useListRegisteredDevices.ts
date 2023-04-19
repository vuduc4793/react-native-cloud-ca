import { useState, useCallback } from 'react';
import { listRegisteredDevices } from 'react-native-cloud-ca';
import type {
  CustomError,
  ListRegisteredDevicesResponse,
} from 'react-native-cloud-ca';

type ListRegisteredDevicesFunc = () => void;

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

  const listRegisteredDevicesFunc = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await listRegisteredDevices();
      setResult(response);
    } catch (e) {
      setError(e as CustomError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [result, error, listRegisteredDevicesFunc, isLoading];
};

export default useListRegisteredDevices;
