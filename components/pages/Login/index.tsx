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
import { User } from "@/context/AuthContext";

type ToastType = "success" | "error" | "info" | "warning";

export default function Login() {
  const [phone, setPhone] = useState("");
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

  const getAuthCode = async () => {
    const phoneRegex = /^09[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      showToast("error", "خطا", "شماره موبایل نامعتبر است");
      return;
    }

    if (!isAccepted) {
      showToast("error", "خطا", "لطفاً قوانین و مقررات را بپذیرید");
      return;
    }

    setIsLoadingCode(true);

    try {
      const response = await fetch("https://ketabika.com/v1/otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `phone=${encodeURIComponent(phone)}`,
      });

      const result = await response.json();
      if (response.ok) {
        showToast("success", "کد تایید ارسال شد", result.meta_data.content);
        setShowCodeInput(true);
      } else {
        showToast(
          "error",
          "خطا",
          result.message || "مشکلی در ارسال کد رخ داده است",
        );
      }
    } catch {
      showToast("error", "خطا", "مشکل در ارتباط با سرور");
    } finally {
      setIsLoadingCode(false);
    }
  };

  const verifyCode = async () => {
    if (!authCode || authCode.length !== 5) {
      showToast("error", "خطا", "کد تایید باید ۵ رقم باشد");
      return;
    }

    setIsLoadingCode(true);

    try {
      const response = await fetch("https://ketabika.com/v1/verify/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `phone=${encodeURIComponent(phone)}&code=${encodeURIComponent(authCode)}`,
      });

      const result = await response.json();

      if (response.ok && result.data) {
        const userDataFromServer = result.data;

        let userId = null;
        try {
          const tokenParts = userDataFromServer.token.split(".");
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            userId = payload.user_id || payload.id;
            /* console.log("✅ ID از توکن استخراج شد:", userId); */
          }
        } catch {}

        if (!userId) {
          userId = Date.now();
        }

        const userData: User = {
          ID: userId,
          token: userDataFromServer.token,
          refresh_token: userDataFromServer.refresh_token,
          expire_refresh_token: userDataFromServer.expire_refresh_token,
          expire_token: userDataFromServer.expire_token,
          key: userDataFromServer.key || "Bearer",
          phone: phone,
          name: "Reza",
          nName: "Agha Fazel",
          lName: "Fazel",
          avatar: 3,
          email: "mr.rezafazel@gmail.com",
          bankCard: 0,
          bankShaba: 0,
          device_List: [],
          interests: [],
          readList: [],
          likedList: [],
          commentList: [],
          paymentList: [],
          basket: [],
        };

        console.info("اطلاعات کاربر: " + userData);
        await login(userData);

        showToast("success", "موفق", "ورود با موفقیت انجام شد");

        setTimeout(() => {
          router.replace("/");
        }, 500);
      } else {
        showToast(
          "error",
          "خطا",
          result.message || result.meta_data?.message || "کد تایید نامعتبر است",
        );
        setAuthCode("");
      }
    } catch {
      showToast("error", "خطا", "مشکل در ارتباط با سرور");
    } finally {
      setIsLoadingCode(false);
    }
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
          <View
            style={
              showCodeInput
                ? styles.cardContainerWithCode
                : styles.cardContainer
            }
          >
            <TouchableOpacity
              onPress={() => router.replace("/")}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Ionicons name={"arrow-back"} size={18} color={"#6b6b6b"} />
            </TouchableOpacity>
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
                value={phone}
                onChangeText={setPhone}
                autoCapitalize="none"
                keyboardType="phone-pad"
                editable={!isLoadingCode}
              />
            )}

            {showCodeInput && (
              <View style={styles.codeInputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="کد تایید 5 رقمی"
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
                  <View
                    style={[
                      styles.checkbox,
                      isAccepted && styles.checkboxChecked,
                    ]}
                  >
                    {isAccepted && <Text style={styles.checkboxText}>✓</Text>}
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
                  ? isLoadingCode || !isAccepted || !phone
                  : !authCode) && styles.disabledButton,
                styles.buttonWithMargin,
              ]}
              onPress={!showCodeInput ? getAuthCode : verifyCode}
              disabled={
                !showCodeInput
                  ? isLoadingCode || !isAccepted || !phone
                  : !authCode
              }
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
