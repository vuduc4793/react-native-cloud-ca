import type { TouchableOpacityProps } from 'react-native';
import type {
  AuthenticateClientResponse,
  AuthenticateUserResponse,
  VerifyOTPResponse,
} from 'react-native-cloud-ca';

export interface DeviceRegistrationProps extends TouchableOpacityProps {
  buttonLabel: string;
  clientId: string;
  clientSecret: string;
  grantType: string;
  userId: string;
  onDone?: (allResponse: DeviceRegistrationResponse) => void;
}

export interface DeviceRegistrationResponse {
  authenticateClientResponse?: AuthenticateClientResponse;
  authenticateUserResponse?: AuthenticateUserResponse;
  verifyOTPResponse?: VerifyOTPResponse;
}
