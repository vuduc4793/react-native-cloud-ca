import type React from 'react';
import type { TouchableOpacityProps } from 'react-native';
import type { BaseResponse } from 'react-native-cloud-ca';

export interface DeleteDeviceProps extends TouchableOpacityProps {
  buttonLabel: string;
  deviceId?: string;
  children?: React.ReactNode;
  onDone?: (deleteResponse: BaseResponse) => void;
}
