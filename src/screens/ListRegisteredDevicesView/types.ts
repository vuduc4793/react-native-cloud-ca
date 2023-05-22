import type { GestureResponderEvent } from 'react-native';
import type { HeaderProps } from '../../components/Header/types';
import type { DeviceInfoViewAllResponse } from '../DeviceInfoView/types';

export interface ListRegisteredDevicesViewProps {
  headerProps?: HeaderProps;
  goBack: (event: GestureResponderEvent) => void;
  onDone?: (allResult: DeviceInfoViewAllResponse) => void;
}
