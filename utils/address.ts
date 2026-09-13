import { API } from "@/constants/api";
import { toEnglishDigits } from "@/utils/money";

export type PlaceItem = {
  id: string;
  title: string;
};

export type UserAddress = {
  id: string;
  name?: string;
  family?: string;
  addressName?: string;
  address?: string;
  postalcode?: string;
  province?: string | null;
  city?: string | null;
  province_id?: string | null;
  city_id?: string | null;
  mobile?: string;
  phone?: string;
};

const postForm = async (url: string, body: Record<string, string> = {}) => {
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

const asList = (raw: unknown): PlaceItem[] => {
  if (!Array.isArray(raw)) {
    return [];
  }
  return raw
    .map((item) => {
      const row = item as Record<string, unknown>;
      const id = row.id != null ? String(row.id) : "";
      const title = String(row.title ?? row.name ?? "");
      return id && title ? { id, title } : null;
    })
    .filter((item): item is PlaceItem => item !== null);
};

export const normalizeMobile = (value?: string) => {
  let digits = toEnglishDigits(String(value || "")).replace(/\D/g, "");
  if (digits.length === 10 && digits.startsWith("9")) {
    digits = `0${digits}`;
  }
  return digits;
};

export const mobileKey = (value?: string) =>
  normalizeMobile(value).replace(/^0/, "");

export const getAddressTitle = (item: UserAddress) =>
  item.name || item.addressName || "";

export const getRecipientName = (item: UserAddress) =>
  String(item.family || "").trim();

export const getRecipientMobile = (item: UserAddress) =>
  item.phone || item.mobile || "";

export const fetchProvinces = async (): Promise<PlaceItem[]> => {
  const result = await postForm(API.getProvince);
  if (result?.status === true) {
    return asList(result.data);
  }
  return [];
};

export const fetchCities = async (provinceId: string): Promise<PlaceItem[]> => {
  const result = await postForm(API.getCity, { province: provinceId });
  if (result?.status === true) {
    return asList(result.data);
  }
  return [];
};

export const fetchAddresses = async (
  mobile: string,
  token?: string,
): Promise<UserAddress[]> => {
  const normalized = normalizeMobile(mobile);
  const result = await postForm(API.getAddress, {
    mobile: normalized,
    ...(token ? { token } : {}),
  });
  if (result?.status !== true || !Array.isArray(result.data)) {
    return [];
  }

  const ownerKey = mobileKey(normalized);

  return result.data
    .map((item: Record<string, unknown>, index: number) => ({
      id: String(item.id ?? index + 1),
      name: item.name != null ? String(item.name) : "",
      family: item.family != null ? String(item.family) : "",
      addressName:
        item.addressName != null
          ? String(item.addressName)
          : item.title != null
            ? String(item.title)
            : "",
      address: item.address != null ? String(item.address) : "",
      postalcode: item.postalcode != null ? String(item.postalcode) : "",
      province: item.province != null ? String(item.province) : "",
      city: item.city != null ? String(item.city) : "",
      province_id: item.province_id != null ? String(item.province_id) : "",
      city_id: item.city_id != null ? String(item.city_id) : "",
      mobile: item.mobile != null ? String(item.mobile) : "",
      phone: item.phone != null ? String(item.phone) : "",
    }))
    .filter((item) => mobileKey(item.mobile) === ownerKey);
};

export const createAddress = async (payload: {
  ownerMobile: string;
  mobile: string;
  addressName: string;
  recipientName: string;
  address: string;
  postalcode: string;
  province: string;
  city: string;
  token?: string;
}) => {
  return postForm(API.setAddress, {
    mobile: normalizeMobile(payload.ownerMobile),
    phone: normalizeMobile(payload.mobile),
    name: payload.addressName,
    family: payload.recipientName,
    address: payload.address,
    postalcode: toEnglishDigits(payload.postalcode),
    province: payload.province,
    city: payload.city,
    ...(payload.token ? { token: payload.token } : {}),
  });
};
