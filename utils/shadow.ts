import { ViewStyle } from "react-native";

const hexToRgb = (hex: string) => {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((char) => char + char)
          .join("")
      : value;
  const n = parseInt(full, 16);
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255,
  };
};

export const shadow = (
  color: string,
  offset: { width: number; height: number },
  opacity: number,
  radius: number,
  elevation?: number,
): ViewStyle => {
  const { r, g, b } = hexToRgb(color);
  return {
    boxShadow: `${offset.width}px ${offset.height}px ${radius}px rgba(${r}, ${g}, ${b}, ${opacity})`,
    ...(elevation != null ? { elevation } : {}),
  };
};
