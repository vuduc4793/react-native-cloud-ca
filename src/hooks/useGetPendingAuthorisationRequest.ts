import { useState, useCallback } from 'react';
import { getPendingAuthorisationRequest } from 'react-native-cloud-ca';
import type {
  CustomError,
  GetPendingAuthorisationRequestParams,
  GetPendingAuthorisationRequestResponse,
} from 'src/types';

type GetPendingAuthorisationRequestFunc = (
  params?: GetPendingAuthorisationRequestParams
) => void;

type GetPendingAuthorisationRequestReturn = [
  GetPendingAuthorisationRequestResponse | null,
  CustomError | null,
  GetPendingAuthorisationRequestFunc,
  boolean
];

const useGetPendingAuthorisationRequest =
  (): GetPendingAuthorisationRequestReturn => {
    const [result, setResult] =
      useState<GetPendingAuthorisationRequestResponse | null>(null);
    const [error, setError] = useState<CustomError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getPendingAuthorisationRequestFunc = useCallback(
      async (params?: GetPendingAuthorisationRequestParams) => {
        try {
          setIsLoading(true);
          const response = await getPendingAuthorisationRequest(params);
          setResult(response);
        } catch (e) {
          setError(e as CustomError);
        } finally {
          setIsLoading(false);
        }
      },
      []
    );

    return [result, error, getPendingAuthorisationRequestFunc, isLoading];
  };

export default useGetPendingAuthorisationRequest;
