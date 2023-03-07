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
  string | null,
  GenerateQRCodeFunc
];

const useGenerateQRCode = (): GenerateQRCodeReturn => {
  const [result, setResult] = useState<GenerateQRCodeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateQRCodeFunc = useCallback(
    async (params: GenerateQRCodeParams) => {
      try {
        const response = await generateQRCode(params);
        setResult(response);
      } catch (e) {
        setError((e as CustomError)?.message);
      }
    },
    []
  );

  return [result, error, generateQRCodeFunc];
};

export default useGenerateQRCode;
