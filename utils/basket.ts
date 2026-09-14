import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "@/constants/api";
import { parseMoney, normalizePricePair } from "@/utils/money";
import { isBookOutOfStock } from "@/utils/stock";

export { parseMoney } from "@/utils/money";

export type ProductType =
  | "physical_book"
  | "ebook"
  | "audiobook"
  | "podcast"
  | "audio";

export interface BasketEntry {
  id: string;
  quantity: number;
  code_config: string;
}

export interface BasketProduct extends BasketEntry {
  book_title: string;
  author?: string;
  full_icon_address?: string;
  price: number;
  originalPrice: number;
  discount?: number;
  percent?: number;
  maxQuantity: number;
  type: ProductType;
  duration?: string;
  exist: boolean;
}

const BASKET_KEY = "@basket";
const USER_KEY = "@user";
const MAX_QUANTITY = 99;
const SYNC_DEBOUNCE_MS = 400;

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
    code_config: codeConfigValue(
      item.code_config ?? item.codeConfig,
    ),
  };
};

export const codeConfigValue = (value: unknown) => {
  if (value == null) {
    return "";
  }
  const text = String(value).trim();
  if (!text || text === "null" || text === "undefined") {
    return "";
  }
  return text;
};

export const codeConfigFromBook = (book?: Record<string, any> | null) =>
  codeConfigValue(
    book?.code_config ??
      book?.codeConfig ??
      book?.providers?.[0]?.code_config ??
      book?.providers?.[0]?.codeConfig,
  );

const toStoredBasket = (basket: BasketEntry[]) =>
  basket.map((item) => ({
    id: String(item.id),
    code_config: codeConfigValue(item.code_config),
    quantity: Math.max(1, item.quantity || 1),
  }));

const postForm = async (url: string, body: Record<string, string>) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: Object.entries(body)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join("&"),
  });
  return response.json();
};

const getLoggedInUserID = async (): Promise<string | null> => {
  try {
    const raw = await AsyncStorage.getItem(USER_KEY);
    if (!raw) {
      return null;
    }
    const user = JSON.parse(raw) as { ID?: number | string };
    if (user?.ID == null || String(user.ID) === "") {
      return null;
    }
    return String(user.ID);
  } catch {
    return null;
  }
};

