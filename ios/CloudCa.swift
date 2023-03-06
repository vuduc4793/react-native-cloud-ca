//
//  CloudCa.swift
//  CloudCa
//
//  Created by DucVT on 05/03/2023.
//  Copyright © 2023 Facebook. All rights reserved.
//
import Foundation
import GoSignSDK

@objc(CloudCa)
class CloudCa: NSObject {
    
    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(a*b)
    }
    
    @objc(sdkSetup:withRejecter:)
    func sdkSetup(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
    }
    
    /// 4.1 AuthenticateClient
    @objc(authenticateClient:withClientSecret:withGrantType:withResolver:withRejecter:)
    func authenticateClient(clientId: String, clientSecret: String, grantType: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let request = ClientAuthenticateAPIReqest(clientId: clientId, clientSecret: clientSecret, grantType: grantType)
        API.authenticateClient(request) { response in
            // response: Result<AuthenticateClientAPIResponse, Error>
//            resolve(response)
        }
    }
    
    /// 4.2 AuthenticateUser
    @objc(authenticateUser:withResolver:withRejecter:)
    func authenticateUser(userId: String,resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        API.authenticateUser(userId, completion: { response in
            // response: Result<AuthenticateUserAPIResponse, Error>
//            resolve(response)
        })
    }
    
    /// 4.3 Verify OTP
    @objc(verifyOTP:withOtpSms:withOtpMail:withResolver:withRejecter:)
    func verifyOTP(userId: String,
                   otpSms: String,
                   otpMail: String,
                   resolve:RCTPromiseResolveBlock,
                   reject:RCTPromiseRejectBlock) -> Void {
        let otpInfo = [OtpInfo(otp: otpSms, otpType: OTPType.sms), OtpInfo(otp: otpMail, otpType: OTPType.mail)]
        let request = VerifyOTPAPIRequest(userID: userId, otpInfo: otpInfo)
        API.verifyOTP(request) { response in
            // handle response if needed
            // response: Result<TokenInfo, Error>
        }
    }
    
    /// 4.4 Renew Access Token
    @objc(renewAccessToken:withResolver:withRejecter:)
    func renewAccessToken(refreshToken: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        API.renewAccessToken(refreshToken) { response in
            // handle response if needed
            // response: Result<TokenInfo, Error>
        }
    }
    
    /// 4.5 DeviceRegistration
    @objc(registerDevice:withRejecter:)
    func registerDevice(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        API.registerDevice { response in
            // handle response if needed
            // response: Result<RegisterDeviceAPIResponse, Error>
        }
    }
    
    /// 4.6 List Registered Devices
    @objc(listRegisteredDevices:withResolver:withRejecter:)
    func listRegisteredDevices(userId: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        API.listRegisteredDevices(userId) { response in
            // handle response if needed
            // response: Result<[DeviceInfo], Error>
        }
    }
    
    /// 4.7 Delete Device
    @objc(deleteDevice:withResolver:withRejecter:)
    func deleteDevice(deviceId: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        API.deleteDevice(deviceId) { response in
            // handle response if needed
            // response: Result<Void, Error>
        }
    }
    
    /// 4.8 Get Pending Authorisation Request
    @objc(getPendingAuthorisationRequest:withRejecter:)
    func getPendingAuthorisationRequest(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        API.getPendingAuthorisationRequest { response in
            // handle response if needed
            // response: Result<PendingAuthorisationAPIResponse, Error>
        }
    }
    
    /// 4.9 Authorise a Pending Request
    @objc(authoriseaPendingRequest:withRejecter:)
    func authoriseaPendingRequest(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        //        let request = PendingAuthorisationAPIResponse(from: "" as! Decoder)
        //        API.authoriseaPendingRequest(request) { response in
        // handle response if needed
        // response: Result<AnyCodable, Error>
        //        }
    }
    
    /// 4.10 Cancel a Pending Authorisation Request
    @objc(cancelPendingRequest:withRejecter:)
    func cancelPendingRequest(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        //        let request = PendingAuthorisationAPIResponse(from: "" as! Decoder)
        //        API.cancelPendingRequest(request) { response in
        // handle response if needed
        // response: Result<Void, Error>
        //        }
    }
    
    /// 4.11 Users Profile
    @objc(getUserProfile:withRejecter:)
    func getUserProfile(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        API.getUserProfile { response in
            // handle response if needed
            // response: Result<UserProfileAPIResponse, Error>
        }
    }
    
    /// 4.12 Get Device Registration Settings
    @objc(getDeviceRegistrationSettings:withRejecter:)
    func getDeviceRegistrationSettings(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        API.getDeviceRegistrationSettings { response in
            // handle response if needed
            // response: Result<DeviceRegistrationSettings, Error>
        }
    }
    
    /// 4.13 Generate QR Code
    @objc(generateQRCode:withUserId:withResolver:withRejecter:)
    func generateQRCode(clientId: String, userId: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let request: GenerateQRCodeAPIRequest = .init(clientID: clientId, userID: userId)
        API.generateQRCode(request) { response in
            // handle response if needed
            // response: Result<GenerateQRCodeAPIResponse, Error>
        }
    }
    
    /// 4.14 Verify QR Code
    @objc(verifyQRCode:withQrCode:withResolver:withRejecter:)
    func verifyQRCode(userId: String, qrCode: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let request: VerifyQRCodeAPIRequest = .init(userID: userId, qrCode: qrCode)
        API.verifyQRCode(request) { response in
            // handle response if needed
            // response: Result<TokenInfo, Error>
        }
    }
    
    /// 4.15 Register Device for Push Notification
    @objc(registerDeviceForPushNotification:withResolver:withRejecter:)
    func registerDeviceForPushNotification(deviceToken: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let request: DevicePushNotificationAPIRequest = .init(deviceToken: deviceToken)
        API.registerDeviceForPushNotification(request) { response in
            // handle response if needed
            // response: Result<Void, Error>
        }
    }
    
    /// 4.16 Delete Device for Push Notification
    @objc(deleteDeviceForPushNotification:withResolver:withRejecter:)
    func deleteDeviceForPushNotification(deviceToken: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let request: DeleteDeviceForNotificationAPIRequest = .init(deviceToken: deviceToken)
        API.deleteDeviceForPushNotification(request) { response in
            // handle response if needed
            // response: Result<Void, Error>
        }
    }
}
