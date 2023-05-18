import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 36,
  },
  contentStyle: {
    fontSize: 14,
    color: '#44494D',
    textAlign: 'center',
  },
  listDocumentContainer: {
    paddingHorizontal: 16,
  },
  documentContainer: {
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginBottom: 16,
  },
  documentItemText: {
    color: '#121517',
    fontSize: 16,
    lineHeight: 24,
  },
  searchContainer: {
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#CED4DA',
    marginBottom: 16,
    paddingBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    backgroundColor: '#EBEEF0',
    borderRadius: 8,
  },
  inputField: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: 16,
    color: '#121517',
    flex: 1,
  },
  iconMagnify: {
    width: 16,
    height: 16,
    tintColor: '#6C757D',
  },
});
