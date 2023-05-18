import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import type { OutlineButtonProps } from './types';
import styles from './styles';
import { CloudCAProviderContext } from 'react-native-cloud-ca';

const OutlineButton = (props: OutlineButtonProps) => {
  const { label, style, ...rest } = props;
  const cloudCAProviderContext = React.useContext(CloudCAProviderContext);
  const { themeColor } = cloudCAProviderContext;

  return (
    <TouchableOpacity
      style={[styles.container, { borderColor: themeColor }, style]}
      {...rest}
    >
      <Text style={[styles.labelText, { color: themeColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default OutlineButton;
