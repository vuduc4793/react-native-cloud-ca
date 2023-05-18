import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './styles';
import { CloudCAProviderContext } from 'react-native-cloud-ca';

const Loading = () => {
  const cloudCAProviderContext = React.useContext(CloudCAProviderContext);
  const { themeColor } = cloudCAProviderContext;
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={themeColor || '#EE0033'} />
    </View>
  );
};

export default Loading;
