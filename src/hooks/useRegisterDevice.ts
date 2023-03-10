import { useState, useCallback } from 'react';
import {
  registerDevice,
  CustomError,
  RegisterDeviceParams,
  RegisterDeviceResponse,
} from 'react-native-cloud-ca';
// import type {
// } from 'lib/typescript';

type RegisterDeviceFunc = (params: RegisterDeviceParams) => void;

type RegisterDeviceReturn = [
  RegisterDeviceResponse | null,
  CustomError | null,
  RegisterDeviceFunc,
  boolean
];

const useRegisterDevice = (): RegisterDeviceReturn => {
  const [result, setResult] = useState<RegisterDeviceResponse | null>(null);
  const [error, setError] = useState<CustomError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const registerDeviceFunc = useCallback(
    async (params: RegisterDeviceParams) => {
      try {
        setIsLoading(true);
        const response = await registerDevice(params);
        setResult(response);
      } catch (e) {
        setError(e as CustomError);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return [result, error, registerDeviceFunc, isLoading];
};

export default useRegisterDevice;
