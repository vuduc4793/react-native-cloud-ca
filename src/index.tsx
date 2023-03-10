import { NativeModules, Platform } from 'react-native';
import type {
  AuthenticateClientParams,
  AuthenticateClientResponse,
  AuthenticateUserParams,
  AuthenticateUserResponse,
  AuthorisationPendingRequestParams,
  BaseResponse,
  CancelPendingRequestParams,
  DeleteDeviceForPushNotificationParams,
  DeleteDeviceParams,
  GenerateQRCodeParams,
  GenerateQRCodeResponse,
  GetDeviceRegistrationSettingsParams,
  GetDeviceRegistrationSettingsResponse,
  GetPendingAuthorisationRequestParams,
  GetPendingAuthorisationRequestResponse,
  GetUserProfileParams,
  GetUserProfileResponse,
  ListRegisteredDevicesParams,
  ListRegisteredDevicesResponse,
  RegisterDeviceForPushNotificationParams,
  RegisterDeviceParams,
  RegisterDeviceResponse,
  RenewAccessTokenParams,
  RenewAccessTokenResponse,
  SetupSDKParams,
  VerifyOTPParams,
  VerifyOTPResponse,
  VerifyQRCodeParams,
  VerifyQRCodeResponse,
} from './types';

const LINKING_ERROR =
  `The package 'react-native-cloud-ca' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const CloudCa = NativeModules.CloudCa
  ? NativeModules.CloudCa
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function sdkSetup(params?: SetupSDKParams): Promise<BaseResponse> {
  const { baseUrl } = params ?? { baseUrl: '' };
  const urlValidated = validateUrl(baseUrl);
  return CloudCa.sdkSetup(urlValidated);
}

function validateUrl(params: string) {
  if (!params.startsWith('http://') && !params.startsWith('https://')) {
    return 'https://' + params;
  }
  return params;
}

// 4.1 AuthenticateClient
export function authenticateClient(
  params: AuthenticateClientParams
): Promise<AuthenticateClientResponse> {
  const { clientId, clientSecret, grantType } = params;
  return CloudCa.authenticateClient(clientId, clientSecret, grantType);
}

// 4.2 AuthenticateUser
export function authenticateUser(
  params: AuthenticateUserParams
): Promise<AuthenticateUserResponse> {
  const { userId } = params;
  return CloudCa.authenticateUser(userId);
}

// 4.3 Verify OTP
export function verifyOTP(params: VerifyOTPParams): Promise<VerifyOTPResponse> {
  const { otpMail, otpSms, userId } = params;
  return CloudCa.verifyOTP(userId, otpSms, otpMail);
}

// 4.4 Renew Access Token
export function renewAccessToken(
  params: RenewAccessTokenParams
): Promise<RenewAccessTokenResponse> {
  const { refresh_token } = params;
  if (Platform.OS === 'ios') {
    return CloudCa.renewAccessToken(refresh_token);
  }
  return CloudCa.renewAccessToken();
}

// 4.5 DeviceRegistration
export function registerDevice(
  params?: RegisterDeviceParams
): Promise<RegisterDeviceResponse> {
  const { biometricApiType, localizedReason } = params ?? {};
  if (Platform.OS === 'ios') {
    return CloudCa.registerDevice(localizedReason);
  }
  return CloudCa.registerDevice(biometricApiType);
}

// 4.6 List Registered Devices
export function listRegisteredDevices(
  params: ListRegisteredDevicesParams
): Promise<ListRegisteredDevicesResponse> {
  const { userId } = params;
  return CloudCa.listRegisteredDevices(userId);
}

// 4.7 Delete Device
export function deleteDevice(
  params: DeleteDeviceParams
): Promise<BaseResponse> {
  const { deviceId } = params;
  return CloudCa.deleteDevice(deviceId);
}

// 4.8 Get Pending Authorisation Request
export function getPendingAuthorisationRequest(
  params?: GetPendingAuthorisationRequestParams
): Promise<GetPendingAuthorisationRequestResponse> {
  const {} = params ?? {};
  return CloudCa.getPendingAuthorisationRequest();
}

// 4.9 Authorise a Pending Request
export function authorisationPendingRequest(
  params?: AuthorisationPendingRequestParams
): Promise<BaseResponse> {
  const {
    biometricApiType,
    hashAlgorithm,
    localizedReason,
    request,
    transactionID,
  } = params ?? {};
  if (Platform.OS === 'ios') {
    return CloudCa.authorisationPendingRequest(
      localizedReason,
      transactionID,
      request,
      hashAlgorithm
    );
  }
  return CloudCa.authorisationPendingRequest(
    biometricApiType,
    transactionID,
    request,
    hashAlgorithm
  );
}

// 4.10 Cancel a Pending Authorisation Request
export function cancelPendingRequest(
  params: CancelPendingRequestParams
): Promise<BaseResponse> {
  const { hashAlgorithm, request, transactionID } = params ?? {};
  if (Platform.OS === 'ios') {
    return CloudCa.cancelPendingRequest(transactionID, request, hashAlgorithm);
  }
  return CloudCa.cancelPendingRequest();
}

// 4.11 Users Profile
export function getUserProfile(
  params?: GetUserProfileParams
): Promise<GetUserProfileResponse> {
  const {} = params ?? {};
  return CloudCa.getUserProfile();
}

// 4.12 Get Device Registration Settings
export function getDeviceRegistrationSettings(
  params?: GetDeviceRegistrationSettingsParams
): Promise<GetDeviceRegistrationSettingsResponse> {
  const {} = params ?? {};
  return CloudCa.getDeviceRegistrationSettings();
}

// 4.13 Generate QR Code
export function generateQRCode(
  params: GenerateQRCodeParams
): Promise<GenerateQRCodeResponse> {
  const { clientId, format, size, userId } = params;
  if (Platform.OS === 'ios') {
    return CloudCa.generateQRCode(clientId, userId);
  }
  return CloudCa.generateQRCode(format, size);
}

// 4.14 Verify QR Code
export function verifyQRCode(
  params: VerifyQRCodeParams
): Promise<VerifyQRCodeResponse> {
  const { qrCode, userId } = params;
  console.log('params', params);
  return CloudCa.verifyQRCode(userId, qrCode);
}

// 4.15 Register Device for Push Notification
export function registerDeviceForPushNotification(
  params: RegisterDeviceForPushNotificationParams
): Promise<BaseResponse> {
  const { deviceToken } = params;
  return CloudCa.registerDeviceForPushNotification(deviceToken);
}

// 4.16 Delete Device for Push Notification
export function deleteDeviceForPushNotification(
  params: DeleteDeviceForPushNotificationParams
): Promise<BaseResponse> {
  const { deviceToken } = params;
  return CloudCa.deleteDeviceForPushNotification(deviceToken);
}

export * from './hooks';

export * from './types';
