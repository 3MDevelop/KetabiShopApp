// app/index.tsx
import React from "react";
import { View, Text, ScrollView, Button } from "react-native";
import styles from "./styles";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";

export default function MyLibrary() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>صفحه کتابخانه من </Text>
          <Text style={styles.description}>
            این محتوای صفحه اصلی است که در MyLibrary نمایش داده می‌شود.
          </Text>
        </View>
      </ScrollView>
    );
  }
  return (
    <View
      style={[
        styles.content,
        {
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        },
      ]}
    >
      <Text>
        برای نمایش کتابخانه شخصی، ابتدا باید وارد حساب کاربری خود شوید
      </Text>
      <Button title="ورود به حساب کاربری"
       onPress={() => router.push("/login")}
       ></Button>
    </View>
  );
}
