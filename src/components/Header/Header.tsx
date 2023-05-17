import React from 'react';
import { View, TouchableOpacity, Image, Text, StatusBar } from 'react-native';
import styles from './styles';
import type { HeaderProps } from './types';

const Header = (props: HeaderProps) => {
  const {
    themeColor,
    backgroundImage,
    label,
    leftIconImage,
    leftIconTouchable,
    goBack,
    rightIconImage,
    rightIconTouchable,
  } = props;
  const rightImageStyleDefault = {
    ...styles.iconStyle,
    tintColor: 'transparent',
  };
  return (
    <View style={styles.headerContainer}>
      <StatusBar backgroundColor={themeColor || 'rgba(238, 0, 51, 0.9)'} />
      <Image
        {...backgroundImage}
        style={[styles.headerBackgroundImage, backgroundImage?.style || {}]}
        source={
          backgroundImage?.source ||
          require('../../asset/image/BG_Viettel.jpeg')
        }
        resizeMode={backgroundImage?.resizeMode || 'cover'}
      />
      <View style={styles.overlay}>
        <View style={styles.headerButtonContainer}>
          <TouchableOpacity
            {...leftIconTouchable}
            onPress={leftIconTouchable?.onPress || goBack}
          >
            <Image
              {...leftIconImage}
              style={[styles.iconStyle, leftIconImage?.style || {}]}
              source={
                leftIconImage?.source ||
                require('../../asset/icon/IC_PREV_ARROW.png')
              }
            />
          </TouchableOpacity>
          <Text style={styles.headerLabel}>
            {label || 'Danh sách thiết bị'}
          </Text>
          <TouchableOpacity
            {...rightIconTouchable}
            disabled={rightIconTouchable?.disabled || true}
          >
            <Image
              {...rightIconImage}
              style={[rightImageStyleDefault, rightIconImage?.style || {}]}
              source={
                rightIconImage?.source || require('../../asset/icon/IC_ADD.png')
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;
