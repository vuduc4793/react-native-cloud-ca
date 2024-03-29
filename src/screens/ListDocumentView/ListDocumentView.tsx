import React, { useState, useEffect } from 'react';
import {
  View,
  ListRenderItemInfo,
  Text,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import styles from './styles';
import { DocumentTypes, Header } from 'react-native-cloud-ca';
import { useNavigate } from 'react-router-native';
import type { ListDocumentViewProps } from './types';

const ListDocumentView = (props: ListDocumentViewProps) => {
  const { documents } = props;
  const navigate = useNavigate();
  const [documentsData, setDocumentsData] =
    useState<Array<DocumentTypes>>(documents);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    if (searchValue?.length === 0) {
      setDocumentsData(documents);
    }
    const timer = setTimeout(() => {
      const results = documents.filter((document: DocumentTypes) => {
        return document.Name.toUpperCase().includes(searchValue.toUpperCase());
      });
      setDocumentsData(results);
      console.log(results);
    }, 500);
    return () => clearTimeout(timer);
  }, [documents, searchValue]);

  function onGoBack() {
    navigate(-1);
  }

  const renderItem = ({ item, index }: ListRenderItemInfo<DocumentTypes>) => {
    return (
      <View style={styles.documentContainer}>
        <Text numberOfLines={1} key={index} style={styles.documentItemText}>{`${
          index + 1
        }. ${item?.Name}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header label="Danh sách tài liệu ký" goBack={onGoBack} />
      <View style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <Image
              style={styles.iconMagnify}
              source={require('../../asset/icon/IC_MAGNIFY.png')}
            />
            <TextInput
              style={styles.inputField}
              placeholder=" Nhập tên hợp đồng cần tìm kiếm"
              placeholderTextColor={'#6C757D'}
              selectionColor={'#121517'}
              value={searchValue}
              onChangeText={setSearchValue}
            />
          </View>
        </View>
        <FlatList
          contentContainerStyle={styles.listDocumentContainer}
          data={documentsData}
          renderItem={renderItem}
          keyExtractor={(_item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default ListDocumentView;
