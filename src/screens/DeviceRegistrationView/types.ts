import type { TouchableOpacityProps } from 'react-native';
import type {
  AuthenticateClientResponse,
  AuthenticateUserResponse,
  VerifyOTPResponse,
} from 'react-native-cloud-ca';

export interface DeviceRegistrationProps extends TouchableOpacityProps {
  buttonLabel: string;
  onDone?: (allResponse: DeviceRegistrationResponse) => void;
}

export interface DeviceRegistrationResponse {
  authenticateClientResponse?: AuthenticateClientResponse;
  authenticateUserResponse?: AuthenticateUserResponse;
  verifyOTPResponse?: VerifyOTPResponse;
}
