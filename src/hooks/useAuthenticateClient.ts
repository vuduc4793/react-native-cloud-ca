import type {
  AuthenticateClientParams,
  AuthenticateClientResponse,
  CustomError,
} from 'lib/typescript';
import { useState, useCallback } from 'react';
import { authenticateClient } from 'react-native-cloud-ca';

type AuthenticateClientFunc = (params: AuthenticateClientParams) => void;

type AuthenticateClientReturn = [
  AuthenticateClientResponse | null,
  CustomError | null,
  AuthenticateClientFunc,
  boolean
];

const useAuthenticateClient = (): AuthenticateClientReturn => {
  const [result, setResult] = useState<AuthenticateClientResponse | null>(null);
  const [error, setError] = useState<CustomError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const authenticateClientFunc = useCallback(
    async (params: AuthenticateClientParams) => {
      try {
        setIsLoading(true);
        const response = await authenticateClient(params);
        setResult(response);
      } catch (e) {
        setError(e as CustomError);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return [result, error, authenticateClientFunc, isLoading];
};

export default useAuthenticateClient;
