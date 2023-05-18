import type {
  AuthorisationPendingRequestParams,
  CancelPendingRequestParams,
} from 'react-native-cloud-ca';
import type { HeaderProps } from '../../components/Header/types';
import type { GestureResponderEvent } from 'react-native';

export interface GetPendingAuthorisationRequestViewProps {
  headerProps?: HeaderProps;
  goBack: (event: GestureResponderEvent) => void;
  authorisationPendingInfo: AuthorisationPendingInfo;
}

export interface AuthorisationPendingInfo
  extends AuthorisationPendingRequestParams,
    CancelPendingRequestParams {}
