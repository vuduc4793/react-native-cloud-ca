# react-native-cloud-ca

This is a module written in TypeScript that exports a set of functions that wrap native modules of a React Native library called react-native-cloud-ca.

## Installation

```sh
yarn add react-native-cloud-ca
or
npm install react-native-cloud-ca
```

## Attention for iOs

> Install pods:
> cd ios && pod install && cd ..
>
> Face ID & Touch ID setup:
> Ensure that you have the **NSFaceIDUsageDescription** entry set in your react native iOS project, or Face ID will not work properly. This description will be presented to the user the first time a biometrics action is taken, and the user will be asked if they want to allow the app to use Face ID. If the user declines the usage of face id for the app, the isSensorAvailable function will indicate biometrics is unavailable until the face id permission is specifically allowed for the app by the user.

## Basic Usage

- Base interface:

```js
interface CustomError {
  code?: string;
  message: string;
}

type BaseResponse = { result: string };
```

- Setup SDK:

```js
import { sdkSetup } from 'react-native-cloud-ca';

// ...
sdkSetup({ baseUrl: '' })
  .then((result) => {
    // Do something
  })
  .catch((error) => {
    // Do something
  });
// ...
```

## How to use API

- 4.1 AuthenticateClient:

> This API is used to authenticate a client using its credentials. The RAS Service returns an access token on
> successful authentication of the client.

> Request: AuthenticateClientParams
> Response: Promise\<AuthenticateClientResponse>

```js
import { authenticateClient } from 'react-native-cloud-ca';

// ...
authenticateClient({
  clientId: 'clientId',
  clientSecret: 'clientSecret',
  grantType: 'grantType',
})
  .then((result) => {
    // Do something
  })
  .catch((error) => {
    // Do something
  });
// ...
```

```js
interface AuthenticateClientParams {
  clientId: string;
  clientSecret: string;
  grantType: string;
}

interface AuthenticateClientResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: string;
}
```

- 4.2 AuthenticateUser:

> This call initiates the user authentication on the mobile application.

> Request: AuthenticateUserParams
> Response: Promise\<AuthenticateUserResponse>

```js
import { authenticateUser } from 'react-native-cloud-ca';

// ...
authenticateUser({
  userId: 'userId',
})
  .then((result) => {
    // Do something
  })
  .catch((error) => {
    // Do something
  });
// ...
```

```js
interface AuthenticateUserParams {
  userId: string;
}

interface TokenInfo {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

interface AuthenticateUserResponse {
  auth_type: string;
  token_info: TokenInfo;
}
```

- 4.3 Verify OTP:

> The user will provide these OTPs to this API. After successful OTPs verification, access and refresh
> tokens are returned.

> Request: VerifyOTPParams
> Response: Promise\<VerifyOTPResponse>

```js
import { verifyOTP } from 'react-native-cloud-ca';

// ...
verifyOTP({
  userId: 'userId',
  otpSms: 'otpSms',
  otpMail: 'otpMail',
})
  .then((result) => {
    // Do something
  })
  .catch((error) => {
    // Do something
  });
// ...
```

```js
interface VerifyOTPParams {
  userId: string;
  otpSms: string;
  otpMail: string;
}

interface VerifyOTPResponse extends TokenInfo {}
```

- 4.4 Renew Access Token:

> TThis API allows the renewal of an expired access token by providing the refresh token.

> Request: RenewAccessTokenParams
> Response: Promise\<RenewAccessTokenResponse>

```js
import { renewAccessToken } from 'react-native-cloud-ca';

// ...
renewAccessToken({
  refresh_token?: "refresh_token"
})
  .then((result) => {
    // Do something
  })
  .catch((error) => {
    // Do something
  });
// ...
```

```js
export interface RenewAccessTokenParams {
  /**
   * only for iOs
   */
  refresh_token?: string;
}

export interface RenewAccessTokenResponse extends TokenInfo {}
```

- 4.5 DeviceRegistration:

> This API is used to register user’s mobile device for remote signature authorisation purposes and request a
> certificate for the device’s authorisation public key.

> Request: RegisterDeviceParams
> Response: Promise\<RegisterDeviceResponse>

```js
import { registerDevice } from 'react-native-cloud-ca';

// ...
registerDevice({
  /**
   * only for Android OS
   */
  biometricApiType: 'FACE_ID' | 'FINGER_PRINT' | 'DEVICE_CREDENTIAL' | 'AUTO',
  /**
   * only for iOs
   */
  localizedReason: 'localizedReason',
})
  .then((result) => {
    // Do something
  })
  .catch((error) => {
    // Do something
  });
// ...
```

```js
interface RegisterDeviceParams {
  /**
   * only for Android OS
   */
  biometricApiType: 'FACE_ID' | 'FINGER_PRINT' | 'DEVICE_CREDENTIAL' | 'AUTO';
  /**
   * only for iOs
   */
  localizedReason: string;
}

interface RegisterDeviceResponse {
  alias: string;
  certificate: string;
}
```

