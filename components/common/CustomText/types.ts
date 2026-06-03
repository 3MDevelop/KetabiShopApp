// components/common/CustomText/types.ts
import { TextProps } from "react-native";

export interface CustomTextProps extends TextProps {
  bold?: boolean;
  variant?:
    | "text"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "body"
    | "caption"
    | "discription";
  center?: boolean;
  children?: React.ReactNode;
}
