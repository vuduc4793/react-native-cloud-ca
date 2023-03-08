import * as React from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  SafeAreaView,
} from 'react-native';
import { useSdkSetup } from 'react-native-cloud-ca';
import ListApiScene from './Scene/ListApiScene';

export default function App() {
  const [baseUrl, setBaseUrl] = React.useState<string>(
    'https://remotesigning.viettel.vn'
  );
  const [setupSdkResponse, , onSetupSDK] = useSdkSetup();

  const onSetUrl = () => {
    onSetupSDK({ baseUrl });
  };

  return (
    <SafeAreaView style={styles.container}>
      {setupSdkResponse === null ? (
        <>
          <View>
            <Text style={styles.label}>Base URL</Text>
            <TextInput
              onChangeText={setBaseUrl}
              value={baseUrl}
              style={styles.textInputContainer}
            />
          </View>
          <Button title="Set URL" onPress={onSetUrl} />
        </>
      ) : (
        <ListApiScene />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  textInputContainer: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
  },
});
