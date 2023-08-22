import * as React from 'react';

import { StyleSheet, SafeAreaView } from 'react-native';
import {
  CloudCAProvider,
  DeviceRegistrationView,
  PrimaryButton,
  initData,
  DeleteDeviceView,
} from 'react-native-cloud-ca';

const CLIENT_ID = 'samples_test_client';
const CLIENT_SECRET = '205640fd6ea8c7d80bb91c630b52d286d21ee511';
const GRANT_TYPE = 'client_credentials';
const USER_ID = 'MST_0123456787-475';
const BASE_URL = 'https://remotesigning.viettel.vn';

export default function App() {
  const onAuthen = () => {
    initData({
      baseURL: BASE_URL,
      biometricTitle: 'Unlock to add device',
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      grantType: GRANT_TYPE,
      userId: USER_ID,
    });
  };

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
