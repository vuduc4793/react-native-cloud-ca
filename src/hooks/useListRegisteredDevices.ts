import { useState, useCallback } from 'react';
import { listRegisteredDevices } from 'react-native-cloud-ca';
import type {
  CustomError,
  ListRegisteredDevicesParams,
  ListRegisteredDevicesResponse,
} from 'src/types';

type ListRegisteredDevicesFunc = (params: ListRegisteredDevicesParams) => void;

type ListRegisteredDevicesReturn = [
  ListRegisteredDevicesResponse | null,
  string | null,
  ListRegisteredDevicesFunc
];

const useListRegisteredDevices = (): ListRegisteredDevicesReturn => {
  const [result, setResult] = useState<ListRegisteredDevicesResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const listRegisteredDevicesFunc = useCallback(
    async (params: ListRegisteredDevicesParams) => {
      try {
        const response = await listRegisteredDevices(params);
        setResult(response);
      } catch (e) {
        setError((e as CustomError)?.error);
      }
    },
    []
  );

  return [result, error, listRegisteredDevicesFunc];
};

export default useListRegisteredDevices;
