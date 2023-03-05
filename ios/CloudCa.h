
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNCloudCaSpec.h"

@interface CloudCa : NSObject <NativeCloudCaSpec>
#else
#import <React/RCTBridgeModule.h>

@interface CloudCa : NSObject <RCTBridgeModule>
#endif

@end