const parseBasketData = (raw: unknown): BasketEntry[] => {
  let list: unknown = raw;
  if (typeof raw === "string") {
    const text = raw.trim();
    if (!text) {
      return [];
    }
    try {
      list = JSON.parse(text);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(list)) {
    return [];
  }
  return list
    .map(normalizeEntry)
    .filter((item): item is BasketEntry => item !== null);
};

let syncTimer: ReturnType<typeof setTimeout> | null = null;
let pendingBasket: BasketEntry[] | null = null;

const cancelBasketSync = () => {
  if (syncTimer) {
    clearTimeout(syncTimer);
    syncTimer = null;
  }
  pendingBasket = null;
};

const pushBasketToServer = async (basket: BasketEntry[]) => {
  const userID = await getLoggedInUserID();
  if (!userID) {
    return;
  }
  try {
    await postForm(API.setUserBasket, {
      userID,
      data: JSON.stringify(toStoredBasket(basket)),
    });
  } catch (error) {
    console.error("Error saving basket to server:", error);
  }
};

const scheduleBasketSync = (basket: BasketEntry[]) => {
  pendingBasket = toStoredBasket(basket);
  if (syncTimer) {
    clearTimeout(syncTimer);
  }
  syncTimer = setTimeout(() => {
    const next = pendingBasket;
    syncTimer = null;
    pendingBasket = null;
    if (next) {
      void pushBasketToServer(next);
    }
  }, SYNC_DEBOUNCE_MS);
};

const persistBasket = async (
  basket: BasketEntry[],
  options?: { syncServer?: boolean },
) => {
  await AsyncStorage.setItem(BASKET_KEY, JSON.stringify(toStoredBasket(basket)));
  notifyBasket();
  if (options?.syncServer === false) {
    return;
  }
  scheduleBasketSync(basket);
};

const isSlimBasket = (parsed: unknown[]) =>
  parsed.every(
    (item) =>
      !!item &&
      typeof item === "object" &&
      Object.keys(item as object).every(
        (key) => key === "id" || key === "quantity" || key === "code_config",
      ),
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
  code_config = "",
): Promise<BasketEntry[]> => {
  const id = String(bookId || "");
  if (!id) {
    return getBasket();
  }

  try {
    const basket = await getBasket();
    const existing = basket.find((entry) => entry.id === id);
    const nextCode = codeConfigValue(code_config);

    if (existing) {
      existing.quantity = Math.min(
        MAX_QUANTITY,
        existing.quantity + Math.max(1, quantity),
      );
      if (!existing.code_config && nextCode) {
        existing.code_config = nextCode;
      }
      await persistBasket(basket);
      return basket;
    }

    basket.push({
      id,
      quantity: Math.max(1, quantity),
      code_config: nextCode,
    });
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

export const removeManyFromBasket = async (
  bookIds: string[],
): Promise<BasketEntry[]> => {
  try {
    const ids = new Set(bookIds.map(String));
    const basket = await getBasket();
    const updated = basket.filter((item) => !ids.has(item.id));
    await persistBasket(updated);
    return updated;
  } catch (error) {
    console.error("Error removing items from basket:", error);
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

export const toggleBasket = async (
  bookId: string,
  code_config = "",
): Promise<boolean> => {
  const alreadyInBasket = await isInBasket(bookId);
  if (alreadyInBasket) {
    await removeFromBasket(bookId);
    return false;
  }
  await addToBasket(bookId, 1, code_config);
  return true;
};

export const clearBasket = async (
  options?: { syncServer?: boolean },
): Promise<void> => {
  if (options?.syncServer === false) {
    cancelBasketSync();
  }
  await persistBasket([], options);
};

export const fetchUserBasketFromServer = async (
  userID?: number | string,
): Promise<BasketEntry[]> => {
  const id = userID != null ? String(userID) : await getLoggedInUserID();
  if (!id) {
    return [];
  }
  const result = await postForm(API.getUserBasket, { userID: id });
  return parseBasketData(result?.data);
};

export const syncBasketFromServer = async (): Promise<BasketEntry[]> => {
  const local = await getBasket();
  const userID = await getLoggedInUserID();
  if (!userID) {
    return local;
  }

  try {
    const remote = await fetchUserBasketFromServer(userID);
    if (remote.length > 0) {
      await persistBasket(remote, { syncServer: false });
      return remote;
    }
    if (local.length > 0) {
      await persistBasket(local);
      return local;
    }
    return [];
  } catch (error) {
    console.error("Error syncing basket from server:", error);
    return local;
  }
};

const currentPriceFromProduct = (book: Record<string, any>): {
  originalPrice: number;
  price: number;
} => {
  const pair = normalizePricePair(
    book?.priceFa ?? book?.price ?? book?.main_price ?? book?.price_physical_new,
    book?.discountFa ?? book?.discount,
  );
  const originalPrice = pair.price || pair.discount;
  const price =
    pair.discount > 0 && pair.discount !== originalPrice
      ? pair.discount
      : originalPrice;

  return { originalPrice, price };
};

export const productFromApi = (
  book: Record<string, any>,
  quantity: number,
): BasketProduct => {
  const type: ProductType = isProductType(book?.type)
     ? book.type
    : "physical_book";

  const { originalPrice, price } = currentPriceFromProduct(book);

  return {
    id: String(book?.id ?? ""),
    code_config: codeConfigFromBook(book),
    book_title: String(book?.title ?? book?.book_title ?? ""),
    author: book?.author != null ? String(book.author) : undefined,
    full_icon_address: book?.pic || book?.full_icon_address || undefined,
    price,
    originalPrice,
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
    exist: !isBookOutOfStock(book?.exist, book?.price ?? book?.priceFa),
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
  let changed = false;

  const products = await Promise.all(
    basket.map(async (entry, index) => {
      const book = await fetchProduct(entry.id);
      const code_config =
        codeConfigValue(entry.code_config) || codeConfigFromBook(book);
      if (code_config && code_config !== entry.code_config) {
        basket[index] = { ...entry, code_config };
        changed = true;
      }

      if (!book) {
        return {
          id: entry.id,
          code_config,
          quantity: entry.quantity,
          book_title: "",
          price: 0,
          originalPrice: 0,
          maxQuantity: MAX_QUANTITY,
          type: "physical_book" as const,
          exist: false,
        };
      }

      return {
        ...productFromApi(
          { ...book, id: book.id ?? entry.id },
          entry.quantity,
        ),
        code_config,
      };
    }),
  );

  if (changed) {
    await persistBasket(basket);
  }

  return products;
};
