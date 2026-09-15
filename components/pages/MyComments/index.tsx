import { useAuth } from "@/hooks/useAuth";
import { useTranslate } from "@/hooks/useTranslation";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";
import BookThumb from "@/components/UI/BookThumb";
import PageHeader from "@/components/UI/PageHeader";
import {
  CommentedBook,
  fetchUserCommentedBooks,
} from "@/utils/userComments";

const THUMB_HEIGHT = 300;
const THUMB_RATIO = 0.64;

export default function MyComments() {
  const { isLoggedIn, user } = useAuth();
  const { t } = useTranslate();
  const [books, setBooks] = useState<CommentedBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadComments = useCallback(async () => {
    if (!isLoggedIn || user?.ID == null) {
      setBooks([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      setBooks(await fetchUserCommentedBooks(user.ID));
    } catch {
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn, user?.ID]);

  useEffect(() => {
    void loadComments();
  }, [loadComments]);

  if (!isLoggedIn) {
    return (
      <View style={styles.notLoggedInContainer}>
        <Ionicons name="chatbubble-outline" size={80} color="#ccc" />
        <CustomText style={styles.notLoggedInTitle}>
          {t("pages.MyComments.title")}
        </CustomText>
        <CustomText style={styles.notLoggedInText}>
          {t("pages.MyComments.loginRequired")}
        </CustomText>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/login")}
        >
          <Ionicons name="log-in-outline" size={20} color="#fff" />
          <CustomText style={styles.loginButtonText}>
            {t("common.common.loginBtn")}
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PageHeader title={t("pages.MyComments.title")} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
            </View>
          ) : books.length > 0 ? (
            <View style={styles.booksGrid}>
              {books.map((book) => (
                <View
                  key={book.id}
                  style={[styles.bookItem, { height: THUMB_HEIGHT }]}
                >
                  <BookThumb
                    bookID={Number(book.id)}
                    bookName={book.name}
                    author={book.author}
                    price={book.price}
                    imageUrl={book.image}
                    itemWidth={THUMB_HEIGHT * THUMB_RATIO}
                    percent={book.percent}
                    discount={book.discount}
                    exist={book.exist}
                  />
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
                {t("pages.MyComments.emptyTitle")}
              </CustomText>
              <CustomText style={styles.emptyListText}>
                {t("pages.MyComments.emptyText")}
              </CustomText>
              <TouchableOpacity
                style={styles.goToLibraryButton}
                onPress={() => router.push("/")}
              >
                <CustomText style={styles.goToLibraryButtonText}>
                  {t("pages.MyComments.discover")}
                </CustomText>
                <Ionicons name="search-outline" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
