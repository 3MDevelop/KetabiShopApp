// hooks/useFonts.ts
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { useLanguage } from '@/context/LanguageContext';

export const useCustomFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Vazirmatn-Regular': require('@/assets/fonts/Vazirmatn-Regular.ttf'),
          'Vazirmatn-Bold': require('@/assets/fonts/Vazirmatn-Bold.ttf'),
          'Inter-Regular': require('@/assets/fonts/Inter-Regular.ttf'),
          'Inter-Bold': require('@/assets/fonts/Inter-Bold.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        setFontsLoaded(true);
      }
    }
    loadFonts();
  }, []);

  return { fontsLoaded };
};

export const useFontFamily = () => {
  const { language } = useLanguage();
  
  const getFontFamily = (weight: 'normal' | 'bold' = 'normal') => {
    if (language === 'fa') {
      return weight === 'bold' ? 'Vazirmatn-Bold' : 'Vazirmatn-Regular';
    } else {
      return weight === 'bold' ? 'Inter-Bold' : 'Inter-Regular';
    }
  };
  
  return { getFontFamily };
};