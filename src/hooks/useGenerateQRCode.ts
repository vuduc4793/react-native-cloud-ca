import { useState, useCallback } from 'react';
import { generateQRCode } from 'react-native-cloud-ca';

import type {
  CustomError,
  GenerateQRCodeParams,
  GenerateQRCodeResponse,
} from 'src/types';

type GenerateQRCodeFunc = (params: GenerateQRCodeParams) => void;

type GenerateQRCodeReturn = [
  GenerateQRCodeResponse | null,
  CustomError | null,
  GenerateQRCodeFunc,
  boolean
];

const useGenerateQRCode = (): GenerateQRCodeReturn => {
  const [result, setResult] = useState<GenerateQRCodeResponse | null>(null);
  const [error, setError] = useState<CustomError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateQRCodeFunc = useCallback(
    async (params: GenerateQRCodeParams) => {
      try {
        setIsLoading(true);
        const response = await generateQRCode(params);
        setResult(response);
      } catch (e) {
        setError(e as CustomError);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return [result, error, generateQRCodeFunc, isLoading];
};

export default useGenerateQRCode;
