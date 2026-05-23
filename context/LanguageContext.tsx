// context/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import i18n, { changeLanguage, getAvailableLanguages, SupportedLanguage } from '@/locales';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => Promise<void>;
  availableLanguages: { code: SupportedLanguage; name: string }[];
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>('fa');
  const [availableLanguages, setAvailableLanguages] = useState<{ code: SupportedLanguage; name: string }[]>([]);

  useEffect(() => {
    loadInitialData();
    
    // گوش دادن به تغییرات زبان
    const handleLanguageChange = (lng: string) => {
      setLanguageState(lng as SupportedLanguage);
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const loadInitialData = async () => {
    const langs = await getAvailableLanguages();
    setAvailableLanguages(langs);
    
    const currentLang = i18n.language as SupportedLanguage;
    if (currentLang) {
      setLanguageState(currentLang);
    }
  };

  const setLanguage = async (lang: SupportedLanguage) => {
    await changeLanguage(lang);
  };

  const isRTL = language === 'fa' || language === 'ar'; 

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        availableLanguages,
        isRTL 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};