import type { TouchableOpacityProps, StyleProp, ViewStyle } from 'react-native';

export interface PrimaryButtonProps extends TouchableOpacityProps {
  label: string;
  style?: StyleProp<ViewStyle>;
}
