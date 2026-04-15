import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import { Colors } from "@/constants/theme";
import labels from "@/data/labels.json";

import NavBar from "../components/NavBar";
import BottomNavigation from "../components/BottomNavigation";

export default function RootLayout() {
  const [appTheme, setAppTheme] = useState("dark");
  const [activePage, setActivePage] = useState("home");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* هدر مشترک برای همه صفحات */}
      <NavBar Colors={Colors} appTheme={appTheme} setAppTheme={setAppTheme} />

      {/* محتوای اصلی */}
      <View style={styles.mainContainer}>
        <Stack
          screenOptions={{
            headerShown: false, // هدر رو خودمون مدیریت می‌کنیم
          }}
        >
          {/* تعریف صفحات */}
          {/* <Stack.Screen
            name="index"
            options={{
              title: "خانه",
            }}
          />
          <Stack.Screen
            name="about"
            options={{
              title: "درباره ما",
            }}
          />
          <Stack.Screen
            name="contact"
            options={{
              title: "تماس با ما",
            }}
          />
          <Stack.Screen
            name="newPage"
            options={{
              title: "صفحه مجازی",
            }}
          /> */}
        </Stack>
      </View>

      <BottomNavigation
        labels={labels}
        setActivePage={setActivePage}
        activePage={activePage}
        Colors={Colors}
        appTheme={appTheme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    flex: 1,
  },
});
