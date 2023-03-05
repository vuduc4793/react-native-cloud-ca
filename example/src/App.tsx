import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { multiply, authenticateClient, sdkSetup } from 'react-native-cloud-ca';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
    sdkSetup()
      .then((result) => {
        console.log('result', result);
        authenticateClient({ clientId: '1', clientSecret: '', grantType: '' })
          .then((result) => {
            console.log('result', result);
          })
          .catch((error) => {
            console.log('error', error);
          });
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
