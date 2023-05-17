import React from 'react';
import { View, Text, Image } from 'react-native';
import type { DeviceItemProps } from './types';
import styles from './styles';

const DeviceItem = (props: DeviceItemProps) => {
  const { deviceInfo } = props;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{deviceInfo?.device_name}</Text>
        <Image
          style={styles.nextIcon}
          source={require('../../../../asset/icon/IC_NEXT_ARROW.png')}
        />
      </View>
      <Text style={styles.deviceIdText}>{deviceInfo?.device_id}</Text>
    </View>
  );
};

export default DeviceItem;
