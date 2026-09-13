import { Platform, StyleProp, ViewStyle } from "react-native";

type Dir = "ltr" | "rtl";

export function withDir(direction: Dir, style?: StyleProp<ViewStyle>) {
  if (Platform.OS === "web") {
    return { dir: direction, style };
  }

  return {
    style: [{ direction } as ViewStyle, style],
  };
}
