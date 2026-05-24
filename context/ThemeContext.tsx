// context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, Theme } from '@/constants/theme';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme);

  const applyTheme = useCallback(async () => {
    let isDarkMode = false;
    
    if (themeMode === 'light') {
      isDarkMode = false;
    } else if (themeMode === 'dark') {
      isDarkMode = true;
    } else {
      // system - بررسی سیستم (برای Web)
      if (typeof window !== 'undefined') {
        isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    }
    
    setCurrentTheme(isDarkMode ? darkTheme : lightTheme);
  }, [themeMode]);

  useEffect(() => {
    loadThemeMode();
  }, []);

  useEffect(() => {
    applyTheme();
  }, [applyTheme]);

  const loadThemeMode = async () => {
    const saved = await AsyncStorage.getItem('app_theme_mode');
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      setThemeModeState(saved);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    await AsyncStorage.setItem('app_theme_mode', mode);
  };

  const isDark = themeMode === 'dark' || (themeMode === 'system' && currentTheme === darkTheme);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, themeMode, setThemeMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};