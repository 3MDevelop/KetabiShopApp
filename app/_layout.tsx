// app/_layout.tsx
import { initI18n } from "@/locales";
import { Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { useCustomFonts } from "@/hooks/useFonts";

import { AuthProvider } from "@/context/AuthContext";
import { CatProvider } from "@/context/CatContext";
import labels from "@/data/labels.json";
import { useResponsive } from "@/hooks/useResponsive";

import BottomNavigation from "@/components/common/BottomNavigation";
import NavBar from "@/components/common/NavBar";

function RootLayoutContent() {
  const { isRTL } = useLanguage();
  const [appTheme, setAppTheme] = useState("light");
  const { theme } = useTheme();
  const [activePage, setActivePage] = useState<string | null>(null);
  const { isMobile } = useResponsive();
  const pathname = usePathname();
  const hideNavigation = pathname === "/login";

  return (
    <View style={[styles.container, { direction: isRTL ? "rtl" : "ltr" }]}>
      <AuthProvider>
        <CatProvider>
          <View style={styles.innerContainer}>
            <StatusBar style="auto" />

            {!hideNavigation && (
              <NavBar appTheme={appTheme} setAppTheme={setAppTheme} />
            )}

            <View style={styles.mainContainer}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: theme.colors.appBack },
                }}
              />
            </View>

            {isMobile && !hideNavigation && (
              <BottomNavigation
                labels={labels}
                setActivePage={setActivePage}
                activePage={activePage}
              />
            )}

            <Toast />
          </View>
        </CatProvider>
      </AuthProvider>
    </View>
  );
}

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const { fontsLoaded } = useCustomFonts();

  useEffect(() => {
    initI18n().then(() => setIsReady(true));
  }, []);

  if (!isReady || !fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <LanguageProvider>
      <ThemeProvider>
        <RootLayoutContent />
      </ThemeProvider>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
