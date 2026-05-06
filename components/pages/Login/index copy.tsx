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
import { Ionicons } from "@expo/vector-icons";

type ToastType = "success" | "error" | "info" | "warning";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [isLoadingCode, setIsLoadingCode] = useState(false);
  const { isLoggedIn, isLoading, login } = useAuth();

  

  const showToast = (
    type: ToastType,
    message: string,
    description?: string,
  ) => {
    Toast.show({
      type: type,
      text1: message,
      text2: description || (type === "success" ? "عملیات با موفقیت انجام شد" : "لطفاً مجدداً تلاش کنید"),
      position: "top",
      topOffset: 20,
      visibilityTime: 1500,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2196f3" />
        <Text style={styles.loadingText}>در حال اتصال...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {isLoggedIn ? (
        <View style={styles.container}>
          <View style={styles.cardContainerLoggedIn}>
            <View style={styles.avatarContainerLoggedIn}>
              <Ionicons name="person" size={45} color={"#18abe6"} />
            </View>
            <Text style={styles.welcomeText}>
              شما قبلاً به سیستم وارد شده‌اید
            </Text>
            <Text style={styles.redirectText}>
              در حال انتقال به صفحه اصلی...
            </Text>
            <ActivityIndicator
              style={styles.activityIndicator}
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
        </View>
      ) : (
        <View style={styles.container}>
          <View style={showCodeInput ? styles.cardContainerWithCode : styles.cardContainer}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={45} color={"#6b6b6b"} />
            </View>
            <Text style={styles.titleWithMargin}>
              {!showCodeInput ? "ورود به حساب کاربری" : "تایید کد"}
            </Text>

            {!showCodeInput && (
              <TextInput
                style={styles.input}
                placeholder="شماره موبایل ( 09xxxxxxxxx )"
                placeholderTextColor="#999"
                value={mobile}
                onChangeText={setMobile}
                autoCapitalize="none"
                keyboardType="phone-pad"
                editable={!isLoadingCode}
              />
            )}

            {showCodeInput && (
              <View style={styles.codeInputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="کد تایید ۶ رقمی"
                  placeholderTextColor="#999"
                  value={authCode}
                  onChangeText={setAuthCode}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  maxLength={6}
                  editable={!isLoading}
                />
              </View>
            )}

            {!showCodeInput && (
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  onPress={() => setIsAccepted(!isAccepted)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, isAccepted && styles.checkboxChecked]}>
                    {isAccepted && (
                      <Text style={styles.checkboxText}>✓</Text>
                    )}
                  </View>
                </TouchableOpacity>

                <View style={styles.rulesContainer}>
                  <Text style={styles.rulesText}>من </Text>
                  <TouchableOpacity onPress={() => router.push("/rules")}>
                    <Text style={styles.rulesLink}>قوانین و مقررات</Text>
                  </TouchableOpacity>
                  <Text style={styles.rulesText}> را می‌پذیرم</Text>
                </View>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.loginButton,
                (!showCodeInput 
                  ? (isLoadingCode || !isAccepted || !mobile) 
                  : (!authCode)) && styles.disabledButton,
                styles.buttonWithMargin
              ]}
              onPress={!showCodeInput ? getAuthCode : verifyCode}
              disabled={!showCodeInput 
                ? (isLoadingCode || !isAccepted || !mobile) 
                : (!authCode)}
            >
              {isLoadingCode || isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>
                  {!showCodeInput ? "دریافت کد" : "ورود"}
                </Text>
              )}
            </TouchableOpacity>

            {showCodeInput && (
              <TouchableOpacity
                onPress={() => {
                  setShowCodeInput(false);
                  setAuthCode("");
                }}
                style={styles.backButton}
              >
                <Text style={styles.backButtonText}>← ویرایش شماره موبایل</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
}