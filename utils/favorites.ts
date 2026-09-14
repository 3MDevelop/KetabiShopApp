import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "@/constants/api";
import { fetchProduct } from "@/utils/basket";

export interface FavoriteItem {
  id: string;
}

export type FavoriteBook = {
  id: string;
  name: string;
  author?: string;
  price?: number | string;
  image?: string;
  percent?: number | string;
  discount?: number | string;
  exist?: number | string;
};

const FAVORITES_KEY = "@favorites";
const USER_KEY = "@user";
const SYNC_DEBOUNCE_MS = 400;

type FavoritesListener = () => void;
const listeners = new Set<FavoritesListener>();

export const subscribeFavorites = (listener: FavoritesListener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const notifyFavorites = () => {
  listeners.forEach((listener) => listener());
};

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

const normalizeItem = (raw: unknown): FavoriteItem | null => {
  if (raw == null) {
    return null;
  }
  if (typeof raw === "string" || typeof raw === "number") {
    const id = String(raw).trim();
    return id ? { id } : null;
  }
  if (typeof raw !== "object") {
    return null;
  }
  const row = raw as Record<string, unknown>;
  const id =
    row.id != null
      ? String(row.id)
      : row.bookID != null
        ? String(row.bookID)
        : "";
  return id ? { id } : null;
};

const toStoredFavorites = (items: FavoriteItem[]) => {
  const seen = new Set<string>();
  const next: FavoriteItem[] = [];
  for (const item of items) {
    const id = String(item?.id || "").trim();
    if (!id || seen.has(id)) {
      continue;
    }
    seen.add(id);
    next.push({ id });
  }
  return next;
};

const parseFavoriteData = (raw: unknown): FavoriteItem[] => {
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
  return toStoredFavorites(
    list
      .map(normalizeItem)
      .filter((item): item is FavoriteItem => item !== null),
  );
};

let syncTimer: ReturnType<typeof setTimeout> | null = null;
let pendingFavorites: FavoriteItem[] | null = null;

const cancelFavoritesSync = () => {
  if (syncTimer) {
    clearTimeout(syncTimer);
    syncTimer = null;
  }
  pendingFavorites = null;
};

const pushFavoritesToServer = async (items: FavoriteItem[]) => {
  const userID = await getLoggedInUserID();
  if (!userID) {
    return;
  }
  try {
    await postForm(API.setUserFavorites, {
      userID,
      data: JSON.stringify(toStoredFavorites(items).map((item) => item.id)),
    });
  } catch (error) {
    console.error("Error saving favorites to server:", error);
  }
};

const scheduleFavoritesSync = (items: FavoriteItem[]) => {
  pendingFavorites = toStoredFavorites(items);
  if (syncTimer) {
    clearTimeout(syncTimer);
  }
  syncTimer = setTimeout(() => {
    const next = pendingFavorites;
    syncTimer = null;
    pendingFavorites = null;
    if (next) {
      void pushFavoritesToServer(next);
    }
  }, SYNC_DEBOUNCE_MS);
};

const persistFavorites = async (
  items: FavoriteItem[],
  options?: { syncServer?: boolean },
) => {
  const stored = toStoredFavorites(items);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(stored));
  notifyFavorites();
  if (options?.syncServer === false) {
    return;
  }
  scheduleFavoritesSync(stored);
};

export const getFavorites = async (): Promise<FavoriteItem[]> => {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    if (!data) {
      return [];
    }
    return parseFavoriteData(JSON.parse(data));
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
};

export const isFavorite = async (bookId: string): Promise<boolean> => {
  const favorites = await getFavorites();
  return favorites.some((item) => item.id === String(bookId));
};

export const addToFavorites = async (book: FavoriteItem): Promise<void> => {
  const id = String(book?.id || "").trim();
  if (!id) {
    return;
  }
  try {
    const favorites = await getFavorites();
    if (favorites.some((item) => item.id === id)) {
      return;
    }
    await persistFavorites([...favorites, { id }]);
  } catch (error) {
    console.error("Error adding to favorites:", error);
  }
};

export const removeFromFavorites = async (bookId: string): Promise<void> => {
  try {
    const favorites = await getFavorites();
    await persistFavorites(
      favorites.filter((item) => item.id !== String(bookId)),
    );
  } catch (error) {
    console.error("Error removing from favorites:", error);
  }
};

export const toggleFavorite = async (book: FavoriteItem): Promise<boolean> => {
  const isFav = await isFavorite(book.id);
  if (isFav) {
    await removeFromFavorites(book.id);
    return false;
  }
  await addToFavorites(book);
  return true;
};

export const clearFavorites = async (
  options?: { syncServer?: boolean },
): Promise<void> => {
  if (options?.syncServer === false) {
    cancelFavoritesSync();
  }
  await persistFavorites([], options);
};

export const fetchUserFavoritesFromServer = async (
  userID?: number | string,
): Promise<FavoriteItem[]> => {
  const id = userID != null ? String(userID) : await getLoggedInUserID();
  if (!id) {
    return [];
  }
  const result = await postForm(API.getUserFavorites, { userID: id });
  return parseFavoriteData(result?.data);
};

export const syncFavoritesFromServer = async (): Promise<FavoriteItem[]> => {
  const local = await getFavorites();
  const userID = await getLoggedInUserID();
  if (!userID) {
    return local;
  }

  try {
    const remote = await fetchUserFavoritesFromServer(userID);
    if (remote.length > 0) {
      await persistFavorites(remote, { syncServer: false });
      return remote;
    }
    if (local.length > 0) {
      await persistFavorites(local);
      return local;
    }
    return [];
  } catch (error) {
    console.error("Error syncing favorites from server:", error);
    return local;
  }
};

export const getFavoriteBooks = async (): Promise<FavoriteBook[]> => {
  const favorites = await getFavorites();
  return Promise.all(
    favorites.map(async (item) => {
      const book = await fetchProduct(item.id);
      if (!book) {
        return {
          id: item.id,
          name: "",
        };
      }
      return {
        id: String(book.id ?? item.id),
        name: String(book.title ?? book.book_title ?? ""),
        author: book.author != null ? String(book.author) : undefined,
        price: book.priceFa ?? book.price,
        image: book.pic || book.full_icon_address,
        percent: book.percentFa ?? book.percent,
        discount: book.discountFa ?? book.discount,
        exist: book.exist,
      };
    }),
  );
};
