import type { BaseResponse, CustomError } from 'react-native-cloud-ca';

export interface DeviceInfoViewProps {
  onDone?: (allResult: DeviceInfoViewAllResponse) => void;
}

export interface DeviceInfoViewAllResponse {
  deleteDeviceResponse?: BaseResponse;
  error?: CustomError;
}
