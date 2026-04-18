import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import { Colors } from "@/constants/theme";
import labels from "@/data/labels.json";
import { AuthProvider } from "../context/AuthContext"; // ✅ اضافه شد

import NavBar from "../components/common/NavBar";
import BottomNavigation from "../components/common/BottomNavigation";
/* import CopyRight from "../components/CopyRight" */

export default function RootLayout() {
  const [appTheme, setAppTheme] = useState("dark");
  const [activePage, setActivePage] = useState("home");

  return (
    <AuthProvider> {/* ✅ همه چیز رو پیچیدیم */}
      <View style={styles.container}>
        <StatusBar style="auto" />
        <NavBar Colors={Colors} appTheme={appTheme} setAppTheme={setAppTheme} />

        <View style={styles.mainContainer}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>

        <BottomNavigation
          labels={labels}
          setActivePage={setActivePage}
          activePage={activePage}
          Colors={Colors}
          appTheme={appTheme}
        />
        {/*  <CopyRight /> */}
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