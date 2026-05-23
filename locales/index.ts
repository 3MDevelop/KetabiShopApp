// locales/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fa from './fa.json';
import en from './en.json';
import ar from './ar.json'; // ✅ اضافه شد

const resources = {
  fa: { translation: fa },
  en: { translation: en },
  ar: { translation: ar }, // ✅ اضافه شد
};

export type SupportedLanguage = 'fa' | 'en' | 'ar'; // ✅ اضافه شد

const defaultLanguage: SupportedLanguage = 'fa';

const getStoredLanguage = async (): Promise<SupportedLanguage> => {
  try {
    const storedLang = await AsyncStorage.getItem('app_language');
    
    if (storedLang === 'fa' || storedLang === 'en' || storedLang === 'ar') { // ✅ اضافه شد
      return storedLang;
    }
    
    return defaultLanguage;
  } catch {
    return defaultLanguage;
  }
};

export const initI18n = async () => {
  const storedLanguage = await getStoredLanguage();
  
  // eslint-disable-next-line import/no-named-as-default-member
  await i18n.use(initReactI18next).init({
    resources,
    lng: storedLanguage,
    fallbackLng: 'fa',
    interpolation: {
      escapeValue: false,
    },
  });
};

export const changeLanguage = async (langCode: SupportedLanguage) => {
  // eslint-disable-next-line import/no-named-as-default-member
  await i18n.changeLanguage(langCode);
  await AsyncStorage.setItem('app_language', langCode);
};

export const getAvailableLanguages = async (): Promise<{ code: SupportedLanguage; name: string }[]> => {
  return [
    { code: 'fa', name: 'فارسی' },
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' }, // ✅ اضافه شد
  ];
};

export default i18n;