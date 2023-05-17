import React from 'react';
import { View, Text } from 'react-native';
import type { InfoFieldProps } from './types';
import styles from './styles';

const InfoField = (props: InfoFieldProps) => {
  const { info, title } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.infoText}>{info}</Text>
    </View>
  );
};

export default InfoField;
