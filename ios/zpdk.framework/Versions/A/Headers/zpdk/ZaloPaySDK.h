//
//  ZaloPaySDK.h
//  zpdk
//
//  Created by bonnpv on 11/30/16.
//  Copyright © 2016 VNG. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import "ZaloPaySDKDelegate.h"

@interface ZaloPaySDK : NSObject

@property (nonatomic, weak) id<ZaloPaySDKDelegate>delegate;

+ (instancetype)sharedInstance;

- (void)initWithAppId:(NSInteger)appId;

- (void)payOrder:(NSString *)zptranstoken;

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation;

- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options;

- (void)navigateToStore;

@end
