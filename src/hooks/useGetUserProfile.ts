import { useState, useCallback } from 'react';
import { getUserProfile } from 'react-native-cloud-ca';

import type {
  CustomError,
  GetUserProfileParams,
  GetUserProfileResponse,
} from 'react-native-cloud-ca';

type GetUserProfileFunc = (params?: GetUserProfileParams) => void;

type GetUserProfileReturn = [
  GetUserProfileResponse | null,
  CustomError | null,
  GetUserProfileFunc,
  boolean
];

const useGetUserProfile = (): GetUserProfileReturn => {
  const [result, setResult] = useState<GetUserProfileResponse | null>(null);
  const [error, setError] = useState<CustomError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUserProfileFunc = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getUserProfile();
      setResult(response);
    } catch (e) {
      setError(e as CustomError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [result, error, getUserProfileFunc, isLoading];
};

export default useGetUserProfile;