- 4.6 List Registered Devices:

> This API returns all the devices of a user that user has registered for use in remote authorised signing
> operations

> Request: ListRegisteredDevicesParams
> Response: Promise\<ListRegisteredDevicesResponse>

```js
import { listRegisteredDevices } from 'react-native-cloud-ca';

// ...
listRegisteredDevices({
  userId: 'userId',
})
  .then((result) => {
    // Do something
  })
  .catch((error) => {
    // Do something
  });
// ...
```

```js
interface ListRegisteredDevicesParams {
  userId: string;
}

interface DeviceInfo {
  device_id: string;
  device_name: string;
  secure_element: boolean;
  biometric: boolean;
}

type ListRegisteredDevicesResponse = Array<DeviceInfo>;
```

- 4.7 Delete Device:

> A client application would use this interface to delete a user’s device.

> Request: DeleteDeviceParams
> Response: Promise\<BaseResponse>

```js
import { deleteDevice } from 'react-native-cloud-ca';

// ...
deleteDevice({
  deviceId: 'deviceId',,
})
  .then((result) => {
    // Do something
  })
  .catch((error) => {
    // Do something
  });
// ...
```

```js
interface DeleteDeviceParams {
  deviceId: string;
}
```

- 4.8 Get Pending Authorisation Request:

> This method returns a pending authorisation request. That is, where the business application has requested
> a signing operation that requires user authorisation.

> Request: GetPendingAuthorisationRequestParams
> Response: Promise\<GetPendingAuthorisationRequestResponse>

```js
import { getPendingAuthorisationRequest } from 'react-native-cloud-ca';

// ...
getPendingAuthorisationRequest()
  .then((result) => {
    // Do something
  })
  .catch((error) => {
    // Do something
  });
// ...
```

```js
interface GetPendingAuthorisationRequestParams {}

interface GetPendingAuthorisationRequestResponse {
  transaction_id: string;
  request: string;
  hash_algorithm: string;
}
```

- 4.9 Authorise a Pending Request:

> This method authorises a pending request by sending the signed Signature Activation Data (SAD) against
> the pending authorisation request received.

> Request: AuthorisationPendingRequestParams
> Response: Promise\<BaseResponse>

```js
import { authorisationPendingRequest } from 'react-native-cloud-ca';

// ...
authorisationPendingRequest({
  /**
   * only for Android OS
   */
  biometricApiType: 'FACE_ID' | 'FINGER_PRINT' | 'DEVICE_CREDENTIAL' | 'AUTO';
  /**
   * only for iOs
   */
  localizedReason: "localizedReason",
  transactionID: "transactionID",
  request: "request",
  hashAlgorithm: "hashAlgorithm",
})
  .then((result) => {
    // Do something
  })
  .catch((error) => {
    // Do something
  });
// ...
```

```js
interface AuthorisationPendingRequestParams {
  /**
   * only for Android OS
   */
  biometricApiType: 'FACE_ID' | 'FINGER_PRINT' | 'DEVICE_CREDENTIAL' | 'AUTO';
  /**
   * only for iOs
   */
  localizedReason: string;
  transactionID: string;
  request: string;
  hashAlgorithm: string;
}
```

- 4.10 Cancel a Pending Authorisation Request:

> This method cancels a pending authorisation request

Request: CancelPendingRequestParams
Response: Promise\<BaseResponse>

```js
import { cancelPendingRequest } from 'react-native-cloud-ca';

// ...
cancelPendingRequest({
  /**
   * only for iOs
   */
  transactionID: "transactionID;
  /**
   * only for iOs
   */
  request: "request",
  /**
   * only for iOs
   */
  hashAlgorithm: "hashAlgorithm",
})
  .then((result) => {
    // Do something
  })
  .catch((error) => {
    // Do something
  });
// ...
```

```js
interface CancelPendingRequestParams {
  /**
   * only for iOs
   */
  transactionID: string;
  /**
   * only for iOs
   */
  request: string;
  /**
   * only for iOs
   */
  hashAlgorithm: string;
}
```

- 4.11 Users Profile:

> This API is used to get user’s profile information from ADSS.

> Request: None
> Response: Promise\<GetUserProfileResponse>

```js
import { getUserProfile } from 'react-native-cloud-ca';

// ...
getUserProfile()
  .then((result) => {
    // Do something
  })
  .catch((error) => {
    // Do something
  });
// ...
```

```js
export interface GetUserProfileResponse {
  user_id: string;
  user_name: string;
  app_name: string;
  user_email: string;
  user_mobile: string;
}
```

- 4.12 Get Device Registration Settings:

> This interface is used to get the device related settings configured in the RAS Profile for the devices of a
> user.

> Request: None
> Response: Promise\<GetDeviceRegistrationSettingsResponse>

