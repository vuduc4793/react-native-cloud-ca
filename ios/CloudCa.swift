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
    let EVENT_SUCCEEDED: String = "Succeeded"
    let EVENT_ERROR: String = "Create Event Error"
    
    @objc(sdkSetup:withResolver:withRejecter:)
    func sdkSetup(baseUrl: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        API.host = baseUrl
        resolve(baseUrl)
    }
    
    /// 4.1 AuthenticateClient
    @objc(authenticateClient:withClientSecret:withGrantType:withResolver:withRejecter:)
    func authenticateClient(clientId: String, clientSecret: String, grantType: String, resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock) -> Void {
        
        let request = ClientAuthenticateAPIReqest(clientId: clientId, clientSecret: clientSecret, grantType: grantType)
        API.authenticateClient(request) { response in
            switch response {
            case .success(let success):
                let result: [String: Any] = ["access_token": success.accessToken,
                                             "refresh_token": "",
                                             "token_type": "",
                                             "expires_in": success.expiresIn]
                resolve(result)
            case .failure(let failure):
                reject("API_01_Failed",failure.localizedDescription, failure.asAFError)
                break
                
            }
        }
    }
    
    /// 4.2 AuthenticateUser
    @objc(authenticateUser:withResolver:withRejecter:)
    func authenticateUser(userId: String,resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock) -> Void {
        API.authenticateUser(userId, completion: { response in
            switch response {
            case .success(let success):
                let tokenInfo: [String: Any] = ["access_token": success.tokenInfo?.accessToken ?? "",
                                                "refresh_token": success.tokenInfo?.refreshToken ?? "",
                                                "token_type": success.tokenInfo?.tokenType ?? "",
                                                "expires_in": success.tokenInfo?.expiresIn ?? ""]
                let result: [String: Any] = ["auth_type": success.authType ?? "",
                                             "token_info": tokenInfo]
                resolve(result)
            case .failure(let failure):
                reject("API_02_Failed",failure.localizedDescription, failure.asAFError)
                break
                
            }
        })
    }
    
    /// 4.3 Verify OTP
    @objc(verifyOTP:withOtpMail:withResolver:withRejecter:)
    func verifyOTP(otpSms: String,
                   otpMail: String,
                   resolve: @escaping RCTPromiseResolveBlock,
                   reject: @escaping RCTPromiseRejectBlock) -> Void {
        var otpInfos: [OtpInfo] = []
        
        if !otpSms.isEmpty {
            otpInfos.append(OtpInfo(otp: otpSms, otpType: .sms))
        }
        
        if !otpMail.isEmpty {
            otpInfos.append(OtpInfo(otp: otpMail, otpType: .mail))
        }
        
        let request = VerifyOTPAPIRequest(otpInfo: otpInfos)
        API.verifyOTP(request) { response in
            switch response {
            case .success(let success):
                let result: [String: Any] = ["access_token": success.accessToken ?? "",
                                             "refresh_token": success.refreshToken ?? "",
                                             "token_type": success.tokenType ?? "",
                                             "expires_in": success.expiresIn ?? 0]
                resolve(result)
            case .failure(let failure):
                reject("API_03_Failed",failure.localizedDescription, failure.asAFError)
                break
                
            }
        }
    }
    
    /// 4.4 Renew Access Token
    @objc(renewAccessToken:withResolver:withRejecter:)
    func renewAccessToken(refreshToken: String?,
                          resolve: @escaping RCTPromiseResolveBlock,
                          reject: @escaping RCTPromiseRejectBlock) -> Void {
        API.renewAccessToken(refreshToken) { response in
            switch response {
            case .success(let success):
                let result: [String: Any] = ["access_token": success.accessToken ?? "",
                                             "refresh_token": success.refreshToken ?? "",
                                             "token_type": success.tokenType ?? "",
                                             "expires_in": success.expiresIn ?? 0]
                resolve(result)
            case .failure(let failure):
                reject("API_04_Failed",failure.localizedDescription, failure.asAFError)
                break
                
            }
        }
    }
    
    /// 4.5 DeviceRegistration
    @objc(registerDevice:withResolver:withRejecter:)
    func registerDevice(localizedReason: String = "Unlock to add device", resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock) -> Void {
        API.registerDevice(localizedReason: localizedReason) { response in
            switch response {
            case .success(let success):
                let result: [String: Any] = ["alias": success.alias ?? "",
                                             "certificate": success.certificate ?? ""]
                
                resolve(result)
            case .failure(let failure):
                reject("API_05_Failed",failure.localizedDescription, failure.asAFError)
                break
                
            }
        }
    }
    
    /// 4.6 List Registered Devices
    @objc(listRegisteredDevices:withRejecter:)
    func listRegisteredDevices(
                               resolve: @escaping RCTPromiseResolveBlock,
                               reject: @escaping RCTPromiseRejectBlock) -> Void {
                                   
        API.listRegisteredDevices { response in
            switch response {
            case .success(let success):
                var listDevices: [[String: Any]] = []
                success.forEach { element in
                    let device = ["device_id": element.deviceID,
                                  "device_name": element.deviceName,
                                  "secure_element": element.secureElement,
                                  "biometric": element.biometric]
                    listDevices.append(device)
                }
                
                resolve(listDevices)
            case .failure(let failure):
                reject("API_06_Failed",failure.localizedDescription, failure.asAFError)
                break
                
            }
        }
    }
    
    /// 4.7 Delete Device
    @objc(deleteDevice:withResolver:withRejecter:)
    func deleteDevice(deviceId: String,
                      resolve: @escaping RCTPromiseResolveBlock,
                      reject: @escaping RCTPromiseRejectBlock) -> Void {
        API.deleteDevice(deviceId) { response in
            switch response {
            case .success(_):
                resolve(["result": self.EVENT_SUCCEEDED])
            case .failure(let failure):
                reject("API_07_Failed",failure.localizedDescription, failure.asAFError)
                break
                
            }
        }
    }
    
    /// 4.8 Get Pending Authorisation Request
    @objc(getPendingAuthorisationRequest:withRejecter:)
    func getPendingAuthorisationRequest(resolve: @escaping RCTPromiseResolveBlock,
                                        reject:  @escaping RCTPromiseRejectBlock) -> Void {
        API.getPendingAuthorisationRequest { response in
            switch response {
            case .success(let success):
                let result: [String: Any] = ["transaction_id": success.transactionID,
                                             "request": success.request,
                                             "hash_algorithm": success.hashAlgorithm]
                resolve(result)
            case .failure(let failure):
                reject("API_08_Failed",failure.localizedDescription, failure.asAFError)
                break
                
            }
        }
    }
    
    /// 4.9 Authorise a Pending Request
    @objc(authorisationPendingRequest:withTransactionID:withRequest:withHashAlgorithm:withResolver:withRejecter:)
    func authorisationPendingRequest(localizedReason: String = "Unlock to add device",
                                     transactionID: String,
                                     request: String,
                                     hashAlgorithm: String,
                                     resolve: @escaping RCTPromiseResolveBlock,
                                     reject: @escaping RCTPromiseRejectBlock) -> Void {
        let requestParams: PendingAuthorisationAPIResponse = .init(transactionID: transactionID,
                                                                   request: request,
                                                                   hashAlgorithm: hashAlgorithm)
        API.authoriseaPendingRequest(localizedReason: localizedReason, pendingAuthorisationAPIResponse: requestParams) { response in
            switch response {
            case .success(_):
                resolve(["result": self.EVENT_SUCCEEDED])
            case .failure(let failure):
                reject("API_09_Failed",failure.localizedDescription, failure.asAFError)
                break
                
            }
        }
    }
    
    /// 4.10 Cancel a Pending Authorisation Request
    @objc(cancelPendingRequest:withRequest:withHashAlgorithm:withResolver:withRejecter:)
    func cancelPendingRequest( transactionID: String,
                               request: String,
                               hashAlgorithm: String,
                               resolve: @escaping RCTPromiseResolveBlock,
                               reject: @escaping RCTPromiseRejectBlock) -> Void {
        let request = PendingAuthorisationAPIResponse(transactionID: transactionID, request: request, hashAlgorithm: hashAlgorithm)
        API.cancelPendingRequest(request) { response in
            switch response {
            case .success(_):
                resolve(["result": self.EVENT_SUCCEEDED])
            case .failure(let failure):
                reject("API_10_Failed",failure.localizedDescription, failure.asAFError)
                break
                
            }
        }
    }
    
    /// 4.11 Users Profile
    @objc(getUserProfile:withRejecter:)
    func getUserProfile(resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock) -> Void {
        API.getUserProfile { response in
            switch response {
            case .success(let success):
                let result: [String: Any] = ["user_id": success.userID ?? "",
                                             "user_name": success.userName ?? "",
                                             "app_name": success.appName ?? "",
                                             "user_email": success.userEmail ?? "",
                                             "user_mobile": success.userMobile ?? ""]
                resolve(result)
            case .failure(let failure):
                reject("API_11_Failed",failure.localizedDescription, failure.asAFError)
                break
                
            }
        }
    }
    
    /// 4.12 Get Device Registration Settings
    @objc(getDeviceRegistrationSettings:withRejecter:)
    func getDeviceRegistrationSettings(resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock) -> Void {
        API.getDeviceRegistrationSettings { response in
            switch response {
            case .success(let success):
                let result: [String: Any] = ["device_key_type": success.deviceKeyType ?? "",
                                             "device_key_size": success.deviceKeySize ?? "",
                                             "secure_element_required": success.secureElementRequired ?? "",
                                             "biometric_required": success.biometricRequired ?? "",
                                             "allowed_devices": success.allowedDevices ?? "",
                                             "clock_tolerance_on_auth_cert": success.clockToleranceOnAuthCERT ?? ""]
                resolve(result)
            case .failure(let failure):
                reject("API_12_Failed",failure.localizedDescription, failure.asAFError)
                break
                
            }
        }
    }
    
    /// 4.13 Generate QR Code
    @objc(generateQRCode:withResolver:withRejecter:)
    func generateQRCode(clientId: String,
                        resolve: @escaping RCTPromiseResolveBlock,
                        reject: @escaping RCTPromiseRejectBlock) -> Void {
        let request: GenerateQRCodeAPIRequest = .init(clientID: clientId)
        API.generateQRCode(request) { response in
            switch response {
            case .success(let success):
                let result: [String: Any] = ["size": success.size ?? "",
                                             "qr_code": success.qrCode ?? "",
                                             "format": success.format ?? ""]
                resolve(result)
            case .failure(let failure):
                reject("API_13_Failed",failure.localizedDescription, failure.asAFError)
                break
            }
        }
    }
    
    /// 4.14 Verify QR Code
    @objc(verifyQRCode:withResolver:withRejecter:)
    func verifyQRCode(qrCode: String,
                      resolve: @escaping RCTPromiseResolveBlock,
                      reject: @escaping RCTPromiseRejectBlock) -> Void {
        let request: VerifyQRCodeAPIRequest = .init(qrCode: qrCode)
        API.verifyQRCode(request) { response in
            switch response {
            case .success(let success):
                let result: [String: Any] = ["access_token": success.accessToken ?? "",
                                             "refresh_token": success.refreshToken ?? "",
                                             "token_type": success.tokenType ?? "",
                                             "expires_in": success.expiresIn ?? 0]
                resolve(result)
            case .failure(let failure):
                reject("API_14_Failed",failure.localizedDescription, failure.asAFError)
                break
                
            }
        }
    }
    
    /// 4.15 Register Device for Push Notification
    @objc(registerDeviceForPushNotification:withResolver:withRejecter:)
    func registerDeviceForPushNotification(deviceToken: String,
                                           resolve: @escaping RCTPromiseResolveBlock,
                                           reject: @escaping RCTPromiseRejectBlock) -> Void {
        let request: DevicePushNotificationAPIRequest = .init(deviceToken: deviceToken)
        API.registerDeviceForPushNotification(request) { response in
            switch response {
            case .success(_):
                resolve(["result": self.EVENT_SUCCEEDED])
            case .failure(let failure):
                reject("API_15_Failed",failure.localizedDescription, failure.asAFError)
                break
                
            }
        }
    }
    
    /// 4.16 Delete Device for Push Notification
    @objc(deleteDeviceForPushNotification:withResolver:withRejecter:)
    func deleteDeviceForPushNotification(deviceToken: String,
                                         resolve: @escaping RCTPromiseResolveBlock,
                                         reject: @escaping RCTPromiseRejectBlock) -> Void {
        let request: DeleteDeviceForNotificationAPIRequest = .init(deviceToken: deviceToken)
        API.deleteDeviceForPushNotification(request) { response in
            switch response {
            case .success(_):
                resolve(["result": self.EVENT_SUCCEEDED])
            case .failure(let failure):
                reject("API_16_Failed",failure.localizedDescription, failure.asAFError)
                break
                
            }
        }
    }
}
