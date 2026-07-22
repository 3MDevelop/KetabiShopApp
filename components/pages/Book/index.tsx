// app/book.tsx
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { useTranslate } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { API } from "@/constants/api";
import CustomText from "@/components/common/CustomText";
import BookPreList from "@/components/Blocks/BookPreList";
import PageHeader from "@/components/UI/PageHeader";
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
      const response = await fetch(API.GET_PRODUCT, {
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
        text1: t("common.error"),
        text2: t("common.connectionError"),
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
            color="#fff"
          />
          <CustomText style={styles.errorBackText}>
            {t("common.back")}
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PageHeader title={book.title} />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          
          {/* book image section */}
          <BookImage
            url={book.pic}
            hasDiscount={book.discountFa}
            percent={book.percentFa}
          />

          {/* book info cards */}
          <BookInfoCard book={book} />

          {/* book description */}
          {book.des_fa && <BookDiscription desText={book.des_fa} />}

          {/* from this publisher */}
          <View style={{ marginTop: 20, width: "100%" }}>
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

          {/* from this auther */}
          <View style={{ marginTop: 20, width: "100%" }}>
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

          {/* related book list */}
          <View style={{ marginTop: 20, width: "100%" }}>
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
          </View>

          {/* comments section */}
          <CommentsCard />
        </View>
      </ScrollView>
    </View>
  );
}
