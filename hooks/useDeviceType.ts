import { useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const useDeviceType = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>('mobile');

  useEffect(() => {
    const checkDeviceType = () => {
      const { width } = Dimensions.get('window');
      
      // تشخیص بر اساس عرض صفحه
      if (Platform.OS === 'web') {
        // در وب (دسکتاپ یا تبلت)
        if (width >= 1024) {
          setDeviceType('desktop');
        } else if (width >= 768) {
          setDeviceType('tablet');
        } else {
          setDeviceType('mobile');
        }
      } else {
        // در موبایل (React Native واقعی)
        if (width >= 768) {
          setDeviceType('tablet');
        } else {
          setDeviceType('mobile');
        }
      }
    };

    // چک کردن اولیه
    checkDeviceType();

    // گوش دادن به تغییرات اندازه صفحه (مخصوص وب)
    const subscription = Dimensions.addEventListener('change', checkDeviceType);
    
    return () => {
      subscription?.remove();
    };
  }, []);

  return deviceType;
};