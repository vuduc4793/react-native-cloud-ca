import type {
  ImageProps,
  TouchableOpacityProps,
  GestureResponderEvent,
} from 'react-native';

export interface HeaderProps {
  label?: string;
  leftIconImage?: ImageProps;
  leftIconTouchable?: TouchableOpacityProps;
  goBack?: (event: GestureResponderEvent) => void;
  rightIconImage?: ImageProps;
  rightIconTouchable?: TouchableOpacityProps;
}
