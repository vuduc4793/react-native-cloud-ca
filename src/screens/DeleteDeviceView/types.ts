import type React from 'react';
import type { StyleProp } from 'react-native';
import type { TextStyle } from 'react-native';
import type { TouchableOpacityProps } from 'react-native';
import type { BaseResponse, CustomError } from 'react-native-cloud-ca';

export interface DeleteDeviceProps extends TouchableOpacityProps {
  buttonLabel: string;
  buttonLabelStyle?: StyleProp<TextStyle>;
  deviceId?: string;
  children?: React.ReactNode;
  onDone?: (allResults: AllDeleteDeviceResponse) => void;
}

export interface AllDeleteDeviceResponse {
  deleteResponse?: BaseResponse;
  error?: CustomError;
}
