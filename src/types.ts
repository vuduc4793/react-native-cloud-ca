export interface SetupSDKParams {
  baseUrl: string;
}

// 4.1 AuthenticateClient
export interface AuthenticateClientParams {
  clientId: string;
  clientSecret: string;
  grantType: string;
}

export interface AuthenticateClientResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: string;
}

// 4.2 AuthenticateUser
export interface AuthenticateUserParams {
  userId: string;
}

export interface TokenInfo {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface AuthenticateUserResponse {
  auth_type: string;
  token_info: TokenInfo;
}

// 4.3 Verify OTP
export interface VerifyOTPParams {
  userId: string;
  otpSms: string;
  otpMail: string;
}

export interface VerifyOTPResponse extends TokenInfo {}

// 4.4 Renew Access Token
export interface RenewAccessTokenParams {
  clientId: string;
  clientSecret: string;
}

export interface RenewAccessTokenResponse extends TokenInfo {}

// 4.5 DeviceRegistration
export interface RegisterDeviceParams {}

export interface RegisterDeviceResponse extends AuthenticateUserResponse {}

// 4.6 List Registered Devices
export interface ListRegisteredDevicesParams {
  userId: string;
}

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
export interface AuthorisationPendingRequestParams {}

// 4.10 Cancel a Pending Authorisation Request
export interface CancelPendingRequestParams {}

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
  clientId: string;
  userId: string;
  format: QRFormat;
  size: string;
}

export interface GenerateQRCodeResponse {
  size: string;
  qr_code: string;
  format: string;
}

// 4.14 Verify QR Code
export interface VerifyQRCodeParams {
  userId: string;
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
  message: string;
}

export type BaseResponse = string;
