import React from 'react';
import type { ImageSourcePropType, ImageProps } from 'react-native';
interface HeaderCustomize {
  overlayColor?: string;
  imageSource?: ImageSourcePropType;
  backgroundImageProps?: ImageProps;
}

export interface CloudCAProviderContextType {
  themeColor: string;
  headerTheme?: HeaderCustomize;
}

export const CloudCAProviderContext =
  React.createContext<CloudCAProviderContextType>({
    themeColor: '#EE0033',
    headerTheme: { overlayColor: 'rgba(238, 0, 51, 0.9)' },
  });
