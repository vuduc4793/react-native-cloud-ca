import { useState, useCallback } from 'react';
import { sdkSetup } from 'react-native-cloud-ca';
import type { CustomError, SetupSDKParams } from 'src/types';

type SdkSetupFunc = (params?: SetupSDKParams) => void;

type SdkSetupReturn = [string | null, string | null, SdkSetupFunc];

const useSdkSetup = (): SdkSetupReturn => {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sdkSetupFunc = useCallback(async (params?: SetupSDKParams) => {
    try {
      const response = await sdkSetup(params);
      setResult(response);
    } catch (e) {
      setError((e as CustomError)?.message);
    }
  }, []);

  return [result, error, sdkSetupFunc];
};

export default useSdkSetup;
