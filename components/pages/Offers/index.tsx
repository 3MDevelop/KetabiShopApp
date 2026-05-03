import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import Toast from "react-native-toast-message";

type ToastType = "success" | "error" | "info" | "warning";

export default function Offers() {
  const showToast = (type: ToastType, message: string) => {
    Toast.show({
      type: type,
      text1: message,
      text2: "عملیات با موفقیت انجام شد",
      position: "top",
      topOffset: 20,
      visibilityTime: 2000,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>صفحه پیشنهادات</Text>
        <Text style={styles.description}>
          این محتوای صفحه اصلی است که در Offers نمایش داده می‌شود.
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => showToast("error", "خطا در عملیات ❌")}
        style={[
          styles.toast,
          {
            backgroundColor: "#f44336",
          },
        ]}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          نمایش پیام خطا
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => showToast("success", "عملیات موفق ✅")}
        style={[
          styles.toast,
          {
            backgroundColor: "#4CAF50",
          },
        ]}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          نمایش پیام موفقیت
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => showToast("info", "اطلاعیه مهم ℹ️")}
        style={[
          styles.toast,
          {
            backgroundColor: "#2196F3",
          },
        ]}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          نمایش پیام اطلاعات
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
