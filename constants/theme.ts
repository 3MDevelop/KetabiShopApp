// constants/theme.ts

// رنگ‌های ثابت برنامه (برای NavBar و ...)
export const Colors = {
  light: {
    background: '#FFFFFF',
    surface: '#F2F2F7',
    primary: '#007AFF',
    secondary: '#5856D6',
    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#C6C6C8',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
  },
  dark: {
    background: '#000000',
    surface: '#1C1C1E',
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
    error: '#FF453A',
    success: '#30D158',
    warning: '#FF9F0A',
  },
};

// تم اصلی برنامه (برای ThemeProvider)
export const lightTheme = {
  colors: Colors.light,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    h1: { fontSize: 32, fontWeight: 'bold' as const, lineHeight: 40 },
    h2: { fontSize: 24, fontWeight: 'bold' as const, lineHeight: 32 },
    h3: { fontSize: 20, fontWeight: 'bold' as const, lineHeight: 28 },
    body: { fontSize: 16, fontWeight: 'normal' as const, lineHeight: 24 },
    caption: { fontSize: 12, fontWeight: 'normal' as const, lineHeight: 16 },
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    xlarge: 16,
    circle: 999,
  },
};

export const darkTheme = {
  colors: Colors.dark,
  spacing: lightTheme.spacing,
  typography: lightTheme.typography,
  borderRadius: lightTheme.borderRadius,
};

export type Theme = typeof lightTheme;