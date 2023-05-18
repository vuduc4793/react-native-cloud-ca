import type { HeaderProps } from '../../components/Header/types';
import type { GestureResponderEvent } from 'react-native';

export interface GetPendingAuthorisationRequestViewProps {
  headerProps?: HeaderProps;
  goBack: (event: GestureResponderEvent) => void;
  authorisationPendingOptions: AuthorisationPendingOptions;
}

export interface AuthorisationPendingOptions {
  /**
   * only for Android OS
   */
  biometricApiType: 'FACE_ID' | 'FINGER_PRINT' | 'DEVICE_CREDENTIAL' | 'AUTO';
  /**
   * only for iOs
   */
  localizedReason: string;
}
