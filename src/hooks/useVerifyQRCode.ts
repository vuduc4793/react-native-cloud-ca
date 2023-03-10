import { useState, useCallback } from 'react';
import { verifyQRCode } from 'react-native-cloud-ca';
import type {
  CustomError,
  VerifyQRCodeParams,
  VerifyQRCodeResponse,
} from 'lib/typescript';

type VerifyQRCodeFunc = (params: VerifyQRCodeParams) => void;

type VerifyQRCodeReturn = [
  VerifyQRCodeResponse | null,
  CustomError | null,
  VerifyQRCodeFunc,
  boolean
];

const useVerifyQRCode = (): VerifyQRCodeReturn => {
  const [result, setResult] = useState<VerifyQRCodeResponse | null>(null);
  const [error, setError] = useState<CustomError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const verifyQRCodeFunc = useCallback(async (params: VerifyQRCodeParams) => {
    try {
      setIsLoading(true);
      const response = await verifyQRCode(params);
      setResult(response);
    } catch (e) {
      setError(e as CustomError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [result, error, verifyQRCodeFunc, isLoading];
};

export default useVerifyQRCode;
