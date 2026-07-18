// constants/theme.ts

export const Colors = {
  sampleColor: {
    color1: "#01C952",
    color2: "#B2E800",
    color3: "#19227D",
    color4: "#2F4EFE",
    color5: "#81B0FE",
    color6: "#781918",
    color7: "#D70103",
    color8: "#FF3C04",
    color9: "#FA5F33",
  },
  light: {
    background: "#FFFFFF",
    primary: "#007AFF",
    secondary: "#5856D6",
    navBackColor: "#0a7ea4",
    text: "#000000",
    textSecondary: "#8E8E93",
    border: "#C6C6C8",
    error: "#FF3B30",
    success: "#34C759",
    warning: "#FF9500",
    appBack: "#f5f5f5",
    surface: "#5c5c5c",
    itemBack: "#f8f9fa",
    iconColor: "#3996e8",
  },
  dark: {
    background: "#000000",
    surface: "#242424",
    primary: "#0A84FF",
    secondary: "#5E5CE6",
    navBackColor: "#0a323f",
    text: "#e0e0e0",
    textSecondary: "#e2e2e2",
    border: "#38383A",
    error: "#FF453A",
    success: "#30D158",
    warning: "#FF9F0A",
    appBack: "#414141",
    itemBack: "#242424",
    iconColor: "#e2e2e2",
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
    h1: { fontSize: 32, fontWeight: "bold" as const, lineHeight: 40 },
    h2: { fontSize: 24, fontWeight: "bold" as const, lineHeight: 32 },
    h3: { fontSize: 20, fontWeight: "bold" as const, lineHeight: 28 },
    body: { fontSize: 16, fontWeight: "normal" as const, lineHeight: 24 },
    caption: { fontSize: 12, fontWeight: "normal" as const, lineHeight: 16 },
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
