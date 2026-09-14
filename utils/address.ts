import { API } from "@/constants/api";
import { toEnglishDigits } from "@/utils/money";

export type PlaceItem = {
  id: string;
  title: string;
};

export type UserAddress = {
  id: string;
  addressID?: string;
  addressName?: string;
  name?: string;
  recipientsName?: string;
  family?: string;
  recipientsPhone?: string;
  recipientsCell?: string;
  address?: string;
  postalcode?: string;
  postalCode?: string;
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

const textValue = (value: unknown) => {
  if (value == null) {
    return "";
  }
  const text = String(value).trim();
  if (!text || text === "null" || text === "undefined") {
    return "";
  }
  return text;
};

export const getAddressTitle = (item: UserAddress) =>
  String(item.addressName || item.name || "").trim();

export const getAddressPlace = (item: UserAddress) =>
  [item.province, item.city].map(textValue).filter(Boolean).join("، ");

export const getRecipientName = (item: UserAddress) =>
  [item.recipientsName, item.family].filter(Boolean).join(" ").trim();

export const getRecipientMobile = (item: UserAddress) =>
  String(item.recipientsCell || item.mobile || "").trim();

export const getRecipientPhone = (item: UserAddress) =>
  String(item.recipientsPhone || item.phone || "").trim();

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

const asAddressList = (raw: unknown): unknown[] => {
  if (Array.isArray(raw)) {
    return raw;
  }
  return [];
};

const mapAddress = (
  item: Record<string, unknown>,
  index: number,
): UserAddress => {
  const addressID =
    item.addressID != null
      ? String(item.addressID)
      : item.id != null
        ? String(item.id)
        : String(index + 1);
  const postalcode =
    item.postalCode != null
      ? String(item.postalCode)
      : item.postalcode != null
        ? String(item.postalcode)
        : "";

  return {
    id: addressID,
    addressID,
    addressName:
      item.addressName != null
        ? String(item.addressName)
        : item.name != null
          ? String(item.name)
          : "",
    name: item.name != null ? String(item.name) : "",
    recipientsName:
      item.recipientsName != null ? String(item.recipientsName) : "",
    family: item.family != null ? String(item.family) : "",
    recipientsPhone:
      item.recipientsPhone != null
        ? String(item.recipientsPhone)
        : item.phone != null
          ? String(item.phone)
          : "",
    recipientsCell:
      item.recipientsCell != null
        ? String(item.recipientsCell)
        : item.mobile != null
          ? String(item.mobile)
          : "",
    address: item.address != null ? String(item.address) : "",
    postalcode,
    postalCode: postalcode,
    province: textValue(
      item.province ?? item.state ?? item.provinceName ?? item.ostan,
    ),
    city: textValue(item.city ?? item.cityName ?? item.shahr),
    province_id: textValue(item.province_id ?? item.provinceId),
    city_id: textValue(item.city_id ?? item.cityId),
    mobile:
      item.recipientsCell != null
        ? String(item.recipientsCell)
        : item.mobile != null
          ? String(item.mobile)
          : "",
    phone:
      item.recipientsPhone != null
        ? String(item.recipientsPhone)
        : item.phone != null
          ? String(item.phone)
          : "",
  };
};

export const fetchAddresses = async (
  userID?: number | string,
): Promise<UserAddress[]> => {
  if (userID == null || String(userID) === "") {
    return [];
  }

  const result = await postForm(API.getAddress, { userID: String(userID) });
  const rows = asAddressList(result?.addresses ?? result?.data);
  const mapped = rows.map((item, index) =>
    mapAddress(item as Record<string, unknown>, index),
  );

  const needsLookup = mapped.some(
    (item) => (!item.province && item.province_id) || (!item.city && item.city_id),
  );
  if (!needsLookup) {
    return mapped;
  }

  const provinces = await fetchProvinces();
  const provinceTitle = Object.fromEntries(
    provinces.map((item) => [item.id, item.title]),
  );
  const citiesByProvince = new Map<string, PlaceItem[]>();

  const withNames = await Promise.all(
    mapped.map(async (item) => {
      const provinceId = String(item.province_id || "");
      const cityId = String(item.city_id || "");
      const province =
        textValue(item.province) || provinceTitle[provinceId] || "";

      let city = textValue(item.city);
      if (!city && cityId && provinceId) {
        if (!citiesByProvince.has(provinceId)) {
          citiesByProvince.set(provinceId, await fetchCities(provinceId));
        }
        city =
          citiesByProvince.get(provinceId)?.find((row) => row.id === cityId)
            ?.title || "";
      }

      return { ...item, province, city };
    }),
  );

  return withNames;
};

export const createAddress = async (payload: {
  userID?: number | string;
  addressID?: number | string;
  addressName: string;
  recipientsName: string;
  recipientsPhone?: string;
  recipientsCell: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
  province_id: string;
  city_id: string;
}) => {
  return postForm(API.setAddress, {
    userID:
      payload.userID != null && String(payload.userID) !== ""
        ? String(payload.userID)
        : "",
    addressID:
      payload.addressID != null && String(payload.addressID) !== ""
        ? String(payload.addressID)
        : "",
    addressName: payload.addressName,
    recipientsName: payload.recipientsName,
    recipientsPhone: toEnglishDigits(payload.recipientsPhone || "").replace(
      /\D/g,
      "",
    ),
    recipientsCell: normalizeMobile(payload.recipientsCell),
    province: payload.province_id,
    city: payload.city_id,
    postalCode: toEnglishDigits(payload.postalCode),
    address: payload.address,
    province_id: payload.province_id,
    city_id: payload.city_id,
  });
};

export const deleteAddress = async (payload: {
  userID?: number | string;
  addressID?: number | string;
}) => {
  return postForm(API.deleteAddress, {
    userID:
      payload.userID != null && String(payload.userID) !== ""
        ? String(payload.userID)
        : "",
    addressID:
      payload.addressID != null && String(payload.addressID) !== ""
        ? String(payload.addressID)
        : "",
  });
};
