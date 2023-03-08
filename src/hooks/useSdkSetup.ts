import { useState, useCallback } from 'react';
import { sdkSetup } from 'react-native-cloud-ca';
import type { CustomError, SetupSDKParams } from 'src/types';

type SdkSetupFunc = (params?: SetupSDKParams) => void;

type SdkSetupReturn = [
  string | null,
  CustomError | null,
  SdkSetupFunc,
  boolean
];

const useSdkSetup = (): SdkSetupReturn => {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<CustomError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sdkSetupFunc = useCallback(async (params?: SetupSDKParams) => {
    try {
      setIsLoading(true);
      const response = await sdkSetup(params);
      setResult(response);
    } catch (e) {
      setError(e as CustomError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [result, error, sdkSetupFunc, isLoading];
};

export default useSdkSetup;
