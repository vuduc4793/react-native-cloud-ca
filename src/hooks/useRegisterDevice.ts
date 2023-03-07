import { useState, useCallback } from 'react';
import { registerDevice } from 'react-native-cloud-ca';
import type {
  CustomError,
  RegisterDeviceParams,
  RegisterDeviceResponse,
} from 'src/types';

type RegisterDeviceFunc = (params: RegisterDeviceParams) => void;

type RegisterDeviceReturn = [
  RegisterDeviceResponse | null,
  string | null,
  RegisterDeviceFunc
];

const useRegisterDevice = (): RegisterDeviceReturn => {
  const [result, setResult] = useState<RegisterDeviceResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const registerDeviceFunc = useCallback(
    async (params: RegisterDeviceParams) => {
      try {
        const response = await registerDevice(params);
        setResult(response);
      } catch (e) {
        setError((e as CustomError)?.message);
      }
    },
    []
  );

  return [result, error, registerDeviceFunc];
};

export default useRegisterDevice;
