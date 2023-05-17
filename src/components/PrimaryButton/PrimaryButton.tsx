import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import type { PrimaryButtonProps } from './types';
import styles from './styles';

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { label, ...rest } = props;

  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Text style={styles.labelText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
