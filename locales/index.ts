// locales/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fa from './fa.json';
import en from './en.json';

const resources = {
  fa: { translation: fa },
  en: { translation: en },
};

const defaultLanguage = 'fa';

const getStoredLanguage = async () => {
  try {
    const lang = await AsyncStorage.getItem('app_language');
    return lang || defaultLanguage;
  } catch {
    return defaultLanguage;
  }
};

export const initI18n = async () => {
  const storedLanguage = await getStoredLanguage();
  
  // eslint-disable-next-line import/no-named-as-default-member
  i18n.use(initReactI18next).init({
    resources,
    lng: storedLanguage,
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false,
    },
  });
};

export default i18n;