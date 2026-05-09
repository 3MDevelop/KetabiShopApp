// components/pages/User/index.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import LogoutBtn from "@/components/UI/LogoutBtn";
import UpdateUserDataBtn from "@/components/UI/UpdateUserDataBtn";

export default function User() {
  const { user, isLoggedIn } = useAuth();

  // وضعیت ویرایش فیلدها
  const [nickname, setNickname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

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
        {/* هدر پروفایل */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrapper}>
            {avatar && parseInt(avatar) > 0 ? (
              <View style={styles.avatarImage}>
                <Text style={styles.avatarText}>
                  {firstName?.charAt(0) ||
                    nickname?.charAt(0) ||
                    user?.phone?.charAt(0) ||
                    "?"}
                </Text>
              </View>
            ) : (
              <Ionicons name="person-circle" size={90} color="#007AFF" />
            )}
          </View>
          <Text style={styles.profilePhone}>{user?.ID}</Text>
        </View>

        {/* فرم اطلاعات کاربری */}
        <View style={styles.infoCard}>
          {/* نام مستعار */}
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="star-outline" size={22} color="#007AFF" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>نام مستعار</Text>
              <TextInput
                style={styles.input}
                value={nickname}
                onChangeText={setNickname}
                placeholder="نام مستعار خود را وارد کنید"
                placeholderTextColor="#ccc"
              />
            </View>
          </View>


          {/* نام و نام خانوادگی در یک ردیف */}
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="person-outline" size={22} color="#007AFF" />
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.halfField}>
                <Text style={styles.infoLabel}>نام</Text>
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="نام"
                  placeholderTextColor="#ccc"
                />
              </View>
              <View style={styles.halfField}>
                <Text style={styles.infoLabel}>نام خانوادگی</Text>
                <TextInput
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="نام خانوادگی"
                  placeholderTextColor="#ccc"
                />
              </View>
            </View>
          </View>


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

          

          {/* آواتار */}
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="image-outline" size={22} color="#007AFF" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>آواتار (کد عددی)</Text>
              <TextInput
                style={styles.input}
                value={avatar}
                onChangeText={setAvatar}
                placeholder="کد آواتار را وارد کنید"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* دکمه‌ها */}
        <View style={styles.buttonContainer}>
          <LogoutBtn targetURL="./" />
          <UpdateUserDataBtn hasChanges = {hasChanges} />
        </View>
      </View>
    </ScrollView>
  );
}
