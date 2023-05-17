import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import type { DialogueConfirmProps } from './types';
import styles from './styles';

const DialogueConfirm = (props: DialogueConfirmProps) => {
  const {
    children,
    title,
    confirmLabel,
    confirmOnPress,
    confirmDisable,
    closeLabel,
    closeOnPress,
    closeDisable,
    modalType,
    ...rest
  } = props;

  const icons = {
    ERROR: require('../../asset/icon/IC_ERROR.png'),
    WARNING: require('../../asset/icon/IC_WARNING.png'),
    SUCCESS: require('../../asset/icon/IC_SUCCESS.png'),
  };

  const renderIcon = () => (
    <Image style={styles.iconStyle} source={icons[modalType || 'SUCCESS']} />
  );

  return (
    <Modal animationType="fade" visible={true} transparent={true} {...rest}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.closeStyle} onPress={closeOnPress}>
            <Image
              style={styles.closeImage}
              source={require('../../asset/icon/IC_CLOSE.png')}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          {!!modalType?.length && renderIcon()}
          <Text style={styles.titleStyle}>{title || 'Thông báo'}</Text>
          {children}
          <View style={styles.buttonWarp}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeOnPress}
              disabled={closeDisable}
            >
              <Text style={styles.closeText}>{closeLabel || 'Đóng'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                confirmDisable
                  ? [styles.confirmButton, { backgroundColor: '#9099A0' }]
                  : styles.confirmButton
              }
              onPress={confirmOnPress}
              disabled={confirmDisable}
            >
              <Text style={styles.confirmText}>
                {confirmLabel || 'Xác nhận'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DialogueConfirm;
