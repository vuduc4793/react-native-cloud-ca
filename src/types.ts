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

export interface AuthenticateUserResponse {
  auth_type: string;
  token_info: string;
}

// 4.3 Verify OTP
export interface VerifyOTPParams {
  userId: string;
  otpSms: string;
  otpMail: string;
}

export interface VerifyOTPResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: string;
}

// 4.4 Renew Access Token
export interface RenewAccessTokenParams {
  clientId: string;
  clientSecret: string;
}

export interface RenewAccessTokenResponse extends VerifyOTPResponse {}

// 4.5 DeviceRegistration
export interface RegisterDeviceParams {}

export interface RegisterDeviceResponse extends AuthenticateUserResponse {}

export interface ListRegisteredDevicesParams {
  userId: string;
}

export interface DeleteDeviceParams {
  deviceId: string;
}

export interface GetPendingAuthorisationRequestParams {}

export interface AuthorisationPendingRequestParams {}

export interface CancelPendingRequestParams {}

export interface GetUserProfileParams {}

export interface GetDeviceRegistrationSettingsParams {}

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

export interface VerifyQRCodeParams {
  userId: string;
  qrCode: string;
}

export interface RegisterDeviceForPushNotificationParams {
  deviceToken: string;
}

export interface DeleteDeviceForPushNotificationParams {
  deviceToken: string;
}

export interface CustomError {
  error: string;
}
