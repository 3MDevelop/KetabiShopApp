import React from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";

export default function MyComments() {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return (
      <View style={styles.notLoggedInContainer}>
        <Ionicons name="chatbubble-outline" size={80} color="#ccc" />
        <Text style={styles.notLoggedInTitle}>⛔ دسترسی غیرمجاز</Text>
        <Text style={styles.notLoggedInText}>
          برای مشاهده نظرات خود، ابتدا وارد حساب کاربری شوید
        </Text>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => router.push("/login")}
        >
          <Ionicons name="log-in-outline" size={20} color="#fff" />
          <Text style={styles.loginButtonText}>ورود به حساب کاربری</Text>
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
          <Text style={styles.title}>نظرات من</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{commentsList.length}</Text>
          </View>
        </View>

        {/* لیست نظرات */}
        {commentsList.length > 0 ? (
          <View style={styles.commentsListContainer}>
            <Text style={styles.sectionTitle}>📝 نظرات ثبت شده شما</Text>
            {commentsList.map((comment, index) => (
              <View key={comment.id || index} style={styles.commentCard}>
                <View style={styles.commentHeader}>
                  <View style={styles.commentIcon}>
                    <Ionicons name="book-outline" size={20} color="#007AFF" />
                  </View>
                  <Text style={styles.bookTitle}>کتاب {comment.bookId || index + 1}</Text>
                  <Text style={styles.commentDate}>
                    {comment.createdAt || new Date().toLocaleDateString('fa-IR')}
                  </Text>
                </View>
                <Text style={styles.commentText}>
                  {comment.comment || "نظر شما"}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyListContainer}>
            <Ionicons name="chatbox-ellipses-outline" size={60} color="#007AFF" />
            <Text style={styles.emptyListTitle}>📭 هنوز نظری ثبت نکرده‌اید</Text>
            <Text style={styles.emptyListText}>
              تا حالا هیچ نظری ثبت نکرده اید. 
              {'\n'}
              بیا در مورد کتاب‌هایی که خوانده‌ای نظر بده!
            </Text>
            
            <TouchableOpacity 
              style={styles.goToLibraryButton}
              onPress={() => router.push("/myLibrary")}
            >
              <Ionicons name="arrow-back" size={18} color="#fff" />
              <Text style={styles.goToLibraryButtonText}>
                برو به کتابخانه من
              </Text>
              <Ionicons name="library-outline" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.suggestionButton}
              onPress={() => router.push("/offers")}
            >
              <Text style={styles.suggestionButtonText}>
                مشاهده کتاب‌های پیشنهادی
              </Text>
              <Ionicons name="heart-outline" size={18} color="#007AFF" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}