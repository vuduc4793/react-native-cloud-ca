import type React from 'react';
import type { StyleProp } from 'react-native';
import type { TextStyle } from 'react-native';
import type { TouchableOpacityProps } from 'react-native';
import type {
  AuthenticateClientResponse,
  AuthenticateUserResponse,
  CustomError,
  RegisterDeviceParams,
  RegisterDeviceResponse,
  VerifyOTPResponse,
} from 'react-native-cloud-ca';

export interface DeviceRegistrationProps extends TouchableOpacityProps {
  buttonLabel: string;
  buttonLabelStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  onDone?: (allResponse: DeviceRegistrationResponse) => void;
  registerDeviceParams: RegisterDeviceParams;
}

export interface DeviceRegistrationResponse {
  authenticateClientResponse?: AuthenticateClientResponse;
  authenticateUserResponse?: AuthenticateUserResponse;
  verifyOTPResponse?: VerifyOTPResponse;
  registerDeviceResponse?: RegisterDeviceResponse;
  error?: CustomError;
}
