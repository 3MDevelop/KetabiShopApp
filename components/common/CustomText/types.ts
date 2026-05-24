// components/common/CustomText/types.ts
import { TextProps } from 'react-native';

export interface CustomTextProps extends TextProps {
  bold?: boolean;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
}