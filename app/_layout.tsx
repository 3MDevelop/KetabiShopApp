// app/_layout.tsx
import { Stack, usePathname } from "expo-router";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { initI18n } from "@/locales";

import { Colors } from "@/constants/theme";
import labels from "@/data/labels.json";
import { AuthProvider } from "@/context/AuthContext";
import { CatProvider } from "@/context/CatContext";
import { useResponsive } from "@/hooks/useResponsive";

import NavBar from "@/components/common/NavBar";
import BottomNavigation from "@/components/common/BottomNavigation";

// کامپوننت داخلی که از useLanguage استفاده می‌کند
function RootLayoutContent() {
  const { isRTL } = useLanguage();
  const [appTheme, setAppTheme] = useState("dark");
  const [activePage, setActivePage] = useState<string | null>(null);
  const { isMobile } = useResponsive();
  const pathname = usePathname();
  const hideNavigation = pathname === "/login";

  return (
    // فقط direction تغییر می‌کند، بقیه استایل‌ها دست نمی‌خورند
    <View style={[styles.container, { direction: isRTL ? "rtl" : "ltr" }]}>
      <AuthProvider>
        <CatProvider>
          <View style={styles.container}>
            <StatusBar style="auto" />

            {!hideNavigation && (
              <NavBar
                Colors={Colors}
                appTheme={appTheme}
                setAppTheme={setAppTheme}
              />
            )}

            <View style={styles.mainContainer}>
              <Stack screenOptions={{ headerShown: false }} />
            </View>

            {isMobile && !hideNavigation && (
              <BottomNavigation
                labels={labels}
                setActivePage={setActivePage}
                activePage={activePage}
                Colors={Colors}
                appTheme={appTheme}
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

  useEffect(() => {
    initI18n().then(() => setIsReady(true));
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <LanguageProvider>
      <RootLayoutContent />
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});