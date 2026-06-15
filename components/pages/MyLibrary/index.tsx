// app/index.tsx

import LoginBtn from "@/components/UI/LoginBtn";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";

export default function MyLibrary() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return (
      <View style={styles.notLoggedInContainer}>
        <Ionicons name="book-outline" size={80} color="#ccc" />
        <CustomText style={styles.notLoggedInText}>
          برای نمایش کتابخانه شخصی، ابتدا باید وارد حساب کاربری خود شوید
        </CustomText>
        <LoginBtn />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <CustomText style={styles.title}>📚 کتابخانه من</CustomText>

        {user?.readList && user?.readList.length > 0 ? (
          <View style={styles.readListContainer}>
            <CustomText style={styles.readListTitle}>
              لیست خواندنی‌ها:
            </CustomText>
            {user?.readList.map((item, index) => (
              <View key={item.id || index} style={styles.readListItem}>
                <Ionicons name="book" size={20} color="#007AFF" />
                <CustomText style={styles.readListItemText}>
                  {item.title || `کتاب ${index + 1}`}
                </CustomText>
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

            <CustomText style={styles.emptyListTitle}>
              کتابخانه شما در انتظار کتاب‌های جدید است!
            </CustomText>
            <CustomText style={styles.emptyListText}>
              با افزودن کتاب به لیست خواندنی‌ها، همیشه مطالعه را در اولویت قرار
              دهید
            </CustomText>

            <TouchableOpacity
              style={styles.suggestionButton}
              onPress={() =>
                router.push({
                  pathname: "/list",
                  params: { id: "list_of_intrested" },
                })
              }
              activeOpacity={0.8}
            >
              <Ionicons name="sparkles" size={20} color="#fff" />
              <CustomText style={styles.suggestionButtonText}>
                پیشنهادهای ویژه برای شما
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
