import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
  AuthorisationDataTypes,
  AuthorisationPendingRequestParams,
  CancelPendingRequestParams,
  CustomError,
  Dialogue,
  DialogueConfirm,
  GetPendingAuthorisationRequestResponse,
  Header,
  InfoField,
  Loading,
  OutlineButton,
  PrimaryButton,
  authorisationPendingRequest,
  cancelPendingRequest,
  decodeRequestBase64,
  getPendingAuthorisationRequest,
  DocumentTypes,
  ListDocumentView,
  CloudCAProviderContext,
  validateToken,
} from 'react-native-cloud-ca';
import styles from './styles';
import type {
  AllPendingAuthorisationRequestResponse,
  GetPendingAuthorisationRequestViewProps,
} from './types';
import { Link, NativeRouter, Route, Routes } from 'react-router-native';

const GetPendingAuthorisationRequestView = (
  props: GetPendingAuthorisationRequestViewProps
) => {
  const { headerProps, authorisationPendingOptions, goBack, onDone } = props;

  const cloudCAProviderContext = React.useContext(CloudCAProviderContext);
  const { themeColor } = cloudCAProviderContext;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowRequest, setIsShowRequest] = useState<boolean>(false);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [isShowSuccess, setIsShowSuccess] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState<string>('');
  const [pendingAuthoriastion, setPendingAuthoriastion] =
    useState<GetPendingAuthorisationRequestResponse>();
  const [requestType, setRequestType] = useState<'Author' | 'Cancel'>('Author');
  const [requestDecoded, setRequestDecoded] =
    useState<AuthorisationDataTypes>();
  const [authorTimeleft, setAuthorTimeleft] = useState<string>('');
  const [allResult, setAllResult] =
    useState<AllPendingAuthorisationRequestResponse>();

  useEffect(() => {
    fetchPendingAuthorisation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPendingAuthorisation = async () => {
    setIsLoading(true);
    try {
      await validateToken();
      const result = await getPendingAuthorisationRequest();
      setPendingAuthoriastion(result);
      setAllResult({ getPendingAuthorisationRequestResponse: result });
      if (result?.request) {
        const authorRequest = await decodeRequestBase64(result?.request);
        setRequestDecoded(authorRequest);
        getTimeleft(authorRequest?.AuthorisationData?.ValidityPeriod?.ValidTo);
      }
      setIsLoading(false);
    } catch (error) {
      setIsShowError(true);
      setErrorResponse(
        `${(error as CustomError)?.code} - ${(error as CustomError)?.message}`
      );
      setIsLoading(false);
      setAllResult({ error: error as CustomError });
    }
  };

  const getTimeleft = (validTo?: string) => {
    const now = new Date().getTime();
    const endtime = new Date(validTo!).getTime();
    const secondsLeft = (endtime - now) / 1000;
    if (secondsLeft > 0) {
      const hours = Math.floor(secondsLeft / 3600);
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = Math.floor(secondsLeft % 60);

      const hourString = hours < 10 ? '0' + hours : hours;
      const minuteString = minutes < 10 ? '0' + minutes : minutes;
      const secondString = seconds < 10 ? '0' + seconds : seconds;

      const timeLeft = `${hourString}:${minuteString}:${secondString}`;

      setAuthorTimeleft(timeLeft);
    } else {
      setAuthorTimeleft('Đã hết hạn');
    }
  };

  const authorisationRequest = async () => {
    setIsLoading(true);
    try {
      await validateToken();
      const params: AuthorisationPendingRequestParams = {
        biometricApiType: authorisationPendingOptions?.biometricApiType,
        hashAlgorithm: pendingAuthoriastion?.hash_algorithm!,
        localizedReason: authorisationPendingOptions?.localizedReason,
        request: pendingAuthoriastion?.request!,
        transactionID: pendingAuthoriastion?.transaction_id!,
      };
      const result = await authorisationPendingRequest(params);
      setAllResult({ authorisationPendingRequestResponse: result });
      setIsLoading(false);
      setIsShowSuccess(true);
      setIsShowRequest(false);
    } catch (error) {
      setIsShowError(true);
      setIsShowRequest(false);
      setErrorResponse(
        `${(error as CustomError)?.code} - ${(error as CustomError)?.message}`
      );
      setIsLoading(false);
      setAllResult({ error: error as CustomError });
    }
  };

  const cancelRequest = async () => {
    setIsLoading(true);
    try {
      await validateToken();
      const params: CancelPendingRequestParams = {
        hashAlgorithm: pendingAuthoriastion?.hash_algorithm!,
        request: pendingAuthoriastion?.request!,
        transactionID: pendingAuthoriastion?.transaction_id!,
      };
      const result = await cancelPendingRequest(params);
      setAllResult({ cancelPendingRequestResponse: result });
      setIsLoading(false);
      setIsShowSuccess(true);
      setIsShowRequest(false);
    } catch (error) {
      setIsShowError(true);
      setIsShowRequest(false);
      setErrorResponse(
        `${(error as CustomError)?.code} - ${(error as CustomError)?.message}`
      );
      setIsLoading(false);
      setAllResult({ error: error as CustomError });
    }
  };

  const handleCancelRequest = () => {
    setRequestType('Cancel');
    setIsShowRequest(true);
  };

  const handleAcceptRequest = () => {
    setRequestType('Author');
    setIsShowRequest(true);
  };

  const onConfirmOnPress = () => {
    if (requestType === 'Author') {
      authorisationRequest();
    } else if (requestType === 'Cancel') {
      cancelRequest();
    }
  };

  const handleDone = () => {
    setIsShowSuccess(false);
    fetchPendingAuthorisation();
    onDone?.(allResult!);
  };

  const handleError = () => {
    setIsShowError(false);
    onDone?.(allResult!);
  };

  const renderDocumentItem = (item: DocumentTypes, index: number) => {
    return (
      <Text numberOfLines={1} key={index} style={styles.documentItemText}>{`${
        index + 1
      }. ${item?.Name}`}</Text>
    );
  };

  const renderListDocuments = () => {
    const documents = requestDecoded?.AuthorisationData?.Documents?.Document;
    return (
      <View style={styles.listDocumentContainer}>
        <Text style={styles.totalFileDocuments}>
          {`Danh sách tài liệu ký (${documents && documents?.length})`}
        </Text>
        {documents
          ?.slice(0, 3)
          ?.map((item, index) => renderDocumentItem(item, index))}
        {documents && documents?.length > 3 && (
          <Link to={`/listDocumentView`} underlayColor="rgba(0,0,0,.01)">
            <Text numberOfLines={1} style={styles.viewMoreText}>
              Xem thêm
            </Text>
          </Link>
        )}
      </View>
    );
  };

  const renderDocuments = () => {
    const document = requestDecoded?.AuthorisationData?.Documents?.Document!;
    if (document?.length) {
      return <>{renderListDocuments()}</>;
    } else if ((document as unknown as DocumentTypes)?.Name?.length) {
      const singleDocument = document as unknown as DocumentTypes;
      return <InfoField title="Tên tài liệu" info={singleDocument?.Name} />;
    } else {
      return <View />;
    }
  };

  const renderRequestInfo = () => {
    return (
      <>
        <View>
          {renderDocuments()}
          <InfoField
            title="Người chia sẻ"
            info={requestDecoded?.AuthorisationData?.OriginatorID}
          />
          <InfoField
            title="Thời gian xác thực ký còn lại"
            info={authorTimeleft}
          />
        </View>
        <View style={styles.buttonContainer}>
          <OutlineButton
            label="Huỷ yêu cầu"
            style={styles.cancelButton}
            onPress={handleCancelRequest}
          />
          <PrimaryButton
            label="Uỷ quyền"
            style={styles.confirmButton}
            onPress={handleAcceptRequest}
          />
        </View>
      </>
    );
  };

  const renderEmptyRequest = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image
          style={styles.emptyImage}
          source={require('../../asset/image/IMG_EMPTY_REQUEST.png')}
        />
        <Text style={styles.emptyText}>Không có yêu cầu cần ký. </Text>
        <TouchableOpacity onPress={fetchPendingAuthorisation}>
          <Text style={[styles.reloadRequestText, { color: themeColor }]}>
            Tải lại yêu cầu
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const rootViewContainer = () => {
    return (
      <View style={styles.container}>
        <Header {...headerProps} label="Uỷ quyền xác thực" goBack={goBack} />
        <View style={styles.contentContainer}>
          {pendingAuthoriastion?.request?.length
            ? renderRequestInfo()
            : renderEmptyRequest()}
        </View>
        <Dialogue visible={isShowSuccess} onClose={handleDone}>
          <Text style={styles.contentStyle}>
            {requestType === 'Author'
              ? 'Bạn đã uỷ quyền xác thực thành công.'
              : 'Bạn đã huỷ yêu cầu xác thực thành công.'}
          </Text>
        </Dialogue>
        <Dialogue modalType="ERROR" onClose={handleError} visible={isShowError}>
          <Text style={styles.contentStyle}>{errorResponse}</Text>
        </Dialogue>
        <DialogueConfirm
          title={
            requestType === 'Cancel'
              ? 'Huỷ yêu cầu xác thực'
              : 'Uỷ quyền xác thực'
          }
          closeOnPress={() => setIsShowRequest(false)}
          closeLabel="Bỏ qua"
          confirmOnPress={onConfirmOnPress}
          confirmLabel="Tiếp tục"
          visible={isShowRequest}
        >
          <Text style={styles.contentStyle}>
            {requestType === 'Cancel'
              ? 'Bạn có chắc chắn muốn huỷ yêu cầu xác thực không?'
              : 'Bạn có chắc chắn muốn uỷ quyền xác thực cho yêu cầu này không?'}
          </Text>
        </DialogueConfirm>
        {isLoading && <Loading />}
      </View>
    );
  };

  const renderListDocumentView = () => {
    return (
      <ListDocumentView
        documents={requestDecoded?.AuthorisationData?.Documents?.Document!}
      />
    );
  };

  return (
    <NativeRouter>
      <Routes>
        <Route path="/" Component={rootViewContainer} />
        <Route path="/listDocumentView" Component={renderListDocumentView} />
      </Routes>
    </NativeRouter>
  );
};

export default GetPendingAuthorisationRequestView;
