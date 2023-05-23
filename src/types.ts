export interface SetupSDKParams {
  baseUrl: string;
}

export interface InitDataParams {
  /**
   * only for Android OS
   */
  baseURL: string;
  /**
   * only for Android OS
   */
  biometricTitle: string;
  clientId: string;
  clientSecret: string;
  grantType: string;
  userId: string;
}

// 4.1 AuthenticateClient
export interface AuthenticateClientParams {}

export interface AuthenticateClientResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: string;
}

// 4.2 AuthenticateUser
export interface AuthenticateUserParams {}

export interface TokenInfo {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: string;
}

export interface AuthenticateUserResponse {
  auth_type: string;
  token_info: TokenInfo;
}

// 4.3 Verify OTP
export interface VerifyOTPParams {
  otpSms: string;
  otpMail: string;
  /**
   * only for Android OS
   */
  biometricApiType: 'FACE_ID' | 'FINGER_PRINT' | 'DEVICE_CREDENTIAL' | 'AUTO';
}

export interface VerifyOTPResponse extends TokenInfo {}
export interface AndroidVerifyOTPResponse {
  verifyOTPResponse: TokenInfo;
  registerDeviceResponse: RegisterDeviceResponse;
}
// 4.4 Renew Access Token
export interface RenewAccessTokenParams {
  /**
   * only for iOS
   */
  refresh_token?: string;
}

export interface RenewAccessTokenResponse extends TokenInfo {}

// 4.5 DeviceRegistration
export interface RegisterDeviceParams {
  /**
   * only for Android OS
   */
  biometricApiType: 'FACE_ID' | 'FINGER_PRINT' | 'DEVICE_CREDENTIAL' | 'AUTO';
  /**
   * only for iOS
   */
  localizedReason: string;
}

export interface RegisterDeviceResponse {
  alias: string;
  certificate: string;
}

// 4.6 List Registered Devices
export interface ListRegisteredDevicesParams {}

export interface DeviceInfo {
  device_id: string;
  device_name: string;
  secure_element: boolean;
  biometric: boolean;
}

export type ListRegisteredDevicesResponse = Array<DeviceInfo>;

// 4.7 Delete Device
export interface DeleteDeviceParams {
  deviceId: string;
}

// 4.8 Get Pending Authorisation Request
export interface GetPendingAuthorisationRequestParams {}

export interface GetPendingAuthorisationRequestResponse {
  transaction_id: string;
  request: string;
  hash_algorithm: string;
}

// 4.9 Authorise a Pending Request
export interface AuthorisationPendingRequestParams {
  /**
   * only for Android OS
   */
  biometricApiType: 'FACE_ID' | 'FINGER_PRINT' | 'DEVICE_CREDENTIAL' | 'AUTO';
  /**
   * only for iOS
   */
  localizedReason: string;
  transactionID: string;
  request: string;
  hashAlgorithm: string;
}

// 4.10 Cancel a Pending Authorisation Request
export interface CancelPendingRequestParams {
  transactionID: string;
  request: string;
  hashAlgorithm: string;
}

// 4.11 Users Profile
export interface GetUserProfileParams {}

export interface GetUserProfileResponse {
  user_id: string;
  user_name: string;
  app_name: string;
  user_email: string;
  user_mobile: string;
}

// 4.12 Get Device Registration Settings
export interface GetDeviceRegistrationSettingsParams {}
export interface GetDeviceRegistrationSettingsResponse {
  device_key_type: string;
  device_key_size: number;
  secure_element_required: boolean;
  biometric_required: boolean;
  allowed_devices: string;
  clock_tolerance_on_auth_cert: string;
}

// 4.13 Generate QR Code
export enum QRFormat {
  PNG = 'png',
  JPG = 'jpg',
  BMP = 'bmp',
  JPEG = 'jpeg',
  WBMP = 'wbmp',
  GIF = 'gif',
  NONE = 'NONE',
}

export interface GenerateQRCodeParams {
  /**
   * only for iOS
   */
  clientId: string;
  /**
   * only for Android OS
   */
  format: QRFormat;
  /**
   * only for Android OS
   */
  size: string;
}

export interface GenerateQRCodeResponse {
  size: string;
  qr_code: string;
  format: string;
}

// 4.14 Verify QR Code
export interface VerifyQRCodeParams {
  qrCode: string;
}

export interface VerifyQRCodeResponse extends TokenInfo {}

// 4.15 Register Device for Push Notification
export interface RegisterDeviceForPushNotificationParams {
  deviceToken: string;
}

// 4.16 Delete Device for Push Notification
export interface DeleteDeviceForPushNotificationParams {
  deviceToken: string;
}

export interface CustomError {
  code?: string;
  message: string;
}

export type BaseResponse = { result: string };

// decode base64 from 4.8 response

export interface AuthorisationDataTypes {
  AuthorisationData?: {
    OriginatorID: string;
    UserID: string;
    CertificateID: string;
    TransactionID: string;
    Salt: string;
    MetaData: {
      DeviceID: string;
    };
    NumSignatures: string;
    Documents: {
      Document: Array<DocumentTypes>;
    };
    ValidityPeriod: {
      ValidFrom: string;
      ValidTo: string;
    };
    Signature: {
      DigestMethod: string;
    };
  };
}

export interface ValidateTokenTypes extends BaseResponse {}

export interface DocumentTypes {
  $: {
    id: string;
  };
  Name: string;
  DigestValue: string;
}
