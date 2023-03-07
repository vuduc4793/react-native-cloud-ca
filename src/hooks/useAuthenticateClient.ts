import { useState, useCallback } from 'react';
import { authenticateClient } from 'react-native-cloud-ca';
import type {
  CustomError,
  AuthenticateClientParams,
  AuthenticateClientResponse,
} from 'src/types';

type AuthenticateClientFunc = (params: AuthenticateClientParams) => void;

type AuthenticateClientReturn = [
  AuthenticateClientResponse | null,
  string | null,
  AuthenticateClientFunc
];

const useAuthenticateClient = (): AuthenticateClientReturn => {
  const [result, setResult] = useState<AuthenticateClientResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const authenticateClientFunc = useCallback(
    async (params: AuthenticateClientParams) => {
      try {
        const response = await authenticateClient(params);
        setResult(response);
      } catch (e) {
        setError((e as CustomError)?.error);
      }
    },
    []
  );

  return [result, error, authenticateClientFunc];
};

export default useAuthenticateClient;
