import React, { useState } from 'react';
import type { DeleteDeviceProps } from './types';
import { TouchableOpacity, Text } from 'react-native';
import {
  BaseResponse,
  CustomError,
  Dialogue,
  DialogueConfirm,
  deleteDevice,
} from 'react-native-cloud-ca';
import styles from './styles';

const DeleteDeviceView = (props: DeleteDeviceProps) => {
  const { buttonLabel, deviceId, onDone, children, ...rest } = props;

  const [isShowRequestDelete, setIsShowRequestDelete] =
    useState<boolean>(false);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [isShowSuccess, setIsShowSuccess] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState<string>('');
  const [successResponse, setSuccessResponse] = useState<BaseResponse>();

  const onDeleteDevice = async () => {
    handleShowRequestDelete(false);
    try {
      const deleteDeviceResult = await deleteDevice({
        deviceId: deviceId || '',
      });
      setSuccessResponse(deleteDeviceResult);
      setIsShowSuccess(true);
    } catch (error) {
      setErrorResponse((error as CustomError)?.message);
      setIsShowError(true);
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
    return <>{children ? children : <Text>{buttonLabel}</Text>}</>;
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
          Bạn có muốn xoá các thiết bị này không.
        </Text>
      </DialogueConfirm>
    </>
  );
};

export default DeleteDeviceView;
