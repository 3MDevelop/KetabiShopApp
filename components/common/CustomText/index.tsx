// components/common/CustomText/index.tsx
import { Text } from "react-native";
import { useFontFamily } from "@/hooks/useFonts";
import { CustomTextProps } from "./types";
import styles from "./styles";

export default function CustomText({
  style,
  bold = false,
  variant = "body",
  center = false,
  children,
  marginB = 0,
  ...props
}: CustomTextProps) {
  const { getFontFamily } = useFontFamily();

  return (
    <Text
      style={[
        styles.text,
        styles[variant],
        {
          fontFamily: getFontFamily(bold ? "bold" : "normal"),
          textAlign: center ? "center" : "auto",
          marginBottom: marginB
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}
