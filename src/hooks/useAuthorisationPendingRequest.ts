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
  string | null,
  AuthorisationPendingRequestFunc
];

const useAuthorisationPendingRequest =
  (): AuthorisationPendingRequestReturn => {
    const [result, setResult] = useState<BaseResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const authorisationPendingRequestFunc = useCallback(
      async (params?: AuthorisationPendingRequestParams) => {
        try {
          const response = await authorisationPendingRequest(params);
          setResult(response);
        } catch (e) {
          setError((e as CustomError)?.message);
        }
      },
      []
    );

    return [result, error, authorisationPendingRequestFunc];
  };

export default useAuthorisationPendingRequest;
