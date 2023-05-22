import type React from 'react';
import type { StyleProp } from 'react-native';
import type { TextStyle } from 'react-native';
import type { TouchableOpacityProps } from 'react-native';
import type { BaseResponse } from 'react-native-cloud-ca';

export interface DeleteDeviceProps extends TouchableOpacityProps {
  buttonLabel: string;
  buttonLabelStyle?: StyleProp<TextStyle>;
  deviceId?: string;
  children?: React.ReactNode;
  onDone?: (deleteResponse: BaseResponse) => void;
}
