import { useState, useCallback } from 'react';
import { verifyOTP } from 'react-native-cloud-ca';
import type {
  CustomError,
  VerifyOTPParams,
  VerifyOTPResponse,
} from 'react-native-cloud-ca';

type VerifyOTPFunc = (params: VerifyOTPParams) => void;

type VerifyOTPReturn = [
  VerifyOTPResponse | null,
  CustomError | null,
  VerifyOTPFunc,
  boolean
];

const useVerifyOTP = (): VerifyOTPReturn => {
  const [result, setResult] = useState<VerifyOTPResponse | null>(null);
  const [error, setError] = useState<CustomError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const verifyOTPFunc = useCallback(async (params: VerifyOTPParams) => {
    try {
      setIsLoading(true);
      const response = await verifyOTP(params);
      setResult(response);
    } catch (e) {
      setError(e as CustomError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [result, error, verifyOTPFunc, isLoading];
};

export default useVerifyOTP;
