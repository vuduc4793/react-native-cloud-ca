import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import {
  CustomError,
  Dialogue,
  GetUserProfileResponse,
  Header,
  InfoField,
  Loading,
  getUserProfile,
  validateToken,
} from 'react-native-cloud-ca';
import type {
  AllGetUserProfileViewResponse,
  GetUsersProfileViewProps,
} from './types';

const GetUsersProfileView = (props: GetUsersProfileViewProps) => {
  const { goBack, headerProps, onDone } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState<string>('');
  const [userInfo, setUserInfo] = useState<GetUserProfileResponse>();
  const [allResult, setAllResult] = useState<AllGetUserProfileViewResponse>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        await validateToken();
        const result = await getUserProfile();
        setUserInfo(result);
        setIsLoading(false);
        setAllResult({ getUserProfileResponse: result });
      } catch (error) {
        setIsShowError(true);
        setErrorResponse(
          `${(error as CustomError)?.code} - ${(error as CustomError)?.message}`
        );
        setIsLoading(false);
        setAllResult({ error: error as CustomError });
      }
    })();
  }, []);

  useEffect(() => {
    onDone?.(allResult!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allResult]);

  return (
    <View style={styles.container}>
      <Header {...headerProps} label="Thông tin tài khoản" goBack={goBack} />
      <View style={styles.contentContainer}>
        <InfoField title="Loại tài khoản" info={'Doanh nghiệp'} />
        <InfoField title="Họ và tên" info={userInfo?.user_name || ''} />
        <InfoField title="Số điện thoại" info={userInfo?.user_mobile || ''} />
        <InfoField title="Email" info={userInfo?.user_email || ''} />
      </View>
      <Dialogue
        modalType="ERROR"
        onClose={() => setIsShowError(false)}
        visible={isShowError}
      >
        <Text style={styles.contentStyle}>{errorResponse}</Text>
      </Dialogue>
      {isLoading && <Loading />}
    </View>
  );
};

export default GetUsersProfileView;
