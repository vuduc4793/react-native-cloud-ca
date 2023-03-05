import { NativeModules, Platform } from 'react-native';
import type { AuthenticateClientParams } from './types';

const LINKING_ERROR =
  `The package 'react-native-cloud-ca' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const CloudCa = NativeModules.CloudCa
  ? NativeModules.CloudCa
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return CloudCa.multiply(a, b);
}

export function sdkSetup(): Promise<string> {
  return CloudCa.sdkSetup();
}

export function authenticateClient(
  params: AuthenticateClientParams
): Promise<number> {
  const { clientId, clientSecret, grantType } = params;
  return CloudCa.authenticateClient(clientId, clientSecret, grantType);
}
