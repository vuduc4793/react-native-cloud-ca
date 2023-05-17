import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ListRenderItemInfo } from 'react-native';
import styles from './styles';
import {
  DeviceInfo,
  DeviceInfoView,
  Header,
  Loading,
  listRegisteredDevices,
} from 'react-native-cloud-ca';
import { NativeRouter, Routes, Route, Link } from 'react-router-native';
import type { ListRegisteredDevicesViewProps } from './types';
import { DeviceItem } from './components';

const ListRegisteredDevicesView = (props: ListRegisteredDevicesViewProps) => {
  const { headerProps } = props;
  const [listDevices, setListDevices] = useState<Array<DeviceInfo>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const result = await listRegisteredDevices();
        setListDevices(result);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    })();
  }, []);

  const renderItem = ({ item, index }: ListRenderItemInfo<DeviceInfo>) => {
    return (
      <Link
        to={`/deviceInfo/${item.device_id}/${item.device_name}/${item.secure_element}/${item.biometric}`}
        underlayColor="rgba(0,0,0,.01)"
      >
        <DeviceItem key={index} deviceInfo={item} />
      </Link>
    );
  };

  const rootViewContainer = () => {
    return (
      <View style={styles.container}>
        <Header {...headerProps} goBack={() => console.log('asd')} />
        <Text style={styles.numberOfDevices}>
          Thiết bị đã đăng ký ({listDevices?.length})
        </Text>
        <FlatList
          data={listDevices}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={renderItem}
          style={styles.listConatiner}
          contentContainerStyle={styles.contentContainerStyle}
        />
        {isLoading && <Loading />}
      </View>
    );
  };

  return (
    <NativeRouter>
      <Routes>
        <Route path="/" Component={rootViewContainer} />
        <Route
          path="/deviceInfo/:device_id/:device_name/:secure_element/:biometric"
          Component={DeviceInfoView}
        />
      </Routes>
    </NativeRouter>
  );
};

export default ListRegisteredDevicesView;
