// app/book.tsx
import {
  ActivityIndicator,
  Animated,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { useTranslate } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { API } from "@/constants/api";
import CustomText from "@/components/common/CustomText";
import BookPreList from "@/components/Blocks/BookPreList";
import PageHeader from "@/components/UI/PageHeader";
import BackToTop from "@/components/UI/BackToTop";
import styles from "./styles";
import BookDiscription from "@/components/UI/BookDiscription";
import CommentsCard from "@/components/UI/CommentsCard";
import BookInfoCard from "@/components/UI/BookInfoCard";
import BookImage from "@/components/UI/BookImage";

interface ProvidersData {
  book_size: string;
}

interface BookData {
  id: string;
  title: string;
  author: string;
  publisher: string;
  price: string;
  discountFa: string;
  percentFa: string;
  pic: string;
  pics?: string[];
  isbn: string;
  number_pages: string;
  edition_number: string;
  des_fa: string;
  main_category: string;
  sub_category: string;
  publish_year: string;
  publish_year_fa: string;
  exist: string;
  size: string;
  providers: ProvidersData[];
  publisherbooklist: BookData[];
  authorbooklist: BookData[];
  relatedbooklist: BookData[];
}

export default function Book() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [book, setBook] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { t } = useTranslate();
  const { isRTL } = useLanguage();
  const scrollRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [hasCommented, setHasCommented] = useState(false);
  const commentsY = useRef(0);
  const authorListY = useRef(0);
  const publisherListY = useRef(0);

  const scrollToY = useCallback((y: number) => {
    scrollRef.current?.scrollTo({
      y: Math.max(0, y - 12),
      animated: true,
    });
  }, []);

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  // دریافت اطلاعات کتاب
  const fetchBookDetails = useCallback(async () => {
    if (!id) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: t("common.common.error"),
        text2: t("pages.Book.invalidCode"),
        position: "top",
        topOffset: 20,
        visibilityTime: 2000,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API.getProduct, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `productid=${encodeURIComponent(id)}`,
      });

      const result = await response.json();

      if (result.status === true && result.data) {
        setBook(result.data);
      }

    } catch (error) {
      console.error("Error fetching book details:", error);
      Toast.show({
        type: "error",
        text1: t("common.common.error"),
        text2: t("common.common.connectionError"),
        position: "top",
        topOffset: 20,
        visibilityTime: 2000,
      });
      router.back();
    } finally {
      setLoading(false);
    }
  }, [id, router, t]);

  useEffect(() => {
    fetchBookDetails();
  }, [fetchBookDetails]);

  useEffect(() => {
    setHasCommented(false);
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <CustomText style={styles.loadingText}>
          {t("pages.BookFinder.loadingBook")}
        </CustomText>
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorIcon}>
          <Ionicons name="book-outline" size={80} color="#ccc" />
        </View>
        <CustomText style={styles.errorTitle}>
          {t("pages.Book.notFound")}
        </CustomText>
        <CustomText style={styles.errorText}>
          {t("pages.Book.notFoundDesc")}
        </CustomText>
        <TouchableOpacity
          style={styles.errorBackButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name={isRTL ? "arrow-forward" : "arrow-back"}
            size={20}
            color="white"
          />
          <CustomText style={styles.errorBackText}>
            {t("common.common.back")}
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PageHeader title={book.title} />

      <Animated.ScrollView
        ref={scrollRef as any}
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.content}>
          {/* book image section */}
          <BookImage
            url={book.pic}
            urls={book.pics}
            hasDiscount={book.discountFa}
            percent={book.percentFa}
          />

          {/* book info cards */}
          <BookInfoCard
            book={book}
            hasCommented={hasCommented}
            onCommentPress={() => scrollToY(commentsY.current)}
            onAuthorPress={
              book.authorbooklist?.length > 0
                ? () => scrollToY(authorListY.current)
                : undefined
            }
            onPublisherPress={
              book.publisherbooklist?.length > 0
                ? () => scrollToY(publisherListY.current)
                : undefined
            }
          />

          {/* book description */}
          {book.des_fa && <BookDiscription desText={book.des_fa} />}

          {/* from this publisher */}
          {book?.publisherbooklist?.length > 0 && (
            <View
              style={{ marginTop: 20, width: "100%" }}
              onLayout={(event) => {
                publisherListY.current = event.nativeEvent.layout.y;
              }}
            >
              <BookPreList
                label={t("pages.Book.samePublisher")}
                listId={"listID"}
                listHeight={350}
                listItemRatio={0.6}
                noMore={false}
                backColor={""}
                noBack={false}
                bookList={book?.publisherbooklist}
              />
            </View>
          )}

          {/* from this auther */}
          {book?.authorbooklist?.length > 0 && (
            <View
              style={{ marginTop: 20, width: "100%" }}
              onLayout={(event) => {
                authorListY.current = event.nativeEvent.layout.y;
              }}
            >
              <BookPreList
                label={t("pages.Book.sameAuther")}
                listId={"listID"}
                listHeight={350}
                listItemRatio={0.6}
                noMore={false}
                backColor={""}
                noBack={false}
                bookList={book?.authorbooklist}
              />
            </View>
          )}

          {/* related book list */}
          {book?.relatedbooklist?.length > 0 && <View style={{ marginTop: 20, width: "100%" }}>
            <BookPreList
              label={t("pages.Book.relatedBooks")}
              listId={"listID"}
              listHeight={350}
              listItemRatio={0.6}
              noMore={false}
              backColor={""}
              noBack={false}
              bookList={book?.relatedbooklist}
            />
          </View>}

          <View
            style={{ width: "100%" }}
            onLayout={(event) => {
              commentsY.current = event.nativeEvent.layout.y;
            }}
          >
            <CommentsCard
              productID={book.id}
              onHasCommentedChange={setHasCommented}
            />
          </View>
        </View>
      </Animated.ScrollView>
      <BackToTop scrollY={scrollY} onPress={scrollToTop} />
    </View>
  );
}
