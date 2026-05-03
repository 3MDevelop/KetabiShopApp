// _layout.tsx

import { Stack, usePathname } from "expo-router";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import Toast from "react-native-toast-message";

import { Colors } from "@/constants/theme";
import labels from "@/data/labels.json";
import { AuthProvider } from "@/context/AuthContext";
import { useResponsive } from "@/hooks/useResponsive";

import NavBar from "@/components/common/NavBar";
import BottomNavigation from "@/components/common/BottomNavigation";
/* import CopyRight from "@/components/CopyRight" */


export default function RootLayout() {
  const [appTheme, setAppTheme] = useState("dark");
  const [activePage, setActivePage] = useState<string | null>(null);
  const { isMobile } = useResponsive();
  const pathname = usePathname();

  // مخفی کردن نوارها در صفحه لاگین
  const hideNavigation = pathname === "/login";

  return (
    <AuthProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        
        {/* نمایش NavBar فقط در صفحات غیر لاگین */}
        {!hideNavigation && (
          <NavBar Colors={Colors} appTheme={appTheme} setAppTheme={setAppTheme} />
        )}

        <View style={styles.mainContainer}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>

        {/* نمایش BottomNavigation فقط در صفحات غیر لاگین و موبایل */}
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
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
});