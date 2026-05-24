import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";

export default function MyComments() {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return (
      <View style={styles.notLoggedInContainer}>
        <Ionicons name="chatbubble-outline" size={80} color="#ccc" />
        <CustomText style={styles.notLoggedInTitle}>
          ⛔ دسترسی غیرمجاز
        </CustomText>
        <CustomText style={styles.notLoggedInText}>
          برای مشاهده نظرات خود، ابتدا وارد حساب کاربری شوید
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

  const commentsList = user?.commentList || [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* هدر */}
        <View style={styles.header}>
          <Ionicons name="chatbubbles-outline" size={28} color="#007AFF" />
          <CustomText style={styles.title}>نظرات من</CustomText>
          <View style={styles.badge}>
            <CustomText style={styles.badgeText}>
              {commentsList.length}
            </CustomText>
          </View>
        </View>

        {/* لیست نظرات */}
        {commentsList.length > 0 ? (
          <View style={styles.commentsListContainer}>
            <CustomText style={styles.sectionTitle}>
              📝 نظرات ثبت شده شما
            </CustomText>
            {commentsList.map((comment, index) => (
              <View key={comment.id || index} style={styles.commentCard}>
                <View style={styles.commentHeader}>
                  <View style={styles.commentIcon}>
                    <Ionicons name="book-outline" size={20} color="#007AFF" />
                  </View>
                  <CustomText style={styles.bookTitle}>
                    کتاب {comment.bookId || index + 1}
                  </CustomText>
                  <CustomText style={styles.commentDate}>
                    {comment.createdAt ||
                      new Date().toLocaleDateString("fa-IR")}
                  </CustomText>
                </View>
                <CustomText style={styles.commentText}>
                  {comment.comment || "نظر شما"}
                </CustomText>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyListContainer}>
            <Ionicons
              name="chatbox-ellipses-outline"
              size={60}
              color="#007AFF"
            />
            <CustomText style={styles.emptyListTitle}>
              📭 هنوز نظری ثبت نکرده‌اید
            </CustomText>
            <CustomText style={styles.emptyListText}>
              تا حالا هیچ نظری ثبت نکرده اید.
              {"\n"}
              بیا در مورد کتاب‌هایی که خوانده‌ای نظر بده!
            </CustomText>

            <TouchableOpacity
              style={styles.goToLibraryButton}
              onPress={() => router.push("/myLibrary")}
            >
              <Ionicons name="arrow-back" size={18} color="#fff" />
              <CustomText style={styles.goToLibraryButtonText}>
                برو به کتابخانه من
              </CustomText>
              <Ionicons name="library-outline" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.suggestionButton}
              onPress={() => router.push("/offers")}
            >
              <CustomText style={styles.suggestionButtonText}>
                مشاهده کتاب‌های پیشنهادی
              </CustomText>
              <Ionicons name="heart-outline" size={18} color="#007AFF" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