```js
import { getDeviceRegistrationSettings } from 'react-native-cloud-ca';

// ...
getDeviceRegistrationSettings({
  clientId: 'clientId',
  clientSecret: 'clientSecret',
  grantType: 'grantType',
})
  .then((result) => {
    // Do something
  })
  .catch((error) => {
    // Do something
  });
// ...
```

```js
interface GetDeviceRegistrationSettingsResponse {
  device_key_type: string;
  device_key_size: number;
  secure_element_required: boolean;
  biometric_required: boolean;
  allowed_devices: string;
  clock_tolerance_on_auth_cert: string;
}
```

- 4.13 Generate QR Code:

> This API will be used by the business application to generate a QR Code using the RAS Service

> Request: GenerateQRCodeParams
> Response: Promise\<GenerateQRCodeResponse>

```js
import { generateQRCode } from 'react-native-cloud-ca';

// ...
generateQRCode({
  /**
   * only for iOs
   */
  clientId: 'clientId',
  /**
   * only for iOs
   */
  userId: 'userId',
  /**
   * only for Android OS
   */
  format: 'QRFormat',
  /**
   * only for Android OS
   */
  size: 'size',
})
  .then((result) => {
    // Do something
  })
  .catch((error) => {
    // Do something
  });
// ...
```

```js
 enum QRFormat {
  PNG = 'png',
  JPG = 'jpg',
  BMP = 'bmp',
  JPEG = 'jpeg',
  WBMP = 'wbmp',
  GIF = 'gif',
  NONE = 'NONE',
}

 interface GenerateQRCodeParams {
  /**
   * only for iOs
   */
  clientId: string;
  /**
   * only for iOs
   */
  userId: string;
  /**
   * only for Android OS
   */
  format: QRFormat;
  /**
   * only for Android OS
   */
  size: string;
}

 interface GenerateQRCodeResponse {
  size: string;
  qr_code: string;
  format: string;
}

```

- 4.14 Verify QR Code:

> This API will be used to verify a QR Code by RAS Service.

Request: VerifyQRCodeParams
Response: Promise\<VerifyQRCodeResponse>

```js
import { verifyQRCode } from 'react-native-cloud-ca';

// ...
verifyQRCode({
  userId: 'userId',
  qrCode: 'qrCode',
})
  .then((result) => {
    // Do something
  })
  .catch((error) => {
    // Do something
  });
// ...
```

```js
interface VerifyQRCodeParams {
  userId: string;
  qrCode: string;
}

interface VerifyQRCodeResponse extends TokenInfo {}
```

- 4.15 Register Device for Push Notification:

> This API is used to register the mobile device for push notification by RAS Service.

> Request: RegisterDeviceForPushNotificationParams
> Response: Promise\<BaseResponse>

```js
import { registerDeviceForPushNotification } from 'react-native-cloud-ca';

// ...
registerDeviceForPushNotification({
  deviceToken: 'deviceToken',
})
  .then((result) => {
    // Do something
  })
  .catch((error) => {
    // Do something
  });
// ...
```

```js
interface RegisterDeviceForPushNotificationParams {
  deviceToken: string;
}
```

- 4.16 Delete Device for Push Notification:

> This API is used to delete the registered mobile device for push notification by RAS Service.

Request: DeleteDeviceForPushNotificationParams
Response: Promise\<BaseResponse>

```js
import { deleteDeviceForPushNotification } from 'react-native-cloud-ca';

// ...
deleteDeviceForPushNotification({
  deviceToken: 'deviceToken',
})
  .then((result) => {
    // Do something
  })
  .catch((error) => {
    // Do something
  });
// ...
```

```js
interface DeleteDeviceForPushNotificationParams {
  deviceToken: string;
}
```

---

## Hooks

> A hook is a way to reuse logic and state in React. In the provided code, there are multiple hooks imported from the 'react-native-cloud-ca' library that allow for various actions related to cloud-based authentication. These hooks include:

> Each hook returns an array of [result, error, methodCall, isLoading], where:

>- result: the result of the API call.
>- error: any error that occurred during the API call.
>- methodCall: the method that was called to initiate the API request.
>- isLoading: a boolean value indicating whether the API call is currently loading.

```js
import {
  useSdkSetup,
  useAuthenticateClient,
  useAuthenticateUser,
  useVerifyOTP,
  useRenewAccessToken,
  useRegisterDevice,
  useListRegisteredDevices,
  useDeleteDevice,
  useGetPendingAuthorisationRequest,
  useAuthorisationPendingRequest,
  useCancelPendingRequest,
  useGetUserProfile,
  useGetDeviceRegistrationSettings,
  useGenerateQRCode,
  useVerifyQRCode,
  useRegisterDeviceForPushNotification,
  useDeleteDeviceForPushNotification,
} from 'react-native-cloud-ca';

// example
const [setupSdkResponse, setupSdkError, onSetupSDK] = useSdkSetup();
// ...
onSetupSDK({baseUrl: "https://......"});
// ...
```
