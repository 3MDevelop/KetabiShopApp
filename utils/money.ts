const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";

export const toEnglishDigits = (value: string): string =>
  value
    .replace(/[۰-۹]/g, (digit) => String(FA_DIGITS.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(AR_DIGITS.indexOf(digit)));

export const parseMoney = (value: unknown): number => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string") {
    const n = Number(toEnglishDigits(value).replace(/[^\d.-]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
};

export const formatNumber = (
  value: unknown,
  language: string,
): string => {
  const n = parseMoney(value);
  if (!n) {
    return "";
  }
  const locale = language === "fa" ? "fa-IR" : "en-US";
  try {
    return n.toLocaleString(locale);
  } catch {
    const grouped = String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (language !== "fa") {
      return grouped;
    }
    return grouped.replace(/\d/g, (digit) => FA_DIGITS[Number(digit)]);
  }
};

export const normalizePricePair = (
  price: unknown,
  discount: unknown,
): { price: number; discount: number } => {
  let priceValue = parseMoney(price);
  let discountValue = parseMoney(discount);

  if (priceValue > 0 && discountValue > 0) {
    const ratio = discountValue / priceValue;
    if (ratio > 5) {
      discountValue = Math.round(discountValue / 10);
    } else if (ratio > 0 && ratio < 0.05) {
      priceValue = Math.round(priceValue / 10);
    }
  }

  return { price: priceValue, discount: discountValue };
};
