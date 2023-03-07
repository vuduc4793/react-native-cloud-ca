import { useState, useCallback } from 'react';
import { authenticateUser } from 'react-native-cloud-ca';
import type {
  AuthenticateUserParams,
  AuthenticateUserResponse,
  CustomError,
} from 'src/types';

type AuthenticateUserFunc = (params: AuthenticateUserParams) => void;

type AuthenticateUserReturn = [
  AuthenticateUserResponse | null,
  string | null,
  AuthenticateUserFunc
];

const useAuthenticateUser = (): AuthenticateUserReturn => {
  const [result, setResult] = useState<AuthenticateUserResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const authenticateUserFunc = useCallback(
    async (params: AuthenticateUserParams) => {
      try {
        const response = await authenticateUser(params);
        setResult(response);
      } catch (e) {
        setError((e as CustomError)?.message);
      }
    },
    []
  );

  return [result, error, authenticateUserFunc];
};

export default useAuthenticateUser;
