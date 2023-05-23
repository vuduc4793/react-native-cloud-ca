import * as React from 'react';

import { StyleSheet, SafeAreaView } from 'react-native';
import {
  CloudCAProvider,
  DeviceRegistrationView,
  PrimaryButton,
  DeleteDeviceView,
} from 'react-native-cloud-ca';

export default function App() {
  const onAuthen = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <CloudCAProvider
        themeColor="green"
        headerTheme={{
          overlayColor: 'rgba(0, 128, 0,.9)',
        }}
      >
        <PrimaryButton onPress={onAuthen} label="INIT" />

        <DeviceRegistrationView
          buttonLabel="Đăng ký"
          registerDeviceParams={{
            biometricApiType: 'AUTO',
            localizedReason: 'localizedReason',
          }}
        >
          <PrimaryButton label="Đăng ký" disabled={true} />
        </DeviceRegistrationView>
        <DeleteDeviceView buttonLabel="Huỷ đăng ký" deviceId="">
          <PrimaryButton label="Huỷ đăng ký" disabled={true} />
        </DeleteDeviceView>
        {/* <ListRegisteredDevicesView /> */}
        {/* <GetPendingAuthorisationRequestView /> */}
      </CloudCAProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
