import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  buttonWarp: {
    flexDirection: 'row',
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 16,
    paddingBottom: 32,
    paddingTop: 37.67,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: 76.67,
    height: 76.67,
    marginBottom: 17.67,
  },
  closeStyle: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 12,
    right: 16,
  },
  closeImage: {
    width: 24,
    height: 24,
    tintColor: '#9099A0',
  },
  titleStyle: {
    fontSize: 20,
    color: '#44494D',
    marginBottom: 16,
  },
  contentStyle: {
    fontSize: 14,
    color: '#44494D',
    marginBottom: 24,
    textAlign: 'center',
  },
  confirmButton: {
    marginTop: 24,
    backgroundColor: '#EE0033',
    borderRadius: 4,
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EE0033',
    borderRadius: 4,
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  closeText: {
    fontSize: 14,
    color: '#EE0033',
    textAlign: 'center',
  },
  confirmText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
