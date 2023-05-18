import type { GestureResponderEvent } from 'react-native';
import type { HeaderProps } from '../../components/Header/types';

export interface ListRegisteredDevicesViewProps {
  headerProps: HeaderProps;
  goBack: (event: GestureResponderEvent) => void;
}
