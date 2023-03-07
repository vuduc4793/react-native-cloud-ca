import { useState, useCallback } from 'react';
import { getDeviceRegistrationSettings } from 'react-native-cloud-ca';
import type {
  CustomError,
  GetDeviceRegistrationSettingsParams,
  GetDeviceRegistrationSettingsResponse,
} from 'src/types';

type GetDeviceRegistrationSettingsFunc = (
  params?: GetDeviceRegistrationSettingsParams
) => void;

type GetDeviceRegistrationSettingsReturn = [
  GetDeviceRegistrationSettingsResponse | null,
  string | null,
  GetDeviceRegistrationSettingsFunc
];

const useGetDeviceRegistrationSettings =
  (): GetDeviceRegistrationSettingsReturn => {
    const [result, setResult] =
      useState<GetDeviceRegistrationSettingsResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getDeviceRegistrationSettingsFunc = useCallback(
      async (params?: GetDeviceRegistrationSettingsParams) => {
        try {
          const response = await getDeviceRegistrationSettings(params);
          setResult(response);
        } catch (e) {
          setError((e as CustomError)?.message);
        }
      },
      []
    );

    return [result, error, getDeviceRegistrationSettingsFunc];
  };

export default useGetDeviceRegistrationSettings;
