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
  string | null,
  CancelPendingRequestFunc
];

const useCancelPendingRequest = (): CancelPendingRequestReturn => {
  const [result, setResult] = useState<BaseResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cancelPendingRequestFunc = useCallback(
    async (params?: CancelPendingRequestParams) => {
      try {
        const response = await cancelPendingRequest(params);
        setResult(response);
      } catch (e) {
        setError((e as CustomError)?.error);
      }
    },
    []
  );

  return [result, error, cancelPendingRequestFunc];
};

export default useCancelPendingRequest;
