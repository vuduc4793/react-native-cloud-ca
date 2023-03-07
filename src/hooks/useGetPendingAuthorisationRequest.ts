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
  string | null,
  GetPendingAuthorisationRequestFunc
];

const useGetPendingAuthorisationRequest =
  (): GetPendingAuthorisationRequestReturn => {
    const [result, setResult] =
      useState<GetPendingAuthorisationRequestResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getPendingAuthorisationRequestFunc = useCallback(
      async (params?: GetPendingAuthorisationRequestParams) => {
        try {
          const response = await getPendingAuthorisationRequest(params);
          setResult(response);
        } catch (e) {
          setError((e as CustomError)?.message);
        }
      },
      []
    );

    return [result, error, getPendingAuthorisationRequestFunc];
  };

export default useGetPendingAuthorisationRequest;
