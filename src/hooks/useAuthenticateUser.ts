import { useState, useCallback } from 'react';
import { authenticateUser } from 'react-native-cloud-ca';
import type {
  AuthenticateUserResponse,
  CustomError,
} from 'react-native-cloud-ca';

type AuthenticateUserFunc = () => void;

type AuthenticateUserReturn = [
  AuthenticateUserResponse | null,
  CustomError | null,
  AuthenticateUserFunc,
  boolean
];

const useAuthenticateUser = (): AuthenticateUserReturn => {
  const [result, setResult] = useState<AuthenticateUserResponse | null>(null);
  const [error, setError] = useState<CustomError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const authenticateUserFunc = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await authenticateUser();
      setResult(response);
    } catch (e) {
      setError(e as CustomError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [result, error, authenticateUserFunc, isLoading];
};

export default useAuthenticateUser;
