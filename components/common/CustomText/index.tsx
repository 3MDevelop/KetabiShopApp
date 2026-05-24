// components/common/CustomText/index.tsx
import { Text } from 'react-native';
import { useFontFamily } from '@/hooks/useFonts';
import { CustomTextProps } from './types';
import styles from './styles';

export default function CustomText({ 
  style, 
  bold = false, 
  variant = 'body',
  children, 
  ...props 
}: CustomTextProps) {
  const { getFontFamily } = useFontFamily(); // ✅ این هوک داخل LanguageProvider اجرا می‌شود
  
  return (
    <Text
      style={[
        styles.text,
        styles[variant],
        { fontFamily: getFontFamily(bold ? 'bold' : 'normal') },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}