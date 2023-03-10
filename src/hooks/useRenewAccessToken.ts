import { useState, useCallback } from 'react';
import { renewAccessToken } from 'react-native-cloud-ca';
import type {
  CustomError,
  RenewAccessTokenParams,
  RenewAccessTokenResponse,
} from 'lib/typescript';

type RenewAccessTokenFunc = (params: RenewAccessTokenParams) => void;

type RenewAccessTokenReturn = [
  RenewAccessTokenResponse | null,
  CustomError | null,
  RenewAccessTokenFunc,
  boolean
];

const useRenewAccessToken = (): RenewAccessTokenReturn => {
  const [result, setResult] = useState<RenewAccessTokenResponse | null>(null);
  const [error, setError] = useState<CustomError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const renewAccessTokenFunc = useCallback(
    async (params: RenewAccessTokenParams) => {
      try {
        setIsLoading(true);
        const response = await renewAccessToken(params);
        setResult(response);
      } catch (e) {
        setError(e as CustomError);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return [result, error, renewAccessTokenFunc, isLoading];
};

export default useRenewAccessToken;
