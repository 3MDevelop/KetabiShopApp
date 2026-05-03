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
  const [isAccepted, setIsAccepted] = useState(false);
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
    if (!isAccepted) {
      showToast("error", "خطا", "لطفاً قوانین و مقررات را بپذیرید");
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
          <View
            style={{
              backgroundColor: "#ececec22",
              width: 300,
              height: 500,
              borderRadius: 8,
              padding: 16,
              justifyContent: "space-around",
              alignContent: "center",
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
            }}
          >
            <Text style={[styles.title, { paddingTop: 30 }]}>
              ورود به حساب کاربری
            </Text>

            <TextInput
              style={styles.input}
              placeholder="شماره موبایل"
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

            {/* Checkbox با متن قابل کلیک جداگانه */}
            <View
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                marginVertical: 10,
                gap: 10,
              }}
            >
              {/* فقط باکس checkbox قابل کلیک */}
              <TouchableOpacity
                onPress={() => setIsAccepted(!isAccepted)}
                activeOpacity={0.7}
              >
                <View
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: "#2196f3",
                    backgroundColor: isAccepted ? "#2196f3" : "transparent",

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isAccepted && (
                    <Text style={{ color: "white", fontSize: 14 }}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>

              {/* متن با لینک قابل کلیک */}
              <View
                style={{
                  flexDirection: "row-reverse",
                  flexWrap: "wrap",
                  paddingBottom: 5,
                }}
              >
                <Text style={{ color: "#333", fontSize: 14 }}>من </Text>
                <TouchableOpacity onPress={() => router.push("/rules")}>
                  <Text
                    style={{
                      color: "#2196f3",
                      fontSize: 14,
                      fontWeight: "500",
                    }}
                  >
                    قوانین و مقررات
                  </Text>
                </TouchableOpacity>
                <Text style={{ color: "#333", fontSize: 14 }}>
                  {" "}
                  را می‌پذیرم
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.loginButton,
                (isLoading || !isAccepted) && {
                  backgroundColor: "#6b6b6b",
                },
                { marginTop: "auto", marginBottom: 8 },
              ]}
              onPress={handleLogin}
              disabled={isLoading || !isAccepted}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>ورود</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
