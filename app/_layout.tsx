// app/_layout.tsx
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Stack, usePathname } from "expo-router";
import Toast from "react-native-toast-message";

import { initI18n } from "@/locales";
import { useCustomFonts } from "@/hooks/useFonts";
import { useResponsive } from "@/hooks/useResponsive";
import { AuthProvider } from "@/context/AuthContext";
import { CatProvider } from "@/context/CatContext";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { PlayerProvider, usePlayer } from "@/context/PlayerContext";

import BottomNavigation from "@/components/common/BottomNavigation";
import NavBar from "@/components/common/NavBar";
import MiniPlayer from "@/components/common/MiniPlayer";

import labels from "@/data/labels.json";

function RootLayoutContent() {
 const { isRTL } = useLanguage();
  const [appTheme, setAppTheme] = useState("light");
  const { theme } = useTheme();
  const [activePage, setActivePage] = useState<string | null>(null);
  const { isMobile } = useResponsive();
  const pathname = usePathname();
  const hideNavigation = pathname === "/login";
  const { showMiniPlayer } = usePlayer();

  return (
    <View style={[styles.container, { direction: isRTL ? "rtl" : "ltr" }]}>
      <AuthProvider>
        <CatProvider>
          <View style={styles.innerContainer}>
            <StatusBar style="auto" />

            {!hideNavigation && (
              <NavBar appTheme={appTheme} setAppTheme={setAppTheme} />
            )}

            {/* ✅ محتوای اصلی با padding پایین برای فضای MiniPlayer */}
            <View style={[styles.mainContainer, showMiniPlayer && styles.mainContainerWithPlayer]}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: theme.colors.appBack },
                }}
              />
            </View>

            {/* ✅ MiniPlayer - با موقعیت absolute و zIndex بالا */}
            {showMiniPlayer && <MiniPlayer />}
            {isMobile && !hideNavigation && (
              <View style={styles.bottomNavWrapper}>
                <BottomNavigation
                  labels={labels}
                  setActivePage={setActivePage}
                  activePage={activePage}
                />
              </View>
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
        <PlayerProvider>
          <RootLayoutContent />
        </PlayerProvider>
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
  mainContainerWithPlayer: {
    marginBottom: 60, // فضای خالی برای MiniPlayer
  },
  playerWrapper: {
    position: "absolute",
    bottom: 60, // بالای BottomNavigation
    left: 0,
    right: 0,
    zIndex: 100,
    height: 60,
  },
  bottomNavWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});