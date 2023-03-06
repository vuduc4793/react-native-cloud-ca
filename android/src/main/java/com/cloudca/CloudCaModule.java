package com.cloudca;

import android.app.Application;
import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
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
  public void sdkSetup(Promise promise) {
    try {
      SDKSetup.initialize((Application) reactContext.getApplicationContext());
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
           promise.resolve(data);
         }
         @Override
         public void onFail(ResponseError error) {
           CustomException e =  new CustomException(error.getErrorType(), error.getErrorMessage());
           promise.reject(EVENT_ERROR, e.getError());
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
          promise.resolve(data);
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
        promise.resolve(data);
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
          promise.resolve(data);
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
  public void registerDevice(String clientId, String clientSecret, String grantType, Promise promise) {
    GoSignSDK.get().registerDevice(new ServiceApiListener<AuthUserResponse>() {
      @Override
      public void onSuccess(AuthUserResponse data) {
        promise.resolve(data);
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
          promise.resolve(data);
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
  public void deleteDevice(String deviceID, Promise promise) {
    GoSignSDK.get().deleteDevice(deviceID,
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
        promise.resolve(data);
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
  public void cancelPendingRequest(String clientId, String clientSecret, String grantType, Promise promise) {
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
        promise.resolve(data);
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
        promise.resolve(data);
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
  public void generateQRCode(String clientID, String userID, QRFormat format, String size, Promise promise) {
    GenerateQRCodeAPIRequest qrCodeAPIRequest = new GenerateQRCodeAPIRequest(clientID, userID, format, size);
    GoSignSDK.get().generateQRCode(qrCodeAPIRequest, new ServiceApiListener<GenerateQRCodeAPIResponse>() {
      @Override
      public void onSuccess(GenerateQRCodeAPIResponse data) {
        promise.resolve(data);
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
  public void verifyQRCode(String userID, String qrCode, Promise promise) {
    GoSignSDK.get().verifyQRCode(new VerifyQRCodeAPIRequest(userID, qrCode),
      new ServiceApiListener<TokenInfo>() {
        @Override
        public void onSuccess(TokenInfo data) {
          promise.resolve(data);
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
