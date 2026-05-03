import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "@/hooks/useAuth";
import styles from "./styles";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

type ToastType = "success" | "error" | "info" | "warning";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, isLoading, login } = useAuth();

  const showToast = (
    type: ToastType,
    message: string,
    description?: string,
  ) => {
    Toast.show({
      type: type,
      text1: message,
      text2:
        description ||
        (type === "success"
          ? "عملیات با موفقیت انجام شد"
          : "لطفاً مجدداً تلاش کنید"),
      position: "top",
      topOffset: 20,
      visibilityTime: 3000,
    });
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showToast("error", "خطا", "لطفاً ایمیل و رمز عبور را وارد کنید");
      return;
    }
    await login(email, password);
    showToast("success", "خوش آمدید", "با موفقیت وارد شدید");
    router.replace("/");
  };

  // اگر در حال بارگذاری است
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2196f3" />
        <Text style={{ marginTop: 20, textAlign: "center" }}>
          در حال اتصال...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      {isLoggedIn ? (
        <View style={styles.container}>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            شما قبلاً به سیستم وارد شده‌اید
          </Text>
          <Text style={{ marginTop: 10, fontWeight: "300" }}>
            در حال انتقال به صفحه اصلی...
          </Text>
          <ActivityIndicator
            style={{ marginTop: 20 }}
            size="small"
            color="#2196f3"
          />
          {(() => {
            setTimeout(() => {
              router.replace("/");
            }, 2000);
            return null;
          })()}
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>ورود به حساب کاربری</Text>

          <TextInput
            style={styles.input}
            placeholder="ایمیل"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!isLoading}
          />

          <TextInput
            style={styles.input}
            placeholder="رمز عبور"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isLoading}
          />

          <TouchableOpacity
            style={[styles.loginButton, isLoading && { opacity: 0.6 }]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>ورود</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}