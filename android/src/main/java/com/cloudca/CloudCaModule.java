package com.cloudca;

import android.app.Application;
import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;

import com.viettel.sdk.gosignsdk.helpers.GoSignSDK;
import com.viettel.sdk.gosignsdk.helpers.OTPType;
import com.viettel.sdk.gosignsdk.helpers.QRFormat;
import com.viettel.sdk.gosignsdk.helpers.SDKSetup;
import com.viettel.sdk.gosignsdk.listener.ServiceApiListener;
import com.viettel.sdk.gosignsdk.listener.ServiceApiListenerEmpty;
import com.viettel.sdk.gosignsdk.network.request.ClientAuthenticateAPIRequest;
import com.viettel.sdk.gosignsdk.network.request.DeleteDeviceForNotificationAPIRequest;
import com.viettel.sdk.gosignsdk.network.request.DevicePushNotificationAPIRequest;
import com.viettel.sdk.gosignsdk.network.request.GenerateQRCodeAPIRequest;
import com.viettel.sdk.gosignsdk.network.request.VerifyOTPAPIRequest;
import com.viettel.sdk.gosignsdk.network.request.VerifyQRCodeAPIRequest;
import com.viettel.sdk.gosignsdk.network.response.AuthClientResponse;
import com.viettel.sdk.gosignsdk.network.response.AuthUserResponse;
import com.viettel.sdk.gosignsdk.network.response.DeviceInfo;
import com.viettel.sdk.gosignsdk.network.response.DeviceRegistrationSettings;
import com.viettel.sdk.gosignsdk.network.response.GenerateQRCodeAPIResponse;
import com.viettel.sdk.gosignsdk.network.response.PendingAuthorisationAPIResponse;
import com.viettel.sdk.gosignsdk.network.response.ResponseError;
import com.viettel.sdk.gosignsdk.network.response.TokenInfo;
import com.viettel.sdk.gosignsdk.network.response.UserProfileAPIResponse;
import com.viettel.sdk.gosignsdk.utils.StringUtils;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

@ReactModule(name = CloudCaModule.NAME)
public class CloudCaModule extends ReactContextBaseJavaModule {
  public static final String NAME = "CloudCa";
  public static final String SUCCEEDED = "Succeeded";
  public static final String EVENT_ERROR = "Create Event Error";
  private final ReactApplicationContext reactContext;


  public CloudCaModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;

  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void multiply(double a, double b, Promise promise) {
    promise.resolve(a * b);
  }

