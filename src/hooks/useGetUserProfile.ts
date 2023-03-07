import { useState, useCallback } from 'react';
import { getUserProfile } from 'react-native-cloud-ca';

import type {
  CustomError,
  GetUserProfileParams,
  GetUserProfileResponse,
} from 'src/types';

type GetUserProfileFunc = (params?: GetUserProfileParams) => void;

type GetUserProfileReturn = [
  GetUserProfileResponse | null,
  string | null,
  GetUserProfileFunc
];

const useGetUserProfile = (): GetUserProfileReturn => {
  const [result, setResult] = useState<GetUserProfileResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getUserProfileFunc = useCallback(
    async (params?: GetUserProfileParams) => {
      try {
        const response = await getUserProfile(params);
        setResult(response);
      } catch (e) {
        setError((e as CustomError)?.message);
      }
    },
    []
  );

  return [result, error, getUserProfileFunc];
};

export default useGetUserProfile;
