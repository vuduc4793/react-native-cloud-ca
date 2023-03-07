import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import {
  useAuthenticateClient,
  useAuthenticateUser,
  useSdkSetup,
} from 'react-native-cloud-ca';

export default function App() {
  // const [lastResult, setResult] = React.useState<any>();
  const [sdkSetupResult, sdkSetupError, onSdkSetup] = useSdkSetup();
  // const [authenClientResult, authenClientError, onAuthenticateClient] =
  //   useAuthenticateClient();
  // const [authenUserResult, authenUserError, onAuthenticateClient] =
  //   useAuthenticateUser();

  React.useEffect(() => {
    // onSdkSetup({ baseUrl: 'https://remotesigning.viettel.vn' });
    // onAuthenticateClient({
    //   clientId: 'samples_test_client',
    //   clientSecret: '205640fd6ea8c7d80bb91c630b52d286d21ee511',
    //   grantType: 'client_credentials',
    // });
    // onAuthenticateClient({ userId: 'duynq7_viettel7' });
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text>Result: {JSON.stringify(authenUserResult) || authenUserError}</Text> */}
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
