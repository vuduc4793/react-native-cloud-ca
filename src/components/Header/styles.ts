import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerContainer: {
    maxHeight: 96,
    flex: 1,
    position: 'relative',
  },
  headerBackgroundImage: {
    height: 96,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(238, 0, 51, 0.9)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingHorizontal: 14,
  },
  iconStyle: {
    tintColor: '#FFFFFF',
    width: 28,
    height: 28,
  },
  headerLabel: {
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 21,
  },
});
