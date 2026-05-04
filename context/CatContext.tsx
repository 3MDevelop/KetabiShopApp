import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ActivityIndicator, View } from 'react-native';

// تعریف type صحیح برای داده‌های catList
interface Genre {
  id: number;
  name: string;
  label: string;
}

interface CatListData {
  book_genres: Genre[];
}

interface CatContextType {
  catList: CatListData | null;
  isLoading: boolean;
  error: string | null;
}

const CatContext = createContext<CatContextType | undefined>(undefined);

export const useCat = () => {
  const context = useContext(CatContext);
  if (!context) {
    throw new Error('useCat must be used within a CatProvider');
  }
  return context;
};

interface CatProviderProps {
  children: ReactNode;
}

export const CatProvider: React.FC<CatProviderProps> = ({ children }) => {
  const [catList, setCatList] = useState<CatListData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCatList = async () => {
      try {
        // در React Native، فایل JSON را می‌توان مستقیماً import کرد
        const data = require('@/assets/data/catList.json');
        setCatList(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading cat list');
        console.error('Error loading catList.json:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCatList();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <CatContext.Provider value={{ catList, isLoading, error }}>
      {children}
    </CatContext.Provider>
  );
};