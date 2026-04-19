import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import styles from "./styles";


export default function ModalScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, isLoggedIn, user, logout } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("خطا", "لطفاً ایمیل و رمز عبور را وارد کن");
      return;
    }
    await login(email, password);
    if (!error) {
      Alert.alert("موفق", `خوش آمدی ${user?.name}`);
      router.push('/')
    }
  };
  
  const handleLogout = async () => {
    await logout();
    Alert.alert("خروج", "با موفقیت خارج شدی");
    router.push('/')
  };

  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>پروفایل کاربری</Text>
        <View style={styles.infoBox}>
          <Text style={styles.label}>نام:</Text>
          <Text style={styles.value}>{user?.name}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>ایمیل:</Text>
          <Text style={styles.value}>{user?.email}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>خروج از حساب</Text>
        </TouchableOpacity>
      </View>
    );
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
      />

      <TextInput
        style={styles.input}
        placeholder="رمز عبور"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "در حال ورود..." : "ورود"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}