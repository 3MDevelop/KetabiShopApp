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

// تابع حذف تگ‌های HTML
const stripHtmlTags = (html: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
};

export default function BookDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [book, setBook] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);
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
      router.back();
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
      } else {
        Toast.show({
          type: "error",
          text1: "خطا",
          text2: "اطلاعات کتاب یافت نشد",
          position: "top",
          topOffset: 20,
          visibilityTime: 2000,
        });
        router.back();
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
        <Ionicons name="alert-circle-outline" size={64} color="#f44336" />
        <Text style={styles.errorText}>کتابی یافت نشد</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.buttonText}>بازگشت</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* دکمه بازگشت */}
        <TouchableOpacity style={styles.backButtonTop} onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={24} color="#333" />
          <Text style={styles.backText}>بازگشت</Text>
        </TouchableOpacity>

        {/* عنوان کتاب */}
        <Text style={styles.bookTitle}>{book.title}</Text>

        {/* تصویر کتاب */}
        <View style={styles.imageContainer}>
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
        </View>

        {/* اطلاعات اصلی */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={20} color="#666" />
            <Text style={styles.infoLabel}>نویسنده:</Text>
            <Text style={styles.infoValue}>{book.author || "نامشخص"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="business-outline" size={20} color="#666" />
            <Text style={styles.infoLabel}>ناشر:</Text>
            <Text style={styles.infoValue}>{book.publisher || "نامشخص"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="pricetag-outline" size={20} color="#666" />
            <Text style={styles.infoLabel}>قیمت:</Text>
            <Text style={styles.infoValue}>{book.price || "نامشخص"} تومان</Text>
          </View>

          {book.discountFa && (
            <View style={styles.infoRow}>
              <Ionicons name="pricetag-outline" size={20} color="#4CAF50" />
              <Text style={styles.infoLabel}>قیمت با تخفیف:</Text>
              <Text style={[styles.infoValue, styles.discountPrice]}>
                {book.discountFa} تومان ({book.percentFa}٪ تخفیف)
              </Text>
            </View>
          )}

          <View style={styles.infoRow}>
            <Ionicons name="book-outline" size={20} color="#666" />
            <Text style={styles.infoLabel}>شابک:</Text>
            <Text style={styles.infoValue}>{book.isbn || "نامشخص"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="document-text-outline" size={20} color="#666" />
            <Text style={styles.infoLabel}>تعداد صفحات:</Text>
            <Text style={styles.infoValue}>{book.number_pages || "نامشخص"} صفحه</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color="#666" />
            <Text style={styles.infoLabel}>سال انتشار:</Text>
            <Text style={styles.infoValue}>{book.publish_year || "نامشخص"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="layers-outline" size={20} color="#666" />
            <Text style={styles.infoLabel}>دسته‌بندی:</Text>
            <Text style={styles.infoValue}>
              {book.main_category || ""} {book.sub_category ? `- ${book.sub_category}` : ""}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons 
              name="checkmark-circle-outline" 
              size={20} 
              color={book.exist === "1" ? "#4CAF50" : "#f44336"} 
            />
            <Text style={styles.infoLabel}>موجودی:</Text>
            <Text style={[styles.infoValue, book.exist === "1" ? styles.inStock : styles.outOfStock]}>
              {book.exist === "1" ? "موجود" : "ناموجود"}
            </Text>
          </View>
        </View>

        {/* توضیحات کتاب */}
        {book.des_fa && (
          <View style={styles.descriptionCard}>
            <Text style={styles.sectionTitle}>توضیحات کتاب</Text>
            <Text style={styles.descriptionText}>
              {stripHtmlTags(book.des_fa)}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}