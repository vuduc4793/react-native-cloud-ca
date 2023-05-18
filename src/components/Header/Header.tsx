import React from 'react';
import { View, TouchableOpacity, Image, Text, StatusBar } from 'react-native';
import styles from './styles';
import type { HeaderProps } from './types';
import { CloudCAProviderContext } from 'react-native-cloud-ca';

const Header = (props: HeaderProps) => {
  const {
    label,
    leftIconImage,
    leftIconTouchable,
    goBack,
    rightIconImage,
    rightIconTouchable,
  } = props;
  const cloudCAProviderContext = React.useContext(CloudCAProviderContext);
  const { headerTheme } = cloudCAProviderContext;
  const defaultColor = 'rgba(238, 0, 51, 0.9)';
  const rightImageStyleDefault = {
    ...styles.iconStyle,
    tintColor: 'transparent',
  };
  return (
    <View style={styles.headerContainer}>
      <StatusBar backgroundColor={headerTheme?.overlayColor || defaultColor} />
      <Image
        {...headerTheme?.backgroundImageProps}
        style={[
          styles.headerBackgroundImage,
          headerTheme?.backgroundImageProps?.style || {},
        ]}
        source={
          headerTheme?.imageSource ||
          require('../../asset/image/BG_Viettel.jpeg')
        }
        resizeMode={headerTheme?.backgroundImageProps?.resizeMode || 'cover'}
      />
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: headerTheme?.overlayColor || defaultColor,
          },
        ]}
      >
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
