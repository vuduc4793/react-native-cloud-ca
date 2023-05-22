import type {
  BaseResponse,
  CustomError,
  GetPendingAuthorisationRequestResponse,
} from 'react-native-cloud-ca';
import type { HeaderProps } from '../../components/Header/types';
import type { GestureResponderEvent } from 'react-native';

export interface GetPendingAuthorisationRequestViewProps {
  headerProps?: HeaderProps;
  goBack: (event: GestureResponderEvent) => void;
  authorisationPendingOptions: AuthorisationPendingOptions;
  onDone?: (allResponse: AllPendingAuthorisationRequestResponse) => void;
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

export interface AllPendingAuthorisationRequestResponse {
  getPendingAuthorisationRequestResponse?: GetPendingAuthorisationRequestResponse;
  authorisationPendingRequestResponse?: BaseResponse;
  cancelPendingRequestResponse?: BaseResponse;
  error?: CustomError;
}
