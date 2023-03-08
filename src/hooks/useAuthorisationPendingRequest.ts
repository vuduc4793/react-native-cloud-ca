import { useState, useCallback } from 'react';
import { authorisationPendingRequest } from 'react-native-cloud-ca';
import type {
  AuthorisationPendingRequestParams,
  BaseResponse,
  CustomError,
} from 'src/types';

type AuthorisationPendingRequestFunc = (
  params?: AuthorisationPendingRequestParams
) => void;

type AuthorisationPendingRequestReturn = [
  BaseResponse | null,
  CustomError | null,
  AuthorisationPendingRequestFunc,
  boolean
];

const useAuthorisationPendingRequest =
  (): AuthorisationPendingRequestReturn => {
    const [result, setResult] = useState<BaseResponse | null>(null);
    const [error, setError] = useState<CustomError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const authorisationPendingRequestFunc = useCallback(
      async (params?: AuthorisationPendingRequestParams) => {
        try {
          setIsLoading(true);
          const response = await authorisationPendingRequest(params);
          setResult(response);
        } catch (e) {
          setError(e as CustomError);
        } finally {
          setIsLoading(false);
        }
      },
      []
    );

    return [result, error, authorisationPendingRequestFunc, isLoading];
  };

export default useAuthorisationPendingRequest;
