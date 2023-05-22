import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 36,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    paddingBottom: 26,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  cancelButton: {
    marginRight: 16,
    flex: 1,
  },
  confirmButton: {
    flex: 1,
  },
  contentStyle: {
    fontSize: 14,
    color: '#44494D',
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
  },
  emptyText: {
    color: '#9099A0',
    fontSize: 16,
    marginBottom: 16,
  },
  reloadRequestText: {
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  emptyImage: {
    width: 185,
    height: 152,
    marginBottom: 36,
  },
  listDocumentContainer: {
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 36,
    marginBottom: 16,
  },
  documentItemText: {
    color: '#121517',
    fontSize: 16,
    lineHeight: 24,
  },
  viewMoreText: {
    color: '#315EFF',
    fontSize: 16,
    lineHeight: 24,
    textDecorationLine: 'underline',
  },
  totalFileDocuments: {
    color: '#6C757D',
    fontSize: 14,
    lineHeight: 20.02,
    marginBottom: 4,
  },
});
