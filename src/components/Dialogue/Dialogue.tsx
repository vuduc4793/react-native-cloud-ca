import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import type { DialogueProps } from './types';
import { Image } from 'react-native';
import styles from './styles';
import { CloudCAProviderContext } from 'react-native-cloud-ca';

const Dialogue = (props: DialogueProps) => {
  const { modalType, children, title, onClose, ...rest } = props;
  const cloudCAProviderContext = React.useContext(CloudCAProviderContext);
  const { themeColor } = cloudCAProviderContext;
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
          <TouchableOpacity style={styles.closeStyle} onPress={onClose}>
            <Image
              style={styles.closeImage}
              source={require('../../asset/icon/IC_CLOSE.png')}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          {renderIcon()}
          <Text style={styles.titleStyle}>{title || 'Thông báo'}</Text>
          {children}
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: themeColor }]}
            onPress={onClose}
          >
            <Text style={styles.closeText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Dialogue;
