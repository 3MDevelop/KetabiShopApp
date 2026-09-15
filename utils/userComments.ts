import { API } from "@/constants/api";
import { fetchProduct } from "@/utils/basket";

export type CommentedBook = {
  id: string;
  name: string;
  author?: string;
  price?: number | string;
  image?: string;
  percent?: number | string;
  discount?: number | string;
  exist?: number | string;
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
  const text = (await response.text()).replace(/^\uFEFF/, "").trim();
  if (!text) {
    return null;
  }
  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(text.slice(start, end + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
};

const normalizeProductId = (raw: unknown): string | null => {
  if (raw == null) {
    return null;
  }
  if (typeof raw === "string" || typeof raw === "number") {
    const id = String(raw).trim();
    if (!id || id === "0") {
      return null;
    }
    return id;
  }
  if (typeof raw !== "object") {
    return null;
  }
  const row = raw as Record<string, unknown>;
  const id =
    row.productID ??
    row.productId ??
    row.bookID ??
    row.bookId ??
    row.id;
  const next = id != null ? String(id).trim() : "";
  if (!next || next === "0") {
    return null;
  }
  return next;
};

const parseCommentedProductIds = (raw: unknown): string[] => {
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
  const seen = new Set<string>();
  const ids: string[] = [];
  for (const item of list) {
    const id = normalizeProductId(item);
    if (!id || seen.has(id)) {
      continue;
    }
    seen.add(id);
    ids.push(id);
  }
  return ids;
};

export async function fetchUserCommentedBooks(
  userID?: number | string,
): Promise<CommentedBook[]> {
  if (userID == null || String(userID).trim() === "" || String(userID) === "0") {
    return [];
  }

  const result = await postForm(API.getUserComments, {
    userID: String(userID),
  });
  const ids = parseCommentedProductIds(result?.data);
  if (ids.length === 0) {
    return [];
  }

  const books = await Promise.all(
    ids.map(async (id) => {
      const book = await fetchProduct(id);
      if (!book) {
        return null;
      }
      const name = String(book.title ?? book.book_title ?? "").trim();
      if (!name) {
        return null;
      }
      return {
        id: String(book.id ?? id),
        name,
        author: book.author != null ? String(book.author) : undefined,
        price: book.priceFa ?? book.price,
        image: book.pic || book.full_icon_address,
        percent: book.percentFa ?? book.percent,
        discount: book.discountFa ?? book.discount,
        exist: book.exist,
      } satisfies CommentedBook;
    }),
  );

  return books.filter((book): book is CommentedBook => book != null);
}
