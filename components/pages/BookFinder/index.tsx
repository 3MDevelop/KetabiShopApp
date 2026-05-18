// book finder - نسخه نهایی با API
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import QRScanner from "@/components/UI/QRScanner";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

interface BookInfo {
  title: string;
  code: string;
  author: string;
  image: string;
  price?: string;
  publisher?: string;
}

export default function BookFinder() {
  const [bookCode, setBookCode] = useState<string>("");
  const [bookInfo, setBookInfo] = useState<BookInfo | null>(null);
  const [qrInType, setQrInType] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const fetchBookFromAPI = async (code: string) => {
    setLoading(true);
    try {
      const response = await fetch("https://ketabishop.com/api/getproduct/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `productid=${encodeURIComponent(code)}`,
      });

      const result = await response.json();

      if (result.status === true && result.data) {
        const bookData = result.data;
        setBookInfo({
          title: bookData.title || "بدون عنوان",
          code: code,
          author: bookData.author || "نویسنده نامشخص",
          image: bookData.pic || "",
          price: bookData.price,
          publisher: bookData.pub,
        });
        Toast.show({
          type: "success",
          text1: "کتاب یافت شد",
          text2: bookData.title,
          position: "top",
          topOffset: 20,
          visibilityTime: 1500,
        });
      } else {
        setBookInfo(null);
        Toast.show({
          type: "error",
          text1: "خطا",
          text2: "کتابی با این کد یافت نشد",
          position: "top",
          topOffset: 20,
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      setBookInfo(null);
      Toast.show({
        type: "error",
        text1: "خطا در ارتباط با سرور",
        text2: "لطفاً مجدداً تلاش کنید",
        position: "top",
        topOffset: 20,
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const QRListerner = (QRPass: string) => {
    setQrInType(false);
    setBookCode(QRPass);
    fetchBookFromAPI(QRPass);
  };

  const handleToggleMode = () => {
    setQrInType(!qrInType);
    setBookInfo(null);
    setBookCode("");
  };

  const handleFindBook = () => {
    if (!bookCode.trim()) {
      Toast.show({
        type: "error",
        text1: "خطا",
        text2: "لطفاً کد کتاب را وارد کنید",
        position: "top",
        topOffset: 20,
        visibilityTime: 1500,
      });
      setBookInfo(null);
      return;
    }
    fetchBookFromAPI(bookCode);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>یافتن کتاب با استفاده از کد کتاب</Text>

        <View style={{ marginBottom: 16 }}>
          {!qrInType ? (
            <>
              <Text style={styles.label}>کد کتاب:</Text>
              <TextInput
                style={styles.input}
                placeholder="کد کتاب را وارد کنید"
                placeholderTextColor="#999"
                value={bookCode}
                onChangeText={setBookCode}
                keyboardType="default"
              />
            </>
          ) : (
            <QRScanner valListener={QRListerner} />
          )}
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 15,
            justifyContent: "center",
          }}
        >
          {!qrInType ? (
            <TouchableOpacity
              style={styles.findButton}
              onPress={handleFindBook}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>یافتن کتاب</Text>
              )}
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            style={[styles.qrButton, { width: qrInType ? "100%" : undefined }]}
            onPress={handleToggleMode}
          >
            <Ionicons
              name={qrInType ? "pencil-sharp" : "qr-code-sharp"}
              size={25}
              color="white"
            />
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>در حال جستجو...</Text>
          </View>
        )}

        {bookInfo && !loading && (
          <View style={styles.bookInfoContainer}>
            <View style={styles.bookHeader}>
              {bookInfo.image ? (
                <Image
                  source={{ uri: bookInfo.image }}
                  style={styles.bookImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={[styles.bookImage, styles.noImage]}>
                  <Ionicons name="book-outline" size={50} color="#ccc" />
                </View>
              )}
              <View style={styles.bookDetails}>
                <Text style={styles.bookInfoTitle}>{bookInfo.title}</Text>
                <Text style={styles.bookInfoText}>
                  <Text style={styles.boldText}>نویسنده:</Text>{" "}
                  {bookInfo.author}
                </Text>
                {bookInfo.publisher && (
                  <Text style={styles.bookInfoText}>
                    <Text style={styles.boldText}>ناشر:</Text>{" "}
                    {bookInfo.publisher}
                  </Text>
                )}
                {bookInfo.price && (
                  <Text style={styles.bookInfoText}>
                    <Text style={styles.boldText}>قیمت:</Text> {bookInfo.price}{" "}
                    تومان
                  </Text>
                )}
              </View>
            </View>

            <TouchableOpacity
              style={styles.bookPageBtn}
              onPress={() =>
                router.push({
                  pathname: "/book",
                  params: { id: bookInfo.code, title: bookInfo.title },
                })
              }
            >
              <Text style={styles.buttonText}>مشاهده جزئیات کتاب</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
