import * as React from 'react';

import { StyleSheet, SafeAreaView } from 'react-native';
// import {
//   DeleteDeviceView,
//   DeviceRegistrationView,
//   ListRegisteredDevicesView,
// } from 'react-native-cloud-ca';

// const CLIENT_ID = 'samples_test_client';
// const CLIENT_SECRET = '205640fd6ea8c7d80bb91c630b52d286d21ee511';
// const GRANT_TYPE = 'client_credentials';
// const USER_ID = 'MST_0123456787-932';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <DeviceRegistrationView
        buttonLabel="Đăng ký"
        clientId={CLIENT_ID}
        clientSecret={CLIENT_SECRET}
        grantType={GRANT_TYPE}
        userId={USER_ID}
      />
      <DeleteDeviceView buttonLabel="Huỷ đăng ký" deviceId="" /> */}
      {/* <ListRegisteredDevicesView /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
