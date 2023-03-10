//
//  CloudCa.m
//  CloudCa
//
//  Created by DucVT on 05/03/2023.
//  Copyright © 2023 Facebook. All rights reserved.
//
#import <React/RCTBridgeModule.h>
//#import <GoSignSDK.h>
#import <GoSignSDK/GoSignSDK-Swift.h>
@interface RCT_EXTERN_MODULE(CloudCa, NSObject)

RCT_EXTERN_METHOD(sdkSetup:(NSString)baseUrl
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
/// 4.1 AuthenticateClient
RCT_EXTERN_METHOD(authenticateClient:(NSString)clientId
                  withClientSecret: (NSString)clientSecret
                  withGrantType: (NSString)grantType
                  withResolver: (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
/// 4.2 AuthenticateUser
RCT_EXTERN_METHOD(authenticateUser:(NSString)userId
                  withResolver: (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
/// 4.3 Verify OTP
RCT_EXTERN_METHOD(verifyOTP:(NSString)userId
                  withOtpSms: (NSString)otpSms
                  withOtpMail: (NSString)otpMail
                  withResolver: (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
/// 4.4 Renew Access Token
RCT_EXTERN_METHOD(renewAccessToken:(NSString)refreshToken
                  withResolver: (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
/// 4.5 DeviceRegistration
RCT_EXTERN_METHOD(registerDevice: (NSString)localizedReason
                  withResolver: (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
/// 4.6 List Registered Devices
RCT_EXTERN_METHOD(listRegisteredDevices:(NSString)userId
                  withResolver: (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
/// 4.7 Delete Device
RCT_EXTERN_METHOD(deleteDevice:(NSString)deviceId
                  withResolver: (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
/// 4.8 Get Pending Authorisation Request
RCT_EXTERN_METHOD(getPendingAuthorisationRequest: (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
/// 4.9 Authorise a Pending Request
RCT_EXTERN_METHOD(authorisationPendingRequest: (NSString)localizedReason
                  withTransactionID: (NSString)transactionID
                  withRequest: (NSString)request
                  withHashAlgorithm: (NSString)hashAlgorithm
                  withResolver: (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
/// 4.10 Cancel a Pending Authorisation Request
RCT_EXTERN_METHOD(cancelPendingRequest: (NSString)transactionID
                  withRequest: (NSString)request
                  withHashAlgorithm: (NSString)hashAlgorithm
                  withResolver: (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
/// 4.11 Users Profile
RCT_EXTERN_METHOD(getUserProfile: (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
/// 4.12 Get Device Registration Settings
RCT_EXTERN_METHOD(getDeviceRegistrationSettings: (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
/// 4.13 Generate QR Code
RCT_EXTERN_METHOD(generateQRCode:(NSString)clientId
                  withUserId: (NSString)userId
                  withResolver: (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
/// 4.14 Verify QR Code
RCT_EXTERN_METHOD(verifyQRCode:(NSString)userId
                  withQrCode: (NSString)qrCode
                  withResolver: (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
/// 4.15 Register Device for Push Notification
RCT_EXTERN_METHOD(registerDeviceForPushNotification:(NSString)deviceToken
                  withResolver: (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
/// 4.16 Delete Device for Push Notification
RCT_EXTERN_METHOD(deleteDeviceForPushNotification:(NSString)deviceToken
                  withResolver: (RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
