import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import styles from "./styles";
import Toast from "react-native-toast-message";

type ToastType = "success" | "error" | "info" | "warning";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, isLoggedIn, user } = useAuth();

  const showToast = (type: ToastType, message: string, description?: string) => {
    Toast.show({
      type: type,
      text1: message,
      text2: description || (type === "success" ? "عملیات با موفقیت انجام شد" : "لطفاً مجدداً تلاش کنید"),
      position: "top",
      topOffset: 20,
      visibilityTime: 3000,
    });
  };

  useEffect(() => {
    if (error) {
      showToast("error", "خطا", error);
    }
  }, [error]);

  useEffect(() => {
    if (isLoggedIn && user) {
      router.replace("/");
    }
  }, [isLoggedIn, user]);

  const handleLogin = async () => {
    if (!email || !password) {
      showToast("error", "خطا", "لطفاً ایمیل و رمز عبور را وارد کنید");
      return;
    }
    
    await login(email, password);
  };

  // اگر در حال بارگذاری است، صفحه لودینگ نمایش بده
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2196f3" />
        <Text style={{ marginTop: 20, textAlign: "center" }}>در حال اتصال...</Text>
      </View>
    );
  }

  // اگر قبلاً وارد شده باشد، صفحه خالی برگردان (redirect در useEffect انجام می‌شود)
  if (isLoggedIn) {
    return null;
  }

  return (
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
  );
}