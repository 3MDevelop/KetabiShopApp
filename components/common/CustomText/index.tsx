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
  singleLine = false,
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
          marginBottom: marginB,
          ...(singleLine && {
            numberOfLines: 1,
            ellipsizeMode: "tail",
          }),
        },
        style,
      ]}
      numberOfLines={singleLine ? 1 : undefined}
      ellipsizeMode={singleLine ? "tail" : undefined}
      {...props}
    >
      {children}
    </Text>
  );
}