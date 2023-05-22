import type { GestureResponderEvent } from 'react-native';
import type { HeaderProps } from '../../components/Header/types';
import type {
  CustomError,
  GetDeviceRegistrationSettingsResponse,
} from 'react-native-cloud-ca';

export interface GetDeviceRegistrationSettingsViewProps {
  headerProps?: HeaderProps;
  goBack: (event: GestureResponderEvent) => void;
  onDone?: (allResult: GetDeviceRegistrationSettingsAllResponse) => void;
}

export interface GetDeviceRegistrationSettingsAllResponse {
  getDeviceRegistrationSettingsResponse?: GetDeviceRegistrationSettingsResponse;
  error?: CustomError;
}
