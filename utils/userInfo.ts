import { API } from "@/constants/api";

export type UserInfoData = {
  name?: string;
  nName?: string;
  lName?: string;
  email?: string;
  avatar?: number;
};

export type SetUserInfoInput = {
  userID: string | number;
  name: string;
  lName: string;
  nName: string;
  avatar: string | number;
  email: string;
};

export type SetUserInfoResult = {
  ok: boolean;
  msg: string;
  data: UserInfoData | null;
};

function isApiSuccess(status: unknown) {
  return status === true || status === "true" || status === 1 || status === "1";
}

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
  const info: UserInfoData = {
    name: row.name != null ? String(row.name) : undefined,
    nName: row.nName != null ? String(row.nName) : undefined,
    lName: row.lName != null ? String(row.lName) : undefined,
    email: row.email != null ? String(row.email) : undefined,
    avatar: Number.isFinite(avatar) ? avatar : undefined,
  };
  if (
    info.name == null &&
    info.nName == null &&
    info.lName == null &&
    info.email == null &&
    info.avatar == null
  ) {
    return null;
  }
  return info;
}

function parseUserInfoData(raw: unknown): UserInfoData | null {
  if (Array.isArray(raw)) {
    for (const item of raw) {
      const info = asUserInfo(item);
      if (info) return info;
    }
    return null;
  }
  return asUserInfo(raw);
}

export async function fetchUserInfo(
  userID?: string | number,
): Promise<UserInfoData | null> {
  if (userID != null && String(userID) !== "" && String(userID) !== "0") {
    const live = await postJson(
      API.getUserInfo,
      `userID=${encodeURIComponent(String(userID))}`,
    );
    if (isApiSuccess(live?.status) && live.data) {
      return parseUserInfoData(live.data);
    }
  }

  const fallback = await postJson(API.getstatic, "name=getUserInfo");
  if (isApiSuccess(fallback?.status) && fallback.data) {
    return parseUserInfoData(fallback.data);
  }
  return null;
}

export async function setUserInfo(
  input: SetUserInfoInput,
): Promise<SetUserInfoResult> {
  const result = await postJson(
    API.setUserInfo,
    [
      `userID=${encodeURIComponent(String(input.userID))}`,
      `name=${encodeURIComponent(input.name)}`,
      `lName=${encodeURIComponent(input.lName)}`,
      `nName=${encodeURIComponent(input.nName)}`,
      `avatar=${encodeURIComponent(String(input.avatar))}`,
      `email=${encodeURIComponent(input.email)}`,
    ].join("&"),
  );

  return {
    ok: isApiSuccess(result?.status),
    msg: String(result?.msg ?? result?.message ?? "").trim(),
    data: parseUserInfoData(result?.data),
  };
}
