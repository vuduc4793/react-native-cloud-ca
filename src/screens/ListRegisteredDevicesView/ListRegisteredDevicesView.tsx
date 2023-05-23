import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './styles';
import {
  DeviceInfo,
  DeviceInfoView,
  Header,
  Loading,
  listRegisteredDevices,
  validateToken,
  CloudCAProviderContext,
} from 'react-native-cloud-ca';
import {
  NativeRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-native';
import type { ListRegisteredDevicesViewProps } from './types';
import { DeviceItem } from './components';

const RootViewContainer = (props: ListRegisteredDevicesViewProps) => {
  const { headerProps, goBack } = props;
  const cloudCAProviderContext = React.useContext(CloudCAProviderContext);
  const { themeColor } = cloudCAProviderContext;
  const [listDevices, setListDevices] = useState<Array<DeviceInfo>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let location = useLocation();

  useEffect(() => {
    fetchListRegisteredDevices();
  }, [location]);

  const fetchListRegisteredDevices = async () => {
    setIsLoading(true);
    try {
      await validateToken();
      const result = await listRegisteredDevices();
      setListDevices(result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const renderEmptyRequest = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image
          style={styles.emptyImage}
          source={require('../../asset/image/IMG_EMPTY_REQUEST.png')}
        />
        <Text style={styles.emptyText}>Không có thiết bị đã đăng ký.</Text>
        <TouchableOpacity onPress={fetchListRegisteredDevices}>
          <Text style={[styles.reloadRequestText, { color: themeColor }]}>
            Tải lại yêu cầu
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
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

  return (
    <View style={styles.container}>
      <Header {...headerProps} goBack={goBack} />
      <>
        {listDevices?.length ? (
          <>
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
          </>
        ) : (
          renderEmptyRequest()
        )}
      </>
      {isLoading && <Loading />}
    </View>
  );
};

const ListRegisteredDevicesView = (props: ListRegisteredDevicesViewProps) => {
  const renderRootView = () => {
    return (
      <RootViewContainer
        goBack={props?.goBack}
        headerProps={props?.headerProps}
      />
    );
  };

  const renderDeviceInfoView = () => {
    return <DeviceInfoView onDone={props?.onDone} />;
  };

  return (
    <NativeRouter>
      <Routes>
        <Route path="/" Component={renderRootView} />
        <Route
          path="/deviceInfo/:device_id/:device_name/:secure_element/:biometric"
          Component={renderDeviceInfoView}
        />
      </Routes>
    </NativeRouter>
  );
};

export default ListRegisteredDevicesView;
