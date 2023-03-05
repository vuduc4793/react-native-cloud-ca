//
//  CloudCa.swift
//  CloudCa
//
//  Created by DucVT on 05/03/2023.
//  Copyright © 2023 Facebook. All rights reserved.
//
import Foundation

@objc(CloudCa)
class CloudCa: NSObject {
    
    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(a*b)
    }
    
    @objc(sdkSetup:withRejecter:)
    func sdkSetup(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve("done")
        
//        let request = ClientAuthenticateAPIReqest()
//        API.authenticateClient(request) { response in
        // handle response if needed
        // response: Result<AuthenticateClientAPIResponse, Error>
//        }
    }
}
