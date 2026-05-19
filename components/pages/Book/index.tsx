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
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
};

export default function BookDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [book, setBook] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(false);
  const router = useRouter();

  const fetchBookDetails = useCallback(async () => {
    if (!id) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "خطا",
        text2: "کد کتاب معتبر نیست",
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
        text1: "خطا",
        text2: "مشکل در ارتباط با سرور",
        position: "top",
        topOffset: 20,
        visibilityTime: 2000,
      });
      router.back();
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    fetchBookDetails();
  }, [fetchBookDetails]);

  const addToCart = () => {
    Toast.show({
      type: "success",
      text1: "افزوده شد",
      text2: `${book?.title} به سبد خرید اضافه شد`,
      position: "top",
      topOffset: 20,
      visibilityTime: 2000,
    });
  };

  const toggleWishlist = () => {
    setWishlist(!wishlist);
    Toast.show({
      type: "success",
      text1: wishlist ? "حذف شد" : "افزوده شد",
      text2: wishlist
        ? `${book?.title} از لیست علاقه‌مندی‌ها حذف شد`
        : `${book?.title} به لیست علاقه‌مندی‌ها اضافه شد`,
      position: "top",
      topOffset: 20,
      visibilityTime: 2000,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>در حال دریافت اطلاعات کتاب...</Text>
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorIcon}>
          <Ionicons name="book-outline" size={80} color="#ccc" />
        </View>
        <Text style={styles.errorTitle}>کتابی یافت نشد</Text>
        <Text style={styles.errorText}>کتاب مورد نظر موجود نیست یا حذف شده است</Text>
        <TouchableOpacity style={styles.errorBackButton} onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
          <Text style={styles.errorBackText}>بازگشت</Text>
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
      {/* هدر با دکمه بازگشت */}
      <View style={styles.headerContainer}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>جزئیات کتاب</Text>
        <View style={{ width: 40 }} />
      </View>
      </View>

      <View style={styles.content}>
        {/* تصویر کتاب */}
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
                  {book.percentFa}٪ تخفیف
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* عنوان و نویسنده */}
        <View style={styles.titleSection}>
          <Text style={styles.bookTitle}>{book.title}</Text>
          <View style={styles.authorWrapper}>
            <Ionicons name="person-outline" size={18} color="#999" />
            <Text style={styles.bookAuthor}>{book.author || "نویسنده نامشخص"}</Text>
          </View>
        </View>

        {/* قیمت و دکمه‌ها */}
        <View style={styles.priceSection}>
          <View style={styles.priceWrapper}>
            {hasDiscount ? (
              <>
                <Text style={styles.oldPrice}>{Number(book.price).toLocaleString()} تومان</Text>
                <Text style={styles.finalPrice}>{Number(finalPrice).toLocaleString()} تومان</Text>
              </>
            ) : (
              <Text style={styles.singlePrice}>{Number(book.price).toLocaleString()} تومان</Text>
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
                {isAvailable ? "افزودن به سبد خرید" : "ناموجود"}
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

        {/* اطلاعات کتاب */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>مشخصات کتاب</Text>
          
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="book-outline" size={20} color="#4CAF50" />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>ناشر</Text>
                <Text style={styles.infoValue}>{book.publisher || "نامشخص"}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="barcode-outline" size={20} color="#4CAF50" />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>شابک</Text>
                <Text style={styles.infoValue}>{book.isbn || "نامشخص"}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="document-text-outline" size={20} color="#4CAF50" />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>تعداد صفحات</Text>
                <Text style={styles.infoValue}>{book.number_pages || "نامشخص"} صفحه</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="calendar-outline" size={20} color="#4CAF50" />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>سال انتشار</Text>
                <Text style={styles.infoValue}>{book.publish_year || "نامشخص"}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="layers-outline" size={20} color="#4CAF50" />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>دسته‌بندی</Text>
                <Text style={styles.infoValue}>
                  {book.main_category || ""} {book.sub_category ? `- ${book.sub_category}` : ""}
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
                <Text style={styles.infoLabel}>موجودی</Text>
                <Text style={[styles.infoValue, isAvailable ? styles.inStock : styles.outOfStock]}>
                  {isAvailable ? "موجود در انبار" : "ناموجود"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* توضیحات کتاب */}
        {book.des_fa && (
          <View style={styles.descriptionCard}>
            <Text style={styles.cardTitle}>📖 توضیحات کتاب</Text>
            <Text style={styles.descriptionText}>
              {stripHtmlTags(book.des_fa)}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}