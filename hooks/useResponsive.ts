import { useEffect, useState } from 'react';
import { Dimensions, Platform, ScaledSize } from 'react-native';

type DeviceInfo = {
  type: 'mobile' | 'tablet' | 'desktop';
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWeb: boolean;
  isNative: boolean;
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape';
  isPortrait: boolean;
  isLandscape: boolean;
};

export const useResponsive = (): DeviceInfo => {
  const [dimensions, setDimensions] = useState<ScaledSize>(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    
    return () => {
      subscription?.remove();
    };
  }, []);

  const { width, height } = dimensions;
  const isWeb = Platform.OS === 'web';
  const isNative = !isWeb;
  
  // تشخیص نوع دستگاه
  let type: 'mobile' | 'tablet' | 'desktop' = 'mobile';
  
  if (isWeb) {
    if (width >= 1024) {
      type = 'desktop';
    } else if (width >= 768) {
      type = 'tablet';
    } else {
      type = 'mobile';
    }
  } else {
    if (width >= 768) {
      type = 'tablet';
    } else {
      type = 'mobile';
    }
  }

  const orientation = width > height ? 'landscape' : 'portrait';

  return {
    type,
    isMobile: type === 'mobile',
    isTablet: type === 'tablet',
    isDesktop: type === 'desktop',
    isWeb,
    isNative,
    width,
    height,
    orientation,
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape',
  };
};