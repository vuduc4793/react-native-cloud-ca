import type { TouchableOpacityProps } from 'react-native';
import type { BaseResponse } from 'react-native-cloud-ca';

export interface DeleteDeviceProps extends TouchableOpacityProps {
  buttonLabel: string;
  deviceId?: string;
  onDone?: (deleteResponse: BaseResponse) => void;
}
