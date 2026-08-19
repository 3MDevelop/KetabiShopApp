// utils/favorites.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface BasketItem {
  id: string;
}

const BASKET_KEY = '@basket';

export const getBaskets = async (): Promise<BasketItem[]> => {
  try {
    const data = await AsyncStorage.getItem(BASKET_KEY);
    console.info(JSON.parse(data as any).length)
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting basket:', error);
    return [];
  }
};

export const isBasket = async (bookId: string): Promise<boolean> => {
  const basket = await getBaskets();
  return basket.some(item => item.id === bookId);
};

export const addToBaskets = async (book: BasketItem): Promise<void> => {
  try {
    const basket = await getBaskets();
    if (!basket.some(item => item.id === book.id)) {
      basket.push(book);
      await AsyncStorage.setItem(BASKET_KEY, JSON.stringify(basket));
    }
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

// حذف کتاب از لیست علاقه‌مندی‌ها
export const removeFromBaskets = async (bookId: string): Promise<void> => {
  try {
    const favorites = await getBaskets();
    const updatedFavorites = favorites.filter(item => item.id !== bookId);
    await AsyncStorage.setItem(BASKET_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing from favorites:', error);
  }
};

// تغییر وضعیت علاقه‌مندی
export const toggleBasket = async (book: BasketItem): Promise<boolean> => {
  const isBas = await isBasket(book.id);
  if (isBas) {
    await removeFromBaskets(book.id);
    return false;
  } else {
    await addToBaskets(book);
    return true;
  }
};