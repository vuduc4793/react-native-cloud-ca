import type {
  AuthenticateClientResponse,
  CustomError,
} from 'react-native-cloud-ca';
import { useState, useCallback } from 'react';
import { authenticateClient } from 'react-native-cloud-ca';

type AuthenticateClientFunc = () => void;

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

  const authenticateClientFunc = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await authenticateClient();
      setResult(response);
    } catch (e) {
      setError(e as CustomError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [result, error, authenticateClientFunc, isLoading];
};

export default useAuthenticateClient;
