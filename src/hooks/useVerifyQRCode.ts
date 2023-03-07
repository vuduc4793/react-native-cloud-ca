import { useState, useCallback } from 'react';
import { verifyQRCode } from 'react-native-cloud-ca';
import type {
  CustomError,
  VerifyQRCodeParams,
  VerifyQRCodeResponse,
} from 'src/types';

type VerifyQRCodeFunc = (params: VerifyQRCodeParams) => void;

type VerifyQRCodeReturn = [
  VerifyQRCodeResponse | null,
  string | null,
  VerifyQRCodeFunc
];

const useVerifyQRCode = (): VerifyQRCodeReturn => {
  const [result, setResult] = useState<VerifyQRCodeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verifyQRCodeFunc = useCallback(async (params: VerifyQRCodeParams) => {
    try {
      const response = await verifyQRCode(params);
      setResult(response);
    } catch (e) {
      setError((e as CustomError)?.message);
    }
  }, []);

  return [result, error, verifyQRCodeFunc];
};

export default useVerifyQRCode;
