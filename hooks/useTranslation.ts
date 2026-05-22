// hooks/useTranslation.ts
import { useTranslation } from 'react-i18next';

export const useTranslate = () => {
  const { t, i18n } = useTranslation();
  
  return {
    t,           // تابع ترجمه
    language: i18n.language,
    changeLanguage: i18n.changeLanguage,
  };
};