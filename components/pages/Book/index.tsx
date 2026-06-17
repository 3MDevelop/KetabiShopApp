// app/book/[id].tsx
import { useLanguage } from "@/context/LanguageContext";
import { useTranslate } from "@/hooks/useTranslation";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    TouchableOpacity,
    View
} from "react-native";
import Toast from "react-native-toast-message";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";

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
  exist: string;
}

const stripHtmlTags = (html: string) => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

export default function BookDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [book, setBook] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(false);
  const router = useRouter();
  const { t } = useTranslate();
  const { isRTL } = useLanguage();

  const fetchBookDetails = useCallback(async () => {
    if (!id) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: t("pages.Book.invalidCode"),
        position: "top",
        topOffset: 20,
        visibilityTime: 2000,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://ketabishop.com/api/getproduct/", {
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

  const addToCart = () => {
    Toast.show({
      type: "success",
      text1: t("common.cart.added"),
      text2: `${book?.title} ${t("common.cart.addedToCart")}`,
      position: "top",
      topOffset: 20,
      visibilityTime: 2000,
    });
  };

  const toggleWishlist = () => {
    setWishlist(!wishlist);
    Toast.show({
      type: "success",
      text1: wishlist ? t("common.removed") : t("common.added"),
      text2: wishlist
        ? `${book?.title} ${t("pages.Book.removedFromWishlist")}`
        : `${book?.title} ${t("pages.Book.addedToWishlist")}`,
      position: "top",
      topOffset: 20,
      visibilityTime: 2000,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <CustomText style={styles.loadingText}>
          {t("common.loadingBook")}
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
        <CustomText style={styles.errorTitle}>{t("book.notFound")}</CustomText>
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

  const hasDiscount = book.discountFa && book.discountFa !== book.price;
  const finalPrice = hasDiscount ? book.discountFa : book.price;
  const isAvailable = book.exist === "1";

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name={isRTL ? "arrow-forward" : "arrow-back"}
              size={24}
              color="#333"
            />
          </TouchableOpacity>
          <CustomText style={styles.headerTitle}>
            {t("pages.Book.details")}
          </CustomText>
          <View style={{ width: 40 }} />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.imageSection}>
          <View style={styles.imageWrapper}>
            {book.pic ? (
              <Image
                source={{ uri: book.pic }}
                style={styles.detailImage}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.detailImage, styles.noImage]}>
                <Ionicons name="book-outline" size={80} color="#ccc" />
              </View>
            )}
            {hasDiscount && (
              <View style={styles.discountBadge}>
                <CustomText style={styles.discountBadgeText}>
                  {book.percentFa}% {t("pages.Book.discount")}
                </CustomText>
              </View>
            )}
          </View>
        </View>

        <View style={styles.titleSection}>
          <CustomText style={styles.bookTitle}>{book.title}</CustomText>
          <View style={styles.authorWrapper}>
            <Ionicons name="person-outline" size={18} color="#999" />
            <CustomText style={styles.bookAuthor}>
              {book.author || t("pages.Book.unknownAuthor")}
            </CustomText>
          </View>
        </View>

        <View style={styles.priceSection}>
          <View style={styles.priceWrapper}>
            {hasDiscount ? (
              <>
                <CustomText style={styles.oldPrice}>
                  {Number(book.price).toLocaleString()} {t("common.cart.currency")}
                </CustomText>
                <CustomText style={styles.finalPrice}>
                  {Number(finalPrice).toLocaleString()} {t("common.cart.currency")}
                </CustomText>
              </>
            ) : (
              <CustomText style={styles.singlePrice}>
                {Number(book.price).toLocaleString()} {t("common.cart.currency")}
              </CustomText>
            )}
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.cartButton, !isAvailable && styles.disabledButton]}
              onPress={addToCart}
              disabled={!isAvailable}
            >
              <Ionicons name="cart-outline" size={22} color="#fff" />
              <CustomText style={styles.cartButtonText}>
                {isAvailable ? t("pages.Book.addToCart") : t("pages.Book.outOfStock")}
              </CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.wishlistButton, wishlist && styles.wishlistActive]}
              onPress={toggleWishlist}
            >
              <Ionicons
                name={wishlist ? "heart" : "heart-outline"}
                size={24}
                color={wishlist ? "#f44336" : "#666"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoCard}>
          <CustomText style={styles.cardTitle}>
            {t("pages.Book.specifications")}
          </CustomText>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="book-outline" size={20} color="#4CAF50" />
              </View>
              <View style={styles.infoText}>
                <CustomText style={styles.infoLabel}>
                  {t("pages.Book.publisher")}
                </CustomText>
                <CustomText style={styles.infoValue}>
                  {book.publisher || t("common.unknown")}
                </CustomText>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="barcode-outline" size={20} color="#4CAF50" />
              </View>
              <View style={styles.infoText}>
                <CustomText style={styles.infoLabel}>
                  {t("pages.Book.isbn")}
                </CustomText>
                <CustomText style={styles.infoValue}>
                  {book.isbn || t("common.unknown")}
                </CustomText>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#4CAF50"
                />
              </View>
              <View style={styles.infoText}>
                <CustomText style={styles.infoLabel}>
                  {t("pages.Book.pages")}
                </CustomText>
                <CustomText style={styles.infoValue}>
                  {book.number_pages || t("common.unknown")}{" "}
                  {t("pages.Book.pagesUnit")}
                </CustomText>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="calendar-outline" size={20} color="#4CAF50" />
              </View>
              <View style={styles.infoText}>
                <CustomText style={styles.infoLabel}>
                  {t("pages.Book.year")}
                </CustomText>
                <CustomText style={styles.infoValue}>
                  {book.publish_year || t("common.unknown")}
                </CustomText>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="layers-outline" size={20} color="#4CAF50" />
              </View>
              <View style={styles.infoText}>
                <CustomText style={styles.infoLabel}>
                  {t("pages.Book.category")}
                </CustomText>
                <CustomText style={styles.infoValue}>
                  {book.main_category}{" "}
                  {book.sub_category ? `- ${book.sub_category}` : ""}
                </CustomText>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color={isAvailable ? "#4CAF50" : "#f44336"}
                />
              </View>
              <View style={styles.infoText}>
                <CustomText style={styles.infoLabel}>
                  {t("pages.Book.stock")}
                </CustomText>
                <CustomText
                  style={[
                    styles.infoValue,
                    isAvailable ? styles.inStock : styles.outOfStock,
                  ]}
                >
                  {isAvailable ? t("pages.Book.inStock") : t("pages.Book.outOfStock")}
                </CustomText>
              </View>
            </View>
          </View>
        </View>

        {book.des_fa && (
          <View style={styles.descriptionCard}>
            <CustomText style={styles.cardTitle}>
              📖 {t("pages.Book.description")}
            </CustomText>
            <CustomText style={styles.descriptionText}>
              {stripHtmlTags(book.des_fa)}
            </CustomText>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
