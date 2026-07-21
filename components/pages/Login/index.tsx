// components/pages/login/index.tsx

import { User } from "@/context/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslate } from "@/hooks/useTranslation";
import Toast from "react-native-toast-message";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";

type ToastType = "success" | "error" | "info" | "warning";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [isLoadingCode, setIsLoadingCode] = useState(false);
  const { isLoggedIn, isLoading, login } = useAuth();
  const { theme } = useTheme();
  const { isRTL } = useLanguage();
  const { t } = useTranslate();

  const showToast = useCallback(
    (type: ToastType, message: string, description?: string) => {
      Toast.show({
        type: type,
        text1: message,
        text2:
          description ||
          (type === "success"
            ? t("pages.Login.messages.success")
            : t("pages.Login.messages.tryAgain")),
        position: "top",
        topOffset: 20,
        visibilityTime: 3000,
      });
    },
    [t],
  );

  const getAuthCode = useCallback(async () => {
    const phoneRegex = /^09[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      showToast(
        "error",
        t("pages.Login.auth.invalidPhone"),
        t("pages.Login.auth.phoneFormatHint"),
      );
      return;
    }

    if (!isAccepted) {
      showToast(
        "error",
        t("pages.Login.auth.acceptRulesError"),
        t("pages.Login.auth.acceptRulesHint"),
      );
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
        showToast(
          "success",
          t("pages.Login.auth.codeSent"),
          result.meta_data.content,
        );
        setShowCodeInput(true);
      } else {
        showToast(
          "error",
          t("common.error"),
          result.message || t("pages.Login.auth.codeSendError"),
        );
      }
    } catch {
      showToast(
        "error",
        t("pages.Login.common.error"),
        t("pages.Login.common.connectionError"),
      );
    } finally {
      setIsLoadingCode(false);
    }
  }, [phone, isAccepted, showToast, t]);

  const verifyCode = useCallback(async () => {
    if (!authCode || authCode.length !== 5) {
      showToast(
        "error",
        t("pages.Login.auth.invalidCode"),
        t("pages.Login.auth.codeLengthHint"),
      );
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
          }
        } catch {}

        let userDataFromApi: any = null;

        try {
          const apiResponse = await fetch(
            "https://ketabishop.com/api/getstatic/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: `name=getUserInfo`,
            },
          );
          if (!apiResponse.ok) {
            throw new Error(`HTTP error! status: ${apiResponse.status}`);
          }

          const apiResult = await apiResponse.json();

          if (apiResult.status === true && apiResult.data) {
            userDataFromApi = apiResult.data;
            /* console.info("اطلاعات کاربر از API:", userDataFromApi); */
          } else {
            console.warn("پاسخ API موفقیت‌آمیز نبود:", apiResult);
          }
        } catch (error) {
          console.error("خطا در دریافت اطلاعات کاربر:", error);
        }

        const userData: User = {
          ID: userId,
          token: userDataFromServer.token,
          refresh_token: userDataFromServer.refresh_token,
          expire_refresh_token: userDataFromServer.expire_refresh_token,
          expire_token: userDataFromServer.expire_token,
          key: userDataFromServer.key || "Bearer",
          phone: phone,
          name: userDataFromApi?.name || "کاربر",
          nName: userDataFromApi?.nName || "",
          lName: userDataFromApi?.lName || "",
          avatar: userDataFromApi?.avatar || 3,
          email: userDataFromApi?.email || "",
          bankCard: userDataFromApi?.bankCard,
          bankShaba: userDataFromApi?.bankShaba,
          device_List: userDataFromApi?.device_List || [],
          interests: userDataFromApi?.interests || [],
          readList: userDataFromApi?.readList || [],
          likedList: userDataFromApi?.likedList || [],
          commentList: userDataFromApi?.commentList || [],
          paymentList: userDataFromApi?.paymentList || [],
          basket: userDataFromApi?.basket || [],
          addresses: userDataFromApi?.addresses || [],
        };

        showToast(
          "success",
          t("pages.Login.common.success"),
          t("pages.Login.auth.loginSuccess"),
        );
        await login(userData);
        router.back();
      } else {
        showToast(
          "error",
          t("common.error"),
          result.message ||
            result.meta_data?.message ||
            t("pages.Login.auth.invalidCode"),
        );
        setAuthCode("");
      }
    } catch {
      showToast(
        "error",
        t("pages.Login.common.error"),
        t("pages.Login.common.connectionError"),
      );
    } finally {
      setIsLoadingCode(false);
    }
  }, [authCode, phone, showToast, t, login]);

  useEffect(() => {
    if (Platform.OS === "web" && !showCodeInput) {
      const handleSpaceKey = (event: KeyboardEvent) => {
        const isSpace =
          event.code === "Space" ||
          event.code === "NumpadSpace" ||
          event.key === " " ||
          event.which === 32 ||
          event.keyCode === 32;

        if (isSpace) {
          event.preventDefault();
          setIsAccepted((prev) => !prev);
        }
      };

      window.addEventListener("keydown", handleSpaceKey);
      return () => window.removeEventListener("keydown", handleSpaceKey);
    }
  }, [showCodeInput]);

  useEffect(() => {
    if (Platform.OS === "web") {
      const handleEnterKey = (event: KeyboardEvent) => {
        const isEnter =
          event.code === "Enter" ||
          event.code === "NumpadEnter" ||
          event.key === "Enter" ||
          event.which === 13 ||
          event.keyCode === 13;

        if (isEnter) {
          event.preventDefault();

          if (!showCodeInput) {
            const isButtonEnabled = !isLoadingCode && isAccepted && phone;
            if (isButtonEnabled) {
              getAuthCode();
            }
          } else {
            const isButtonEnabled = !isLoadingCode && authCode;
            if (isButtonEnabled) {
              verifyCode();
            }
          }
        }
      };

      window.addEventListener("keydown", handleEnterKey);
      return () => window.removeEventListener("keydown", handleEnterKey);
    }
  }, [
    showCodeInput,
    isLoadingCode,
    isAccepted,
    phone,
    authCode,
    getAuthCode,
    verifyCode,
  ]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <CustomText style={styles.loadingText}>
          {t("pages.Login.common.loading")}
        </CustomText>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {isLoggedIn ? (
        <View style={styles.container}>
          <View style={styles.cardContainerLoggedIn}>
            <View style={styles.avatarContainerLoggedIn}>
              <Ionicons name="person" size={45} color={theme.colors.primary} />
            </View>
            <CustomText style={styles.welcomeText}>
              {t("pages.Login.auth.alreadyLoggedIn")}
            </CustomText>

            <TouchableOpacity
              onPress={() => router.push("./")}
              style={{ alignSelf: "center" }}
            >
              <View
                style={{
                  backgroundColor: theme.colors.primary,
                  padding: 8,
                  paddingHorizontal: 20,
                  borderRadius: 4,
                }}
              >
                <CustomText bold style={{ color: "white", fontSize: 12 }}>
                  {t("pages.Login.common.backToHome")}
                </CustomText>
              </View>
            </TouchableOpacity>
            {(() => {
              router.back();
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
              onPress={() => router.back()}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Ionicons
                name={isRTL ? "arrow-forward" : "arrow-back"}
                size={18}
                color={"#6b6b6b"}
              />
            </TouchableOpacity>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={45} color={"#6b6b6b"} />
            </View>
            <CustomText style={styles.titleWithMargin}>
              {!showCodeInput
                ? t("pages.Login.auth.login")
                : t("pages.Login.auth.verifyCode")}
            </CustomText>

            {!showCodeInput && (
              <TextInput
                style={[styles.input, { textAlign: isRTL ? "right" : "left" }]}
                placeholder={t("pages.Login.auth.phonePlaceholder")}
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
                  style={[
                    styles.input,
                    { textAlign: isRTL ? "right" : "left" },
                  ]}
                  placeholder={t("pages.Login.auth.codePlaceholder")}
                  placeholderTextColor="#999"
                  value={authCode}
                  onChangeText={setAuthCode}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  maxLength={5}
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
                    {isAccepted && (
                      <CustomText style={styles.checkboxText}>✓</CustomText>
                    )}
                  </View>
                </TouchableOpacity>

                <View
                  style={[
                    styles.rulesContainer,
                    {
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  ]}
                >
                  {isRTL ? (
                    <>
                      <CustomText style={styles.rulesText}>
                        {t("pages.Login.auth.acceptRulesStart")}
                      </CustomText>
                      <TouchableOpacity onPress={() => router.push("/rules")}>
                        <CustomText style={styles.rulesLink}>
                          {t("pages.Login.auth.rules")}
                        </CustomText>
                      </TouchableOpacity>
                      <CustomText style={styles.rulesText}>
                        {t("pages.Login.auth.acceptRulesEnd")}
                      </CustomText>
                    </>
                  ) : (
                    <>
                      <CustomText style={styles.rulesText}>
                        {t("pages.Login.auth.acceptRulesStart")}
                      </CustomText>
                      <TouchableOpacity onPress={() => router.push("/rules")}>
                        <CustomText style={styles.rulesLink}>
                          {t("pages.Login.auth.rules")}
                        </CustomText>
                      </TouchableOpacity>
                    </>
                  )}
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
                <CustomText style={styles.buttonText}>
                  {!showCodeInput
                    ? t("pages.Login.auth.getCode")
                    : t("pages.Login.auth.login")}
                </CustomText>
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
                <CustomText style={styles.backButtonText}>
                  {isRTL ? "← " : "→ "}
                  {t("pages.Login.auth.editPhone")}
                </CustomText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
}
