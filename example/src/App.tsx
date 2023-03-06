import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { authenticateClient, sdkSetup } from 'react-native-cloud-ca';

export default function App() {
  const [lastResult, setResult] = React.useState<any>();

  React.useEffect(() => {
    sdkSetup({ baseUrl: 'https://remotesigning.viettel.vn' })
      .then((sdkSetupResult) => {
        console.log('sdkSetupResult', sdkSetupResult);
        authenticateClient({
          clientId: 'samples_test_client',
          clientSecret: '205640fd6ea8c7d80bb91c630b52d286d21ee511',
          grantType: 'client_credentials',
        })
          .then((result) => {
            console.log('result', result);
            setResult(result);
          })
          .catch((error) => {
            console.log('authenticateClient error', error);
          });
      })
      .catch((error) => {
        console.log('sdkSetup error', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {JSON.stringify(lastResult)}</Text>
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
