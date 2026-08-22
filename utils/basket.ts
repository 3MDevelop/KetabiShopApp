import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "@/constants/api";

export type ProductType =
  | "physical_book"
  | "ebook"
  | "audiobook"
  | "podcast"
  | "audio";

export interface BasketEntry {
  id: string;
  quantity: number;
}

export interface BasketProduct extends BasketEntry {
  book_title: string;
  author?: string;
  full_icon_address?: string;
  price: number;
  discount?: number;
  percent?: number;
  maxQuantity: number;
  type: ProductType;
  duration?: string;
  exist: boolean;
}

const BASKET_KEY = "@basket";
const MAX_QUANTITY = 99;

type BasketListener = () => void;
const listeners = new Set<BasketListener>();

export const subscribeBasket = (listener: BasketListener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const notifyBasket = () => {
  listeners.forEach((listener) => listener());
};

export const parseMoney = (value: unknown): number => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string") {
    const n = Number(value.replace(/[^\d.-]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
};

const isProductType = (value: unknown): value is ProductType =>
  value === "physical_book" ||
  value === "ebook" ||
  value === "audiobook" ||
  value === "podcast" ||
  value === "audio";

const normalizeEntry = (raw: unknown): BasketEntry | null => {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const item = raw as Record<string, unknown>;
  const id = item.id != null ? String(item.id) : "";
  if (!id) {
    return null;
  }

  return {
    id,
    quantity: Math.max(1, parseMoney(item.quantity) || 1),
  };
};

const toStoredBasket = (basket: BasketEntry[]) =>
  basket.map((item) => ({
    id: String(item.id),
    quantity: Math.max(1, item.quantity || 1),
  }));

const persistBasket = async (basket: BasketEntry[]) => {
  await AsyncStorage.setItem(BASKET_KEY, JSON.stringify(toStoredBasket(basket)));
  notifyBasket();
};

const isSlimBasket = (parsed: unknown[]) =>
  parsed.every(
    (item) =>
      !!item &&
      typeof item === "object" &&
      Object.keys(item as object).every((key) => key === "id" || key === "quantity"),
  );

export const getBasket = async (): Promise<BasketEntry[]> => {
  try {
    const data = await AsyncStorage.getItem(BASKET_KEY);
    if (!data) {
      return [];
    }

    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) {
      return [];
    }

    const basket = parsed
      .map(normalizeEntry)
      .filter((item): item is BasketEntry => item !== null);

    if (!isSlimBasket(parsed)) {
      await AsyncStorage.setItem(
        BASKET_KEY,
        JSON.stringify(toStoredBasket(basket)),
      );
    }

    return basket;
  } catch (error) {
    console.error("Error getting basket:", error);
    return [];
  }
};

export const getBasketCount = async (): Promise<number> => {
  const basket = await getBasket();
  return basket.length;
};

export const getBasketItem = async (
  bookId: string,
): Promise<BasketEntry | undefined> => {
  const basket = await getBasket();
  return basket.find((item) => item.id === String(bookId));
};

export const isInBasket = async (bookId: string): Promise<boolean> => {
  const item = await getBasketItem(bookId);
  return Boolean(item);
};

export const addToBasket = async (
  bookId: string,
  quantity = 1,
): Promise<BasketEntry[]> => {
  const id = String(bookId || "");
  if (!id) {
    return getBasket();
  }

  try {
    const basket = await getBasket();
    const existing = basket.find((entry) => entry.id === id);

    if (existing) {
      existing.quantity = Math.min(
        MAX_QUANTITY,
        existing.quantity + Math.max(1, quantity),
      );
      await persistBasket(basket);
      return basket;
    }

    basket.push({ id, quantity: Math.max(1, quantity) });
    await persistBasket(basket);
    return basket;
  } catch (error) {
    console.error("Error adding to basket:", error);
    throw error;
  }
};

export const removeFromBasket = async (
  bookId: string,
): Promise<BasketEntry[]> => {
  try {
    const basket = await getBasket();
    const updated = basket.filter((item) => item.id !== String(bookId));
    await persistBasket(updated);
    return updated;
  } catch (error) {
    console.error("Error removing from basket:", error);
    throw error;
  }
};

export const updateBasketQuantity = async (
  bookId: string,
  quantity: number,
): Promise<BasketEntry[]> => {
  if (quantity < 1) {
    return removeFromBasket(bookId);
  }

  try {
    const basket = await getBasket();
    const updated = basket.map((item) =>
      item.id === String(bookId)
        ? { ...item, quantity: Math.min(MAX_QUANTITY, quantity) }
        : item,
    );
    await persistBasket(updated);
    return updated;
  } catch (error) {
    console.error("Error updating basket quantity:", error);
    throw error;
  }
};

export const toggleBasket = async (bookId: string): Promise<boolean> => {
  const alreadyInBasket = await isInBasket(bookId);
  if (alreadyInBasket) {
    await removeFromBasket(bookId);
    return false;
  }
  await addToBasket(bookId);
  return true;
};

export const clearBasket = async (): Promise<void> => {
  await persistBasket([]);
};

const currentPriceFromProduct = (book: Record<string, any>): number => {
  const discounted = parseMoney(book?.discountFa ?? book?.discount);
  if (discounted > 0) {
    return discounted;
  }
  return parseMoney(book?.price);
};

export const productFromApi = (
  book: Record<string, any>,
  quantity: number,
): BasketProduct => {
  const type: ProductType = isProductType(book?.type)
    ? book.type
    : "physical_book";

  return {
    id: String(book?.id ?? ""),
    book_title: String(book?.title ?? book?.book_title ?? ""),
    author: book?.author != null ? String(book.author) : undefined,
    full_icon_address: book?.pic || book?.full_icon_address || undefined,
    price: currentPriceFromProduct(book),
    discount:
      book?.discount != null || book?.discountFa != null
        ? parseMoney(book.discount ?? book.discountFa)
        : undefined,
    percent:
      book?.percent != null || book?.percentFa != null
        ? parseMoney(book.percent ?? book.percentFa)
        : undefined,
    quantity: type === "physical_book" ? Math.max(1, quantity) : 1,
    maxQuantity: type === "physical_book" ? MAX_QUANTITY : 1,
    type,
    duration: book?.duration,
    exist: String(book?.exist ?? "1") === "1",
  };
};

export const fetchProduct = async (
  productId: string,
): Promise<Record<string, any> | null> => {
  try {
    const response = await fetch(API.getProduct, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `productid=${encodeURIComponent(productId)}`,
    });
    const result = await response.json();
    if (result.status === true && result.data) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching product:", productId, error);
    return null;
  }
};

export const getBasketProducts = async (): Promise<BasketProduct[]> => {
  const basket = await getBasket();

  const products = await Promise.all(
    basket.map(async (entry) => {
      const book = await fetchProduct(entry.id);
      if (!book) {
        return {
          id: entry.id,
          quantity: entry.quantity,
          book_title: "",
          price: 0,
          maxQuantity: MAX_QUANTITY,
          type: "physical_book" as const,
          exist: false,
        };
      }

      return productFromApi(
        { ...book, id: book.id ?? entry.id },
        entry.quantity,
      );
    }),
  );

  return products;
};
