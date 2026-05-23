// app/book/[id].tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslate } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import Toast from "react-native-toast-message";
import styles from "./styles";

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
        text1: t('common.error'),
        text2: t('book.invalidCode'),
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
        text1: t('common.error'),
        text2: t('common.connectionError'),
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
      text1: t('cart.added'),
      text2: `${book?.title} ${t('cart.addedToCart')}`,
      position: "top",
      topOffset: 20,
      visibilityTime: 2000,
    });
  };

  const toggleWishlist = () => {
    setWishlist(!wishlist);
    Toast.show({
      type: "success",
      text1: wishlist ? t('common.removed') : t('common.added'),
      text2: wishlist
        ? `${book?.title} ${t('book.removedFromWishlist')}`
        : `${book?.title} ${t('book.addedToWishlist')}`,
      position: "top",
      topOffset: 20,
      visibilityTime: 2000,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>{t('common.loadingBook')}</Text>
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorIcon}>
          <Ionicons name="book-outline" size={80} color="#ccc" />
        </View>
        <Text style={styles.errorTitle}>{t('book.notFound')}</Text>
        <Text style={styles.errorText}>
          {t('book.notFoundDesc')}
        </Text>
        <TouchableOpacity
          style={styles.errorBackButton}
          onPress={() => router.back()}
        >
          <Ionicons name={isRTL ? "arrow-forward" : "arrow-back"} size={20} color="#fff" />
          <Text style={styles.errorBackText}>{t('common.back')}</Text>
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
            <Ionicons name={isRTL ? "arrow-forward" : "arrow-back"} size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('book.details')}</Text>
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
                <Text style={styles.discountBadgeText}>
                  {book.percentFa}% {t('book.discount')}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.bookTitle}>{book.title}</Text>
          <View style={styles.authorWrapper}>
            <Ionicons name="person-outline" size={18} color="#999" />
            <Text style={styles.bookAuthor}>
              {book.author || t('book.unknownAuthor')}
            </Text>
          </View>
        </View>

        <View style={styles.priceSection}>
          <View style={styles.priceWrapper}>
            {hasDiscount ? (
              <>
                <Text style={styles.oldPrice}>
                  {Number(book.price).toLocaleString()} {t('cart.currency')}
                </Text>
                <Text style={styles.finalPrice}>
                  {Number(finalPrice).toLocaleString()} {t('cart.currency')}
                </Text>
              </>
            ) : (
              <Text style={styles.singlePrice}>
                {Number(book.price).toLocaleString()} {t('cart.currency')}
              </Text>
            )}
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.cartButton, !isAvailable && styles.disabledButton]}
              onPress={addToCart}
              disabled={!isAvailable}
            >
              <Ionicons name="cart-outline" size={22} color="#fff" />
              <Text style={styles.cartButtonText}>
                {isAvailable ? t('book.addToCart') : t('book.outOfStock')}
              </Text>
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
          <Text style={styles.cardTitle}>{t('book.specifications')}</Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="book-outline" size={20} color="#4CAF50" />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>{t('book.publisher')}</Text>
                <Text style={styles.infoValue}>
                  {book.publisher || t('common.unknown')}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="barcode-outline" size={20} color="#4CAF50" />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>{t('book.isbn')}</Text>
                <Text style={styles.infoValue}>{book.isbn || t('common.unknown')}</Text>
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
                <Text style={styles.infoLabel}>{t('book.pages')}</Text>
                <Text style={styles.infoValue}>
                  {book.number_pages || t('common.unknown')} {t('book.pagesUnit')}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="calendar-outline" size={20} color="#4CAF50" />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>{t('book.year')}</Text>
                <Text style={styles.infoValue}>
                  {book.publish_year || t('common.unknown')}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="layers-outline" size={20} color="#4CAF50" />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>{t('book.category')}</Text>
                <Text style={styles.infoValue}>
                  {book.main_category || ""}{" "}
                  {book.sub_category ? `- ${book.sub_category}` : ""}
                </Text>
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
                <Text style={styles.infoLabel}>{t('book.stock')}</Text>
                <Text
                  style={[
                    styles.infoValue,
                    isAvailable ? styles.inStock : styles.outOfStock,
                  ]}
                >
                  {isAvailable ? t('book.inStock') : t('book.outOfStock')}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {book.des_fa && (
          <View style={styles.descriptionCard}>
            <Text style={styles.cardTitle}>📖 {t('book.description')}</Text>
            <Text style={styles.descriptionText}>
              {stripHtmlTags(book.des_fa)}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}