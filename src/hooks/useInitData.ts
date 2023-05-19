import {
  BaseResponse,
  CustomError,
  InitDataParams,
  initData,
} from 'react-native-cloud-ca';
import { useState, useCallback } from 'react';

type InitDataFunc = (params: InitDataParams) => void;

type InitDataReturn = [
  BaseResponse | null,
  CustomError | null,
  InitDataFunc,
  boolean
];

const useInitData = (): InitDataReturn => {
  const [result, setResult] = useState<BaseResponse | null>(null);
  const [error, setError] = useState<CustomError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initDataFunc = useCallback(async (params: InitDataParams) => {
    try {
      setIsLoading(true);
      const response = await initData(params);
      setResult(response);
    } catch (e) {
      setError(e as CustomError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [result, error, initDataFunc, isLoading];
};

export default useInitData;
