import { useState, useCallback } from 'react';
import {
  cancelPendingRequest,
  BaseResponse,
  CancelPendingRequestParams,
  CustomError,
} from 'react-native-cloud-ca';

type CancelPendingRequestFunc = (params: CancelPendingRequestParams) => void;

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
    async (params: CancelPendingRequestParams) => {
      const { transactionID, request, hashAlgorithm } = params;
      try {
        setIsLoading(true);
        const response = await cancelPendingRequest({
          transactionID,
          request,
          hashAlgorithm,
        });
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
