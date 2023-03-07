import { useState, useCallback } from 'react';
import { renewAccessToken } from 'react-native-cloud-ca';
import type {
  CustomError,
  RenewAccessTokenParams,
  RenewAccessTokenResponse,
} from 'src/types';

type RenewAccessTokenFunc = (params: RenewAccessTokenParams) => void;

type RenewAccessTokenReturn = [
  RenewAccessTokenResponse | null,
  string | null,
  RenewAccessTokenFunc
];

const useRenewAccessToken = (): RenewAccessTokenReturn => {
  const [result, setResult] = useState<RenewAccessTokenResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const renewAccessTokenFunc = useCallback(
    async (params: RenewAccessTokenParams) => {
      try {
        const response = await renewAccessToken(params);
        setResult(response);
      } catch (e) {
        setError((e as CustomError)?.error);
      }
    },
    []
  );

  return [result, error, renewAccessTokenFunc];
};

export default useRenewAccessToken;
