import type { GestureResponderEvent } from 'react-native';
import type { HeaderProps } from '../../components/Header/types';
import type {
  CustomError,
  GetUserProfileResponse,
} from 'react-native-cloud-ca';

export interface GetUsersProfileViewProps {
  headerProps?: HeaderProps;
  goBack: (event: GestureResponderEvent) => void;
  onDone?: (allResponse: AllGetUserProfileViewResponse) => void;
}

export interface AllGetUserProfileViewResponse {
  getUserProfileResponse?: GetUserProfileResponse;
  error?: CustomError;
}
