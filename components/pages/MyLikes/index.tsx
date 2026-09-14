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
  FavoriteBook,
  getFavoriteBooks,
  subscribeFavorites,
} from "@/utils/favorites";

const THUMB_HEIGHT = 300;
const THUMB_RATIO = 0.64;

export default function MyLikes() {
  const { isLoggedIn } = useAuth();
  const { t } = useTranslate();
  const [books, setBooks] = useState<FavoriteBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFavorites = useCallback(async (showSpinner = false) => {
    if (showSpinner) {
      setIsLoading(true);
    }
    try {
      setBooks(await getFavoriteBooks());
    } catch {
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setBooks([]);
      setIsLoading(false);
      return;
    }
    void loadFavorites(true);
    return subscribeFavorites(() => {
      void loadFavorites(false);
    });
  }, [isLoggedIn, loadFavorites]);

  if (!isLoggedIn) {
    return (
      <View style={styles.notLoggedInContainer}>
        <Ionicons name="heart-outline" size={80} color="#ccc" />
        <CustomText style={styles.notLoggedInTitle}>
          {t("pages.MyLikes.title")}
        </CustomText>
        <CustomText style={styles.notLoggedInText}>
          {t("pages.MyLikes.loginRequired")}
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
      <PageHeader title={t("pages.MyLikes.title")} />
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
              <Ionicons name="heart-outline" size={60} color="#FF3B30" />
              <CustomText style={styles.emptyListTitle}>
                {t("pages.MyLikes.emptyTitle")}
              </CustomText>
              <CustomText style={styles.emptyListText}>
                {t("pages.MyLikes.emptyText")}
              </CustomText>
              <TouchableOpacity
                style={styles.goToLibraryButton}
                onPress={() => router.push("/")}
              >
                <CustomText style={styles.goToLibraryButtonText}>
                  {t("pages.MyLikes.discover")}
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
