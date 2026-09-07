import AsyncStorage from "@react-native-async-storage/async-storage";
import { toEnglishDigits } from "@/utils/money";

const REMINDERS_KEY = "@stock_reminders";
const PENDING_KEY = "@pending_stock_reminder";

const isZeroPrice = (price: unknown): boolean => {
  if (price === 0) {
    return true;
  }
  if (typeof price !== "string" || !price.trim()) {
    return false;
  }
  const digits = toEnglishDigits(price).replace(/[^\d.-]/g, "");
  return digits !== "" && Number(digits) === 0;
};

export const isBookOutOfStock = (exist?: unknown, price?: unknown): boolean => {
  const existValue = exist == null ? "" : String(exist).trim();
  if (existValue === "-1") {
    return true;
  }
  if (existValue !== "") {
    return false;
  }
  return isZeroPrice(price);
};

const readReminders = async (): Promise<string[]> => {
  try {
    const data = await AsyncStorage.getItem(REMINDERS_KEY);
    const parsed = data ? JSON.parse(data) : [];
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
};

export const addStockReminder = async (bookId: string): Promise<void> => {
  const id = String(bookId);
  if (!id) {
    return;
  }
  const reminders = await readReminders();
  if (!reminders.includes(id)) {
    reminders.push(id);
    await AsyncStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
  }
};

export const setPendingStockReminder = async (bookId: string): Promise<void> => {
  await AsyncStorage.setItem(PENDING_KEY, String(bookId));
};

export const getPendingStockReminder = async (): Promise<string | null> => {
  try {
    return (await AsyncStorage.getItem(PENDING_KEY)) || null;
  } catch {
    return null;
  }
};

export const clearPendingStockReminder = async (): Promise<void> => {
  await AsyncStorage.removeItem(PENDING_KEY);
};
