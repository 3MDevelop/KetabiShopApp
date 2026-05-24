import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";

export default function MyLikes() {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return (
      <View style={styles.notLoggedInContainer}>
        <Ionicons name="heart-outline" size={80} color="#ccc" />
        <CustomText style={styles.notLoggedInTitle}>
          ⛔ دسترسی غیرمجاز
        </CustomText>
        <CustomText style={styles.notLoggedInText}>
          برای مشاهده کتاب‌های پسندیده شده، ابتدا وارد حساب کاربری خود شوید
        </CustomText>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/login")}
        >
          <Ionicons name="log-in-outline" size={20} color="#fff" />
          <CustomText style={styles.loginButtonText}>
            ورود به حساب کاربری
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  }

  const likedList = user?.likedList || [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* هدر */}
        <View style={styles.header}>
          <Ionicons name="heart" size={28} color="#FF3B30" />
          <CustomText style={styles.title}>کتابهای پسندیده من</CustomText>
          <View style={styles.badge}>
            <CustomText style={styles.badgeText}>{likedList.length}</CustomText>
          </View>
        </View>

        {/* لیست کتاب‌های پسندیده */}
        {likedList.length > 0 ? (
          <View style={styles.likesListContainer}>
            <CustomText style={styles.sectionTitle}>
              📚 کتاب‌هایی که پسندیده‌اید
            </CustomText>
            {likedList.map((book, index) => (
              <TouchableOpacity
                key={book.id || index}
                style={styles.likeCard}
                onPress={() =>
                  router.push({
                    pathname: "/book",
                    params: { id: book.id.toString() },
                  })
                }
              >
                <View style={styles.likeIcon}>
                  <Ionicons name="heart" size={22} color="#FF3B30" />
                </View>
                <View style={styles.bookInfo}>
                  <CustomText style={styles.bookTitle}>
                    {book.title || `کتاب ${index + 1}`}
                  </CustomText>
                  <CustomText style={styles.bookDate}>
                    افزوده شده در:{" "}
                    {book.addedAt || new Date().toLocaleDateString("fa-IR")}
                  </CustomText>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyListContainer}>
            <Ionicons name="heart-outline" size={60} color="#FF3B30" />
            <CustomText style={styles.emptyListTitle}>
              💔 لیست پسندیده‌ها خالی است
            </CustomText>
            <CustomText style={styles.emptyListText}>
              شما هنوز هیچ کتابی را پسندیده‌اید.
              {"\n"}
              کتاب‌هایی که دوست دارید رو به این لیست اضافه کنید!
            </CustomText>

            <TouchableOpacity
              style={styles.goToLibraryButton}
              onPress={() => router.push("/booklist")}
            >
              <Ionicons name="arrow-back" size={18} color="#fff" />
              <CustomText style={styles.goToLibraryButtonText}>
                کشف کتاب‌های جدید
              </CustomText>
              <Ionicons name="search-outline" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.suggestionButton}
              onPress={() => router.push("/")}
            >
              <CustomText style={styles.suggestionButtonText}>
                برو به کتابخانه من
              </CustomText>
              <Ionicons name="library-outline" size={18} color="#007AFF" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
