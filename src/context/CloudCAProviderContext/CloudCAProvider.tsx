/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
import React, { ReactNode } from 'react';
import type { ImageSourcePropType, ImageProps } from 'react-native';
import { CloudCAProviderContext } from './CloudCAProviderContext';

interface Props {
  children?: ReactNode;
  themeColor?: string;
  headerTheme?: HeaderCustomize;
}

interface HeaderCustomize {
  overlayColor?: string;
  imageSource?: ImageSourcePropType;
  backgroundImageProps?: ImageProps;
}

const CloudCAProvider = (props: Props) => {
  const { children, themeColor, headerTheme } = props;
  return (
    <CloudCAProviderContext.Provider
      value={{
        themeColor: themeColor || '#EE0033',
        headerTheme: headerTheme,
      }}
    >
      {children}
    </CloudCAProviderContext.Provider>
  );
};

export default CloudCAProvider;
