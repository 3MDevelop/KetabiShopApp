// app/index.tsx

import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import LoginBtn from "@/components/UI/LoginBtn";

export default function MyLibrary() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return (
      <View style={styles.notLoggedInContainer}>
        <Ionicons name="book-outline" size={80} color="#ccc" />
        <Text style={styles.notLoggedInText}>
          برای نمایش کتابخانه شخصی، ابتدا باید وارد حساب کاربری خود شوید
        </Text>
        <LoginBtn />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>📚 کتابخانه من</Text>

        {user?.readList && user?.readList.length > 0 ? (
          <View style={styles.readListContainer}>
            <Text style={styles.readListTitle}>لیست خواندنی‌ها:</Text>
            {user?.readList.map((item, index) => (
              <View key={item.id || index} style={styles.readListItem}>
                <Ionicons name="book" size={20} color="#007AFF" />
                <Text style={styles.readListItemText}>
                  {item.title || `کتاب ${index + 1}`}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyListContainer}>
            <View style={styles.emptyIconWrapper}>
              <Ionicons name="book" size={40} color="#007AFF" />
              <View style={styles.emptyIconBadge}>
                <Ionicons name="add" size={16} color="#fff" />
              </View>
            </View>

            <Text style={styles.emptyListTitle}>
              کتابخانه شما در انتظار کتاب‌های جدید است!
            </Text>
            <Text style={styles.emptyListText}>
              با افزودن کتاب به لیست خواندنی‌ها، همیشه مطالعه را در اولویت قرار
              دهید
            </Text>

            <TouchableOpacity
              style={styles.suggestionButton}
              onPress={() =>
                router.push({
                  pathname: "/booklist",
                  params: { q: "list_of_intrested" },
                })
              }
              activeOpacity={0.8}
            >
              <Ionicons name="sparkles" size={20} color="#fff" />
              <Text style={styles.suggestionButtonText}>
                پیشنهادهای ویژه برای شما
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
