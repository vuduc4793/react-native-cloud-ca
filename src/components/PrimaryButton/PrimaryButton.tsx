import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import type { PrimaryButtonProps } from './types';
import styles from './styles';
import { CloudCAProviderContext } from 'react-native-cloud-ca';

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { label, style, ...rest } = props;
  const cloudCAProviderContext = React.useContext(CloudCAProviderContext);
  const { themeColor } = cloudCAProviderContext;

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: themeColor }, style]}
      {...rest}
    >
      <Text style={styles.labelText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
