import { useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const useDeviceType = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>('mobile');

  useEffect(() => {
    const checkDeviceType = () => {
      const { width } = Dimensions.get('window');
      
      if (Platform.OS === 'web') {
        if (width >= 1024) {
          setDeviceType('desktop');
        } else if (width >= 768) {
          setDeviceType('tablet');
        } else {
          setDeviceType('mobile');
        }
      } else {
        if (width >= 768) {
          setDeviceType('tablet');
        } else {
          setDeviceType('mobile');
        }
      }
    };

    checkDeviceType();

    const subscription = Dimensions.addEventListener('change', checkDeviceType);
    
    return () => {
      subscription?.remove();
    };
  }, []);

  return deviceType;
};