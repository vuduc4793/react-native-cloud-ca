import { useState, useCallback } from 'react';
import { cancelPendingRequest } from 'react-native-cloud-ca';

import type {
  BaseResponse,
  CancelPendingRequestParams,
  CustomError,
} from 'src/types';

type CancelPendingRequestFunc = (params?: CancelPendingRequestParams) => void;

type CancelPendingRequestReturn = [
  BaseResponse | null,
  CustomError | null,
  CancelPendingRequestFunc,
  boolean
];

const useCancelPendingRequest = (): CancelPendingRequestReturn => {
  const [result, setResult] = useState<BaseResponse | null>(null);
  const [error, setError] = useState<CustomError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cancelPendingRequestFunc = useCallback(
    async (params?: CancelPendingRequestParams) => {
      try {
        setIsLoading(true);
        const response = await cancelPendingRequest(params);
        setResult(response);
      } catch (e) {
        setError(e as CustomError);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return [result, error, cancelPendingRequestFunc, isLoading];
};

export default useCancelPendingRequest;
