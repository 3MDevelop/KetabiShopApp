import { useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';

export const useResponsive = () => {
  const getWidth = () => {
    if (Platform.OS === 'web') {
      return typeof window !== 'undefined' ? window.innerWidth : 1024;
    }
    return Dimensions.get('window').width;
  };

  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    const handleResize = () => {
      if (Platform.OS === 'web') {
        setWidth(window.innerWidth);
      } else {
        setWidth(Dimensions.get('window').width);
      }
    };

    if (Platform.OS === 'web') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    } else {
      const subscription = Dimensions.addEventListener('change', ({ window }) => {
        setWidth(window.width);
      });
      return () => subscription?.remove();
    }
  }, []);

  const isWeb = Platform.OS === 'web';
  const isDesktop = width >= 768;  
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  return {
    isMobile,
    isTablet,
    isDesktop,
    isWeb,
    width,
  };
};