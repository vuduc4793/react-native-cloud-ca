import { useState, useCallback } from 'react';
import { verifyOTP } from 'react-native-cloud-ca';
import type {
  CustomError,
  VerifyOTPParams,
  VerifyOTPResponse,
} from 'src/types';

type VerifyOTPFunc = (params: VerifyOTPParams) => void;

type VerifyOTPReturn = [VerifyOTPResponse | null, string | null, VerifyOTPFunc];

const useVerifyOTP = (): VerifyOTPReturn => {
  const [result, setResult] = useState<VerifyOTPResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verifyOTPFunc = useCallback(async (params: VerifyOTPParams) => {
    try {
      const response = await verifyOTP(params);
      setResult(response);
    } catch (e) {
      setError((e as CustomError)?.message);
    }
  }, []);

  return [result, error, verifyOTPFunc];
};

export default useVerifyOTP;
