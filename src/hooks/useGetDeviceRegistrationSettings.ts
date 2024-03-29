import { useState, useCallback } from 'react';
import { getDeviceRegistrationSettings } from 'react-native-cloud-ca';
import type {
  CustomError,
  GetDeviceRegistrationSettingsParams,
  GetDeviceRegistrationSettingsResponse,
} from 'react-native-cloud-ca';

type GetDeviceRegistrationSettingsFunc = (
  params?: GetDeviceRegistrationSettingsParams
) => void;

type GetDeviceRegistrationSettingsReturn = [
  GetDeviceRegistrationSettingsResponse | null,
  CustomError | null,
  GetDeviceRegistrationSettingsFunc,
  boolean
];

const useGetDeviceRegistrationSettings =
  (): GetDeviceRegistrationSettingsReturn => {
    const [result, setResult] =
      useState<GetDeviceRegistrationSettingsResponse | null>(null);
    const [error, setError] = useState<CustomError | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getDeviceRegistrationSettingsFunc = useCallback(async () => {
      try {
        setIsLoading(true);
        const response = await getDeviceRegistrationSettings();
        setResult(response);
      } catch (e) {
        setError(e as CustomError);
      } finally {
        setIsLoading(false);
      }
    }, []);

    return [result, error, getDeviceRegistrationSettingsFunc, isLoading];
  };

export default useGetDeviceRegistrationSettings;
