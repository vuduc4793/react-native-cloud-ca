import React, { useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  View,
  Modal,
  Text,
  Pressable,
} from 'react-native';
import {
  authenticateClient,
  authenticateUser,
  authorisationPendingRequest,
  cancelPendingRequest,
  CustomError,
  deleteDevice,
  deleteDeviceForPushNotification,
  DeviceInfo,
  generateQRCode,
  getDeviceRegistrationSettings,
  getPendingAuthorisationRequest,
  getUserProfile,
  QRFormat,
  registerDevice,
  registerDeviceForPushNotification,
  renewAccessToken,
  useDeleteDevice,
  useListRegisteredDevices,
  verifyOTP,
  verifyQRCode,
} from 'react-native-cloud-ca';

import { API_LIST } from './constants';

const CLIENT_ID = 'samples_test_client';
const CLIENT_SECRET = '205640fd6ea8c7d80bb91c630b52d286d21ee511';
const GRANT_TYPE = 'client_credentials';
const USER_ID = 'duynq7_viettel7';

const ListApiScene = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');
  const [qrCode, setQrCode] = useState<string>('');
  const [apiSelected, setApiSelected] = useState<number>(1);
  const [, , deleteDevicesFnc] = useDeleteDevice();
  const [listDevices, , listRegisteredDevicesFnc] = useListRegisteredDevices();

  const handleApiAction = (key: number) => {
    setModalVisible(true);
    setApiSelected(key);
    switch (key) {
      case 1:
        authenticateClient({
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          grantType: GRANT_TYPE,
        })
          .then((response) => {
            setResult(JSON.stringify(response));
          })
          .catch((error) => {
            setResult((error as CustomError)?.message);
          });
        break;
      case 2:
        authenticateUser({
          userId: USER_ID,
        })
          .then((response) => {
            setResult(JSON.stringify(response));
          })
          .catch((error) => {
            setResult((error as CustomError)?.message);
          });
        break;
      case 3:
        verifyOTP({
          otpMail: '',
          otpSms: '',
        })
          .then((response) => {
            setResult(JSON.stringify(response));
          })
          .catch((error) => {
            setResult((error as CustomError)?.message);
          });
        break;
      case 4:
        renewAccessToken({ refresh_token: undefined })
          .then((response) => {
            setResult(JSON.stringify(response));
          })
          .catch((error) => {
            setResult((error as CustomError)?.message);
          });
        break;
      case 5:
        registerDevice({
          biometricApiType: 'AUTO',
          localizedReason: 'Unlock to add device',
        })
          .then((response) => {
            setResult(JSON.stringify(response));
          })
          .catch((error) => {
            setResult((error as CustomError)?.message);
          });
        break;
      case 6:
        listRegisteredDevicesFnc();
        break;
      case 7:
        deleteDevice({
          deviceId: '',
        })
          .then((response) => {
            setResult(JSON.stringify(response));
          })
          .catch((error) => {
            setResult((error as CustomError)?.message);
          });
        break;
      case 8:
        getPendingAuthorisationRequest()
          .then((response) => {
            setResult(JSON.stringify(response));
          })
          .catch((error) => {
            setResult((error as CustomError)?.message);
          });
        break;
      case 9:
        authorisationPendingRequest({
          biometricApiType: 'AUTO',
          localizedReason: 'Unlock to add device',
          hashAlgorithm: '',
          request: '',
          transactionID: '',
        })
          .then((response) => {
            setResult(JSON.stringify(response));
          })
          .catch((error) => {
            setResult((error as CustomError)?.message);
          });
        break;
      case 10:
        cancelPendingRequest({
          hashAlgorithm: '',
          request: '',
          transactionID: '',
        })
          .then((response) => {
            setResult(JSON.stringify(response));
          })
          .catch((error) => {
            setResult((error as CustomError)?.message);
          });
        break;
      case 11:
        getUserProfile()
          .then((response) => {
            setResult(JSON.stringify(response));
          })
          .catch((error) => {
            setResult((error as CustomError)?.message);
          });
        break;
      case 12:
        getDeviceRegistrationSettings()
          .then((response) => {
            setResult(JSON.stringify(response));
          })
          .catch((error) => {
            setResult((error as CustomError)?.message);
          });
        break;
      case 13:
        generateQRCode({
          clientId: CLIENT_ID,
          format: QRFormat.PNG,
          size: '256',
        })
          .then((response) => {
            setQrCode(response?.qr_code || '');
            setResult(JSON.stringify(response));
          })
          .catch((error) => {
            setResult((error as CustomError)?.message);
          });
        break;
      case 14:
        verifyQRCode({
          qrCode: qrCode,
        })
          .then((response) => {
            setResult(JSON.stringify(response));
          })
          .catch((error) => {
            setResult((error as CustomError)?.message);
          });
        break;
      case 15:
        registerDeviceForPushNotification({ deviceToken: '' })
          .then((response) => {
            setResult(JSON.stringify(response));
          })
          .catch((error) => {
            setResult((error as CustomError)?.message);
          });
        break;
      case 16:
        deleteDeviceForPushNotification({ deviceToken: '' })
          .then((response) => {
            setResult(JSON.stringify(response));
          })
          .catch((error) => {
            setResult((error as CustomError)?.message);
          });
        break;
      default:
        break;
    }
  };

  const renderItem = (item: DeviceInfo, index: number) => {
    return (
      <View key={index}>
        <Text>device id: {item?.device_id}</Text>
        <Text>devices name: {item?.device_name}</Text>
        <Button
          title="Delete"
          onPress={() => {
            deleteDevicesFnc({ deviceId: item?.device_id });
            listRegisteredDevicesFnc();
          }}
        />
      </View>
    );
  };

  const renderListDevices = () => {
    return (
      <View>{listDevices?.map((item, index) => renderItem(item, index))}</View>
    );
  };

  const renderApiButton = (
    item: { label: string; key: number },
    index: number
  ) => {
    const { key, label } = item;
    return (
      <Button key={index} title={label} onPress={() => handleApiAction(key)} />
    );
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {API_LIST?.map((item, index) => renderApiButton(item, index))}
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <ScrollView style={{}} contentContainerStyle={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setResult('');
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide</Text>
            </Pressable>
            {apiSelected === 6 ? (
              renderListDevices()
            ) : (
              <Text style={styles.modalText}>{result}</Text>
            )}
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

export default ListApiScene;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
