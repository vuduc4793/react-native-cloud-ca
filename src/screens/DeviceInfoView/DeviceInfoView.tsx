import React, { useState } from 'react';
import {
  CustomError,
  Dialogue,
  DialogueConfirm,
  Header,
  InfoField,
  Loading,
  PrimaryButton,
  deleteDevice,
  validateToken,
} from 'react-native-cloud-ca';
import { View, Image, Text } from 'react-native';
import styles from './styles';
import { useParams, useNavigate } from 'react-router-native';
import type { DeviceInfoViewAllResponse, DeviceInfoViewProps } from './types';

const DeviceInfoView = (props: DeviceInfoViewProps) => {
  const { onDone } = props;
  let { device_id, device_name } = useParams();
  let navigate = useNavigate();
  const [isShowRequestDelete, setIsShowRequestDelete] =
    useState<boolean>(false);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [isShowSuccess, setIsShowSuccess] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allResponse, setAllResponse] = useState<DeviceInfoViewAllResponse>();

  function onGoBack() {
    navigate(-1);
  }

  const handleShowRequestDelete = (state: boolean) => {
    setIsShowRequestDelete(state);
  };

  const onDeleteDevice = async () => {
    setIsLoading(true);
    try {
      await validateToken();
      const result = await deleteDevice({ deviceId: device_id as string });
      setIsLoading(false);
      setIsShowRequestDelete(false);
      setIsShowSuccess(true);
      setAllResponse({ deleteDeviceResponse: result });
    } catch (error) {
      setErrorResponse((error as CustomError)?.message);
      setAllResponse({ error: error as CustomError });
      setIsLoading(false);
      setIsShowRequestDelete(false);
      setIsShowError(true);
    }
  };

  const handleDone = () => {
    setIsShowSuccess(false);
    onDone?.(allResponse!);
    onGoBack();
  };

  const handleError = () => {
    setIsShowError(false);
    onDone?.(allResponse!);
  };

  return (
    <View style={styles.container}>
      <Header label="Chi tiết thiết bị" goBack={onGoBack} />
      <View style={styles.contentContainer}>
        <Image
          style={styles.smartphoneImage}
          source={require('../../asset/icon/IC_SMARTPHONE.png')}
        />
        <InfoField title="ID" info={device_id as string} />
        <InfoField title="Tên" info={device_name as string} />
        <PrimaryButton
          label="Huỷ đăng ký"
          onPress={() => handleShowRequestDelete(true)}
        />
      </View>
      <Dialogue visible={isShowSuccess} onClose={handleDone}>
        <Text style={styles.contentStyle}>Huỷ thiết bị thành công</Text>
      </Dialogue>
      <Dialogue modalType="ERROR" onClose={handleError} visible={isShowError}>
        <Text style={styles.contentStyle}>{errorResponse}</Text>
      </Dialogue>
      <DialogueConfirm
        modalType="WARNING"
        title="Thông báo"
        closeOnPress={() => handleShowRequestDelete(false)}
        closeLabel="Quay lại"
        confirmOnPress={onDeleteDevice}
        confirmLabel="Hủy đăng ký"
        visible={isShowRequestDelete}
      >
        <Text style={styles.contentStyle}>
          Bạn có chắc muốn huỷ đăng ký trên thiết bị này không?
        </Text>
      </DialogueConfirm>
      {isLoading && <Loading />}
    </View>
  );
};

export default DeviceInfoView;
