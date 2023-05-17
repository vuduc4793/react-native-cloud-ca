import type {
  ImageProps,
  TouchableOpacityProps,
  GestureResponderEvent,
} from 'react-native';

export interface HeaderProps {
  backgroundImage?: BackgroundImageProps;
  label?: string;
  themeColor?: string;
  leftIconImage?: ImageProps;
  leftIconTouchable?: TouchableOpacityProps;
  goBack?: (event: GestureResponderEvent) => void;
  rightIconImage?: ImageProps;
  rightIconTouchable?: TouchableOpacityProps;
}

interface BackgroundImageProps extends ImageProps {}
