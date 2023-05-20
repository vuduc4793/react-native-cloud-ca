import type React from 'react';
import type { TouchableOpacityProps } from 'react-native';
import type {
  AuthenticateClientResponse,
  AuthenticateUserResponse,
  RegisterDeviceParams,
  RegisterDeviceResponse,
  VerifyOTPResponse,
} from 'react-native-cloud-ca';

export interface DeviceRegistrationProps extends TouchableOpacityProps {
  buttonLabel: string;
  children?: React.ReactNode;
  onDone?: (allResponse: DeviceRegistrationResponse) => void;
  registerDeviceParams: RegisterDeviceParams;
}

export interface DeviceRegistrationResponse {
  authenticateClientResponse?: AuthenticateClientResponse;
  authenticateUserResponse?: AuthenticateUserResponse;
  verifyOTPResponse?: VerifyOTPResponse;
  registerDeviceResponse?: RegisterDeviceResponse;
}
