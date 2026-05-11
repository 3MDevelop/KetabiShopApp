// components/pages/User/index.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import LogoutBtn from "@/components/UI/LogoutBtn";
import UpdateUserDataBtn from "@/components/UI/UpdateUserDataBtn";
import UserAvatar from "@/components/UI/userAvatar";

const { width } = Dimensions.get("window");
const isMobile = width < 768;

export default function User() {
  const { user, isLoggedIn } = useAuth();

  // وضعیت ویرایش فیلدها
  const [nickname, setNickname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // مقادیر اولیه
  const [initialNickname, setInitialNickname] = useState("");
  const [initialFirstName, setInitialFirstName] = useState("");
  const [initialLastName, setInitialLastName] = useState("");
  const [initialEmail, setInitialEmail] = useState("");
  const [initialAvatar, setInitialAvatar] = useState("");

  // بارگذاری اطلاعات کاربر
  useEffect(() => {
    if (user) {
      setNickname(user?.nName || "");
      setFirstName(user?.name || "");
      setLastName(user?.lName || "");
      setEmail(user?.email || "");
      setAvatar(user?.avatar?.toString() || "");

      setInitialNickname(user?.nName || "");
      setInitialFirstName(user?.name || "");
      setInitialLastName(user?.lName || "");
      setInitialEmail(user?.email || "");
      setInitialAvatar(user?.avatar?.toString() || "");
    }
  }, [user]);

  // بررسی تغییرات
  useEffect(() => {
    const hasAnyChange =
      nickname !== initialNickname ||
      firstName !== initialFirstName ||
      lastName !== initialLastName ||
      email !== initialEmail ||
      avatar !== initialAvatar;

    setHasChanges(hasAnyChange);
  }, [
    nickname,
    firstName,
    lastName,
    email,
    avatar,
    initialNickname,
    initialFirstName,
    initialLastName,
    initialEmail,
    initialAvatar,
  ]);

  const handleUpdateProfile = async () => {
    console.info("user updated");
    if (!hasChanges) return;

    setIsUpdating(true);
    /*try {
      await updateUser({
        nName: nickname,
        name: firstName,
        lName: lastName,
        email: email,
        avatar: avatar ? parseInt(avatar) : 0,
      });
      
      setInitialNickname(nickname);
      setInitialFirstName(firstName);
      setInitialLastName(lastName);
      setInitialEmail(email);
      setInitialAvatar(avatar);
      
      Alert.alert("موفق", "اطلاعات شما با موفقیت بروزرسانی شد");
    } catch (error) {
      Alert.alert("خطا", "مشکلی در بروزرسانی اطلاعات رخ داد");
    } finally {
      setIsUpdating(false);
    } */
  };

  if (!isLoggedIn) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.emptyStateContainer}>
            <Ionicons name="person-circle-outline" size={80} color="#ccc" />
            <Text style={styles.emptyStateTitle}>پروفایل کاربری</Text>
            <Text style={styles.emptyStateText}>
              شما وارد حساب خود نشده‌اید.
            </Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.push("/login")}
            >
              <Text style={styles.loginButtonText}>ورود به حساب</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* بخش اول: آواتار + نام مستعار + نام و نام خانوادگی */}
        <View
          style={isMobile ? styles.mobileTopSection : styles.desktopTopSection}
        >
          {/* آواتار */}
          <View
            style={
              isMobile
                ? [styles.mobileAvatarWrapper,{marginRight:30}]
                : [styles.desktopAvatarWrapper,{marginRight:30}]
            }
          >
            <UserAvatar iconWidth={isMobile ? 100 : 150} />
          </View>

          {/* فیلدهای کنار آواتار */}
          <View style={styles.topFieldsContainer}>
            <View style={styles.topFieldRow}>
              <View style={styles.topFieldIcon}>
                <Ionicons name="star-outline" size={20} color="#007AFF" />
              </View>
              <View style={styles.topFieldContent}>
                <Text style={styles.topFieldLabel}>نام مستعار</Text>
                <TextInput
                  style={styles.topInput}
                  value={nickname}
                  onChangeText={setNickname}
                  placeholder="نام مستعار"
                  placeholderTextColor="#ccc"
                />
              </View>
            </View>

            <View style={styles.nameRow}>
              <View style={styles.nameField}>
                <View style={styles.topFieldIcon}>
                  <Ionicons name="person-outline" size={20} color="#007AFF" />
                </View>
                <View style={styles.topFieldContent}>
                  <Text style={styles.topFieldLabel}>نام</Text>
                  <TextInput
                    style={styles.topInput}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="نام"
                    placeholderTextColor="#ccc"
                  />
                </View>
              </View>
            </View>

            <View style={styles.nameRow}>
              <View style={styles.nameField}>
                <View style={styles.topFieldIcon}>
                  <Ionicons name="people-outline" size={20} color="#007AFF" />
                </View>
                <View style={styles.topFieldContent}>
                  <Text style={styles.topFieldLabel}>نام خانوادگی</Text>
                  <TextInput
                    style={styles.topInput}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="نام خانوادگی"
                    placeholderTextColor="#ccc"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* بخش دوم: سایر فیلدها */}
        <View style={styles.infoCard}>
          {/* ایمیل */}
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="mail-outline" size={22} color="#007AFF" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>ایمیل</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="ایمیل خود را وارد کنید"
                placeholderTextColor="#ccc"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* شماره موبایل (فقط نمایشی) */}
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="call-outline" size={22} color="#007AFF" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>شماره موبایل</Text>
              <Text style={styles.readonlyText}>{user?.phone}</Text>
            </View>
          </View>

          {/* کد آواتار (مخفی - می‌توانید نمایش دهید یا خیر) */}
          {/* <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="image-outline" size={22} color="#007AFF" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>کد آواتار</Text>
              <TextInput
                style={styles.input}
                value={avatar}
                onChangeText={setAvatar}
                placeholder="کد آواتار"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
              />
            </View>
          </View> */}
        </View>

        {/* دکمه‌ها */}
        <View style={styles.buttonContainer}>
          <UpdateUserDataBtn
            hasChanges={hasChanges}
            onPress={handleUpdateProfile}
            isLoading={isUpdating}
          />
          <LogoutBtn targetURL="./" />
        </View>
      </View>
    </ScrollView>
  );
}
