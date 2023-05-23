import type { GestureResponderEvent } from 'react-native';
import type { HeaderProps } from '../../components/Header/types';
import type {
  CustomError,
  ListRegisteredDevicesResponse,
} from 'react-native-cloud-ca';

export interface ListRegisteredDevicesViewProps {
  headerProps?: HeaderProps;
  goBack: (event: GestureResponderEvent) => void;
  onDone?: (allResult: AllListRegisteredDevicesResponse) => void;
}

export interface AllListRegisteredDevicesResponse {
  listRegisteredDevicesResponse?: ListRegisteredDevicesResponse;
  error?: CustomError;
}
