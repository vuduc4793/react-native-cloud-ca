import type { TouchableOpacityProps, StyleProp, ViewStyle } from 'react-native';

export interface OutlineButtonProps extends TouchableOpacityProps {
  label: string;
  style?: StyleProp<ViewStyle>;
}
