import { API } from "@/constants/api";

export type UserInfoData = {
  name?: string;
  nName?: string;
  lName?: string;
  email?: string;
  avatar?: number;
};

async function postJson(url: string, body: string) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const text = (await response.text()).replace(/^\uFEFF/, "").trim();
  if (!text) return null;
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
}

function asUserInfo(raw: unknown): UserInfoData | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  const avatar = Number(row.avatar);
  return {
    name: row.name != null ? String(row.name) : undefined,
    nName: row.nName != null ? String(row.nName) : undefined,
    lName: row.lName != null ? String(row.lName) : undefined,
    email: row.email != null ? String(row.email) : undefined,
    avatar: Number.isFinite(avatar) ? avatar : undefined,
  };
}

export async function fetchUserInfo(
  userID?: string | number,
): Promise<UserInfoData | null> {
  if (userID != null && String(userID) !== "" && String(userID) !== "0") {
    const live = await postJson(
      API.getUserInfo,
      `userID=${encodeURIComponent(String(userID))}`,
    );
    if (live?.status === true && live.data) {
      return asUserInfo(live.data);
    }
  }

  const fallback = await postJson(API.getstatic, "name=getUserInfo");
  if (fallback?.status === true && fallback.data) {
    return asUserInfo(fallback.data);
  }
  return null;
}