  @ReactMethod
  public void sdkSetup(String baseURL, Promise promise) {
    try {
      SDKSetup.initialize((Application) reactContext.getApplicationContext(), baseURL);
      promise.resolve("SDK setup done");
    } catch(Exception e) {
      promise.reject(EVENT_ERROR, "SDK setup error");
    }
  }
  // 4.1 AuthenticateClient
  @ReactMethod
  public void authenticateClient(String clientId, String clientSecret, String grantType, Promise promise) {
    GoSignSDK.get().authenticateClient(new ClientAuthenticateAPIRequest(clientId, clientSecret, grantType),
       new ServiceApiListener<AuthClientResponse>() {
         @Override
         public void onSuccess(AuthClientResponse data) {
           WritableMap result = Arguments.createMap();
           result.putString("access_token", data.getAccessToken());
           result.putString("refresh_token", data.getRefreshToken());
           result.putString("token_type", data.getTokenType());
           result.putString("expires_in", data.getExpiresIn());
           promise.resolve(result);
         }
         @Override
         public void onFail(ResponseError error) {
           CustomException e =  new CustomException(error.getErrorType(), error.getErrorMessage());
           promise.reject(EVENT_ERROR, e);
         }
       });
  }
  // 4.2 AuthenticateUser
  @ReactMethod
  public void authenticateUser(String userId, Promise promise) {
    GoSignSDK.get().authenticateUser(userId,
      new ServiceApiListener<AuthUserResponse>() {
        @Override
        public void onSuccess(AuthUserResponse data) {
          WritableMap result = Arguments.createMap();
          result.putString("auth_type", data.getAuthType());
          // get token info
          AuthClientResponse tokenInfo = data.getTokenInfo();
          if (tokenInfo != null) {
            WritableMap tokenInfoMap = Arguments.createMap();
            tokenInfoMap.putString("access_token", tokenInfo.getAccessToken());
            tokenInfoMap.putString("refresh_token", tokenInfo.getRefreshToken());
            tokenInfoMap.putString("token_type", tokenInfo.getTokenType());
            tokenInfoMap.putString("expires_in", tokenInfo.getExpiresIn());
            // push token info to result
            result.putMap("token_info", tokenInfoMap);
          }
          promise.resolve(result);
        }
        @Override
        public void onFail(ResponseError error) {
          CustomException e =  new CustomException(error.getErrorType(), error.getErrorMessage());
          promise.reject(EVENT_ERROR, e.getError());
        }
      });
  }
  // 4.3 Verify OTP
  @ReactMethod
  public void verifyOTP(String userId, String otpSms, String otpMail, Promise promise) {
    VerifyOTPAPIRequest request = new VerifyOTPAPIRequest();
    request.setUserID(userId);
    List<VerifyOTPAPIRequest.OTPInfo> otpInfo = new ArrayList<>();
    if(StringUtils.valid("OTP_SMS")) {
      otpInfo.add(new VerifyOTPAPIRequest.OTPInfo(otpSms, OTPType.SMS));
    }
    if(StringUtils.valid("OTP_MAIL")) {
      otpInfo.add(new VerifyOTPAPIRequest.OTPInfo(otpMail, OTPType.MAIL));
    }
    request.setOtpInfo(otpInfo);

    GoSignSDK.get().verifyOTP(request, new ServiceApiListener<TokenInfo>() {
      @Override
      public void onSuccess(TokenInfo data) {
        WritableMap result = Arguments.createMap();
        result.putString("access_token", data.getAccessToken());
        result.putString("refresh_token", data.getRefreshToken());
        result.putString("token_type", data.getTokenType());
        result.putDouble("expires_in", data.getExpiresIn());

        promise.resolve(result);
      }
      @Override
      public void onFail(ResponseError error) {
        CustomException e =  new CustomException(error.getErrorType(), error.getErrorMessage());
        promise.reject(EVENT_ERROR, e.getError());
      }
    });
  }
  // 4.4 Renew Access Token
  @ReactMethod
  public void renewAccessToken(String clientId, String clientSecret, Promise promise) {
    GoSignSDK.get().renewAccessToken(clientId, clientSecret,
      new ServiceApiListener<TokenInfo>() {
        @Override
        public void onSuccess(TokenInfo data) {
          WritableMap result = Arguments.createMap();
          result.putString("access_token", data.getAccessToken());
          result.putString("refresh_token", data.getRefreshToken());
          result.putString("token_type", data.getTokenType());
          result.putDouble("expires_in", data.getExpiresIn());

          promise.resolve(result);
        }
        @Override
        public void onFail(ResponseError error) {
          CustomException e =  new CustomException(error.getErrorType(), error.getErrorMessage());
          promise.reject(EVENT_ERROR, e.getError());
        }
      });
  }
  // 4.5 DeviceRegistration
  @ReactMethod
  public void registerDevice(Promise promise) {
    GoSignSDK.get().registerDevice(new ServiceApiListener<AuthUserResponse>() {
      @Override
      public void onSuccess(AuthUserResponse data) {
        WritableMap result = Arguments.createMap();
        result.putString("auth_type", data.getAuthType());
        // get token info
        AuthClientResponse tokenInfo = data.getTokenInfo();
        if (tokenInfo != null) {
          WritableMap tokenInfoMap = Arguments.createMap();
          tokenInfoMap.putString("access_token", tokenInfo.getAccessToken());
          tokenInfoMap.putString("refresh_token", tokenInfo.getRefreshToken());
          tokenInfoMap.putString("token_type", tokenInfo.getTokenType());
          tokenInfoMap.putString("expires_in", tokenInfo.getExpiresIn());
          // push token info to result
          result.putMap("token_info", tokenInfoMap);
        }
        promise.resolve(result);
      }
      @Override
      public void onFail(ResponseError error) {
        CustomException e =  new CustomException(error.getErrorType(), error.getErrorMessage());
        promise.reject(EVENT_ERROR, e.getError());
      }
    });
  }
  // 4.6 List Registered Devices
  @ReactMethod
  public void listRegisteredDevices(String userId, Promise promise) {
    GoSignSDK.get().listRegisteredDevices(userId,
      new ServiceApiListener<List<DeviceInfo>>() {
        @Override
        public void onSuccess(List<DeviceInfo> data) {
          DeviceInfo[] returnArray = new DeviceInfo[data.size()];
          returnArray = data.toArray(returnArray);

          WritableArray result = Arguments.createArray();
          for(int i=0;i<returnArray.length;i++){
            DeviceInfo deviceChildInfo = returnArray[i];
            WritableMap deviceChildInfoMap = Arguments.createMap();
            deviceChildInfoMap.putString("device_id", deviceChildInfo.getDeviceID());
            deviceChildInfoMap.putString("device_name", deviceChildInfo.getDeviceName());
            deviceChildInfoMap.putBoolean("secure_element", deviceChildInfo.isSecureElement());
            deviceChildInfoMap.putBoolean("biometric", deviceChildInfo.isBiometric());

            result.pushMap(deviceChildInfoMap);
          }
          promise.resolve(result);
        }
        @Override
        public void onFail(ResponseError error) {
          CustomException e =  new CustomException(error.getErrorType(), error.getErrorMessage());
          promise.reject(EVENT_ERROR, e.getError());
        }
      });
  }
  // 4.7 Delete Device
  @ReactMethod
  public void deleteDevice(String deviceId, Promise promise) {
    GoSignSDK.get().deleteDevice(deviceId,
      new ServiceApiListenerEmpty() {
        @Override
        public void onSuccess() {
          promise.resolve(SUCCEEDED);
        }
        @Override
        public void onFail(ResponseError error) {
          CustomException e =  new CustomException(error.getErrorType(), error.getErrorMessage());
          promise.reject(EVENT_ERROR, e.getError());
        }
      });
  }
  // 4.8 Get Pending Authorisation Request
  @ReactMethod
  public void getPendingAuthorisationRequest(Promise promise) {
    GoSignSDK.get().getPendingAuthorisationRequest(new ServiceApiListener<PendingAuthorisationAPIResponse>() {
      @Override
      public void onSuccess(PendingAuthorisationAPIResponse data) {
        WritableMap result = Arguments.createMap();
        result.putString("transaction_id", data.getTransactionID());
        result.putString("request", data.getRequest());
        result.putString("hash_algorithm", data.getHashAlgorithm());

        promise.resolve(result);
      }
      @Override
      public void onFail(ResponseError error) {
        CustomException e =  new CustomException(error.getErrorType(), error.getErrorMessage());
        promise.reject(EVENT_ERROR, e.getError());
      }
    });
  }
  // 4.9 Authorise a Pending Request
  @ReactMethod
  public void authorisationPendingRequest(Promise promise) {
    GoSignSDK.get().authorisationPendingRequest(new ServiceApiListenerEmpty() {
      @Override
      public void onSuccess() {
        promise.resolve(SUCCEEDED);
      }
      @Override
      public void onFail(ResponseError error) {
        CustomException e =  new CustomException(error.getErrorType(), error.getErrorMessage());
        promise.reject(EVENT_ERROR, e.getError());
      }
    });
  }
  // 4.10 Cancel a Pending Authorisation Request
  @ReactMethod
  public void cancelPendingRequest(Promise promise) {
    GoSignSDK.get().cancelPendingRequest(new ServiceApiListenerEmpty() {
      @Override
      public void onSuccess() {
        promise.resolve(SUCCEEDED);
      }
      @Override
      public void onFail(ResponseError error) {
        CustomException e =  new CustomException(error.getErrorType(), error.getErrorMessage());
        promise.reject(EVENT_ERROR, e.getError());
      }
    });
  }
  // 4.11 Users Profile
  @ReactMethod
  public void getUserProfile(Promise promise) {
    GoSignSDK.get().getUserProfile(new ServiceApiListener<UserProfileAPIResponse>() {
      @Override
      public void onSuccess(UserProfileAPIResponse data) {
        WritableMap result = Arguments.createMap();
        result.putString("user_id", data.getUserID());
        result.putString("user_name", data.getUserName());
        result.putString("app_name", data.getAppName());
        result.putString("user_email", data.getUserEmail());
        result.putString("user_mobile", data.getUserMobile());

        promise.resolve(result);
      }
      @Override
      public void onFail(ResponseError error) {
        CustomException e =  new CustomException(error.getErrorType(), error.getErrorMessage());
        promise.reject(EVENT_ERROR, e.getError());
      }
    });
  }
  // 4.12 Get Device Registration Settings
  @ReactMethod
  public void getDeviceRegistrationSettings(Promise promise) {
    GoSignSDK.get().getDeviceRegistrationSettings(new ServiceApiListener<DeviceRegistrationSettings>() {
      @Override
      public void onSuccess(DeviceRegistrationSettings data) {
        WritableMap result = Arguments.createMap();
        result.putString("device_key_type", data.getDeviceKeyType());
        result.putInt("device_key_size", data.getDeviceKeySize());
        result.putBoolean("secure_element_required", data.isSecureElementRequired());
        result.putBoolean("biometric_required", data.isBiometricRequired());
        result.putString("allowed_devices", data.getAllowedDevices());
        result.putString("clock_tolerance_on_auth_cert", data.getClockToleranceOnAuthCERT());

        promise.resolve(result);
      }
      @Override
      public void onFail(ResponseError error) {
        CustomException e =  new CustomException(error.getErrorType(), error.getErrorMessage());
        promise.reject(EVENT_ERROR, e.getError());
      }
    });
  }
  // 4.13 Generate QR Code
  @ReactMethod
  public void generateQRCode(String clientId, String userId, QRFormat format, String size, Promise promise) {
    GenerateQRCodeAPIRequest qrCodeAPIRequest = new GenerateQRCodeAPIRequest(clientId, userId, format, size);
    GoSignSDK.get().generateQRCode(qrCodeAPIRequest, new ServiceApiListener<GenerateQRCodeAPIResponse>() {
      @Override
      public void onSuccess(GenerateQRCodeAPIResponse data) {
        WritableMap result = Arguments.createMap();
        result.putString("size", data.getSize());
        result.putString("qr_code", data.getQrCode());
        result.putString("format", data.getFormat().toString());
        promise.resolve(result);
      }
      @Override
      public void onFail(ResponseError error) {
        CustomException e =  new CustomException(error.getErrorType(), error.getErrorMessage());
        promise.reject(EVENT_ERROR, e.getError());
      }
    });
  }
  // 4.14 Verify QR Code
  @ReactMethod
  public void verifyQRCode(String userId, String qrCode, Promise promise) {
    GoSignSDK.get().verifyQRCode(new VerifyQRCodeAPIRequest(userId, qrCode),
      new ServiceApiListener<TokenInfo>() {
        @Override
        public void onSuccess(TokenInfo data) {
          WritableMap result = Arguments.createMap();
          result.putString("access_token", data.getAccessToken());
          result.putString("refresh_token", data.getRefreshToken());
          result.putString("token_type", data.getTokenType());
          result.putDouble("expires_in", data.getExpiresIn());
          promise.resolve(result);
        }
        @Override
        public void onFail(ResponseError error) {
          CustomException e =  new CustomException(error.getErrorType(), error.getErrorMessage());
          promise.reject(EVENT_ERROR, e.getError());
        }
      });
  }
  // 4.15 Register Device for Push Notification
  @ReactMethod
  public void registerDeviceForPushNotification(String deviceToken, Promise promise) {
    GoSignSDK.get().registerDeviceForPushNotification(new DevicePushNotificationAPIRequest(deviceToken),
      new ServiceApiListenerEmpty() {
        @Override
        public void onSuccess() {
          promise.resolve(SUCCEEDED);
        }
        @Override
        public void onFail(ResponseError error) {
          CustomException e =  new CustomException(error.getErrorType(), error.getErrorMessage());
          promise.reject(EVENT_ERROR, e.getError());
        }
      });
  }
  // 4.16 Delete Device for Push Notification
  @ReactMethod
  public void deleteDeviceForPushNotification(String deviceToken, Promise promise) {
    GoSignSDK.get().deleteDeviceForPushNotification(new DeleteDeviceForNotificationAPIRequest(deviceToken),
      new ServiceApiListenerEmpty() {
        @Override
        public void onSuccess() {
          promise.resolve(SUCCEEDED);
        }
        @Override
        public void onFail(ResponseError error) {
          CustomException e =  new CustomException(error.getErrorType(), error.getErrorMessage());
          promise.reject(EVENT_ERROR, e.getError());
        }
      });
  }
}
