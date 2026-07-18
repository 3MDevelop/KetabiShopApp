// utils/favorites.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ export کردن interface
export interface FavoriteItem {
  id: string;
  book_title: string;
  full_icon_address: string;
  price: number;
  discount: number;
  percent: number;
}

const FAVORITES_KEY = '@favorites';

// دریافت لیست علاقه‌مندی‌ها
export const getFavorites = async (): Promise<FavoriteItem[]> => {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

// بررسی اینکه کتاب در لیست علاقه‌مندی‌ها هست یا نه
export const isFavorite = async (bookId: string): Promise<boolean> => {
  const favorites = await getFavorites();
  return favorites.some(item => item.id === bookId);
};

// اضافه کردن کتاب به لیست علاقه‌مندی‌ها
export const addToFavorites = async (book: FavoriteItem): Promise<void> => {
  try {
    const favorites = await getFavorites();
    if (!favorites.some(item => item.id === book.id)) {
      favorites.push(book);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

// حذف کتاب از لیست علاقه‌مندی‌ها
export const removeFromFavorites = async (bookId: string): Promise<void> => {
  try {
    const favorites = await getFavorites();
    const updatedFavorites = favorites.filter(item => item.id !== bookId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing from favorites:', error);
  }
};

// تغییر وضعیت علاقه‌مندی
export const toggleFavorite = async (book: FavoriteItem): Promise<boolean> => {
  const isFav = await isFavorite(book.id);
  if (isFav) {
    await removeFromFavorites(book.id);
    return false;
  } else {
    await addToFavorites(book);
    return true;
  }
};