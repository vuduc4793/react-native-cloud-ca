import React, { useState } from 'react';
import type { AllDeleteDeviceResponse, DeleteDeviceProps } from './types';
import { TouchableOpacity, Text } from 'react-native';
import {
  CustomError,
  Dialogue,
  DialogueConfirm,
  deleteDevice,
  validateToken,
} from 'react-native-cloud-ca';
import styles from './styles';

const DeleteDeviceView = (props: DeleteDeviceProps) => {
  const { buttonLabel, deviceId, onDone, children, buttonLabelStyle, ...rest } =
    props;

  const [isShowRequestDelete, setIsShowRequestDelete] =
    useState<boolean>(false);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [isShowSuccess, setIsShowSuccess] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState<string>('');
  const [successResponse, setSuccessResponse] =
    useState<AllDeleteDeviceResponse>();

  const onDeleteDevice = async () => {
    handleShowRequestDelete(false);
    try {
      await validateToken();
      const deleteDeviceResult = await deleteDevice({
        deviceId: deviceId || '',
      });
      setSuccessResponse({ deleteResponse: deleteDeviceResult });
      setIsShowSuccess(true);
    } catch (error) {
      setErrorResponse((error as CustomError)?.message);
      setIsShowError(true);
      setSuccessResponse({ error: error as CustomError });
    }
  };

  const handleDone = () => {
    setIsShowSuccess(false);
    onDone?.(successResponse!);
  };

  const handleShowRequestDelete = (state: boolean) => {
    setIsShowRequestDelete(state);
  };

  const renderChildren = () => {
    return (
      <>
        {children ? (
          children
        ) : (
          <Text style={buttonLabelStyle}>{buttonLabel}</Text>
        )}
      </>
    );
  };

  return (
    <>
      <TouchableOpacity onPress={() => handleShowRequestDelete(true)} {...rest}>
        {renderChildren()}
      </TouchableOpacity>
      <Dialogue visible={isShowSuccess} onClose={handleDone}>
        <Text style={styles.contentStyle}>Huỷ thiết bị thành công</Text>
      </Dialogue>
      <Dialogue
        modalType="ERROR"
        onClose={() => setIsShowError(false)}
        visible={isShowError}
      >
        <Text style={styles.contentStyle}>{errorResponse}</Text>
      </Dialogue>
      <DialogueConfirm
        modalType="WARNING"
        title="Thông báo"
        closeOnPress={() => handleShowRequestDelete(false)}
        closeLabel="Quay lại"
        confirmOnPress={onDeleteDevice}
        confirmLabel="Huỷ đăng ký"
        visible={isShowRequestDelete}
      >
        <Text style={styles.contentStyle}>
          Bạn có chắc muốn huỷ đăng ký trên thiết bị này không?
        </Text>
      </DialogueConfirm>
    </>
  );
};

export default DeleteDeviceView;
