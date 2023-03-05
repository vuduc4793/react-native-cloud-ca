//
//  CloudCa.m
//  CloudCa
//
//  Created by DucVT on 05/03/2023.
//  Copyright © 2023 Facebook. All rights reserved.
//
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CloudCa, NSObject)

RCT_EXTERN_METHOD(multiply:(float)a withB:(float)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(sdkSetup:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
