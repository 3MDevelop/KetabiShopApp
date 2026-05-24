import QRScanner from "@/components/UI/QRScanner";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    TouchableOpacity,
    View,TextInput
} from "react-native";
import Toast from "react-native-toast-message";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";

interface BookInfo {
  title: string;
  code: string;
  author: string;
  image: string;
  price?: string;
  publisher?: string;
}

export default function BookFinder() {
  const { code } = useLocalSearchParams<{ code: string }>(); // دریافت پارامتر code از URL
  const [bookCode, setBookCode] = useState<string>("");
  const [bookQRCode, setBookQRCode] = useState<string>("");
  const [bookInfo, setBookInfo] = useState<BookInfo | null>(null);
  const [qrInType, setQrInType] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const addBookToLibrary = () => {
    const isCodeCorrect = parseInt(bookQRCode) === 555;

    if (!isLoggedIn) {
      Toast.show({
        type: "error",
        text1: "نیاز به ورود",
        text2: "لطفاً ابتدا وارد حساب خود شوید",
        position: "top",
        visibilityTime: 2000,
      });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      return;
    }

    if (isCodeCorrect) {
      Toast.show({
        type: "success",
        text1: "افزوده شد",
        text2: "کتاب به کتابخانه شما اضافه شد",
        position: "top",
        visibilityTime: 2000,
      });
      // Add to Library Function
      setTimeout(() => {
        router.push("/myLibrary");
      }, 1000);
    } else {
      Toast.show({
        type: "error",
        text1: "کد وارد شده صحیح نمی باشد",
        text2: "لطفاً مجدداً تلاش کنید",
        position: "top",
        visibilityTime: 2000,
      });
    }
  };
  const fetchBookFromAPI = async (codeToFetch: string) => {
    if (!codeToFetch || codeToFetch.trim() === "") {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://ketabishop.com/api/getproduct/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `productid=${encodeURIComponent(codeToFetch)}`,
      });

      const result = await response.json();

      if (result.status === true && result.data) {
        const bookData = result.data;
        setBookInfo({
          title: bookData.title,
          code: codeToFetch,
          author: bookData.author,
          image: bookData.pic,
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
          text2: `کتابی با کد ${codeToFetch} یافت نشد`,
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

  // بررسی خودکار پارامتر code در هنگام بارگذاری صفحه
  useEffect(() => {
    if (code && !initialLoadDone) {
      setBookCode(code);
      fetchBookFromAPI(code);
      setInitialLoadDone(true);
    }
  }, [code, initialLoadDone]);

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
        <CustomText style={styles.title}>
          یافتن کتاب با استفاده از کد کتاب
        </CustomText>

        {bookInfo && !loading && (
          <View style={{ width: "100%", height: 360 }}>
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
                  <CustomText style={styles.bookInfoTitle}>
                    {bookInfo.title}
                  </CustomText>
                  <CustomText style={styles.bookInfoText}>
                    <CustomText style={styles.boldText}>نویسنده:</CustomText>{" "}
                    {bookInfo.author}
                  </CustomText>
                  {bookInfo.publisher && (
                    <CustomText style={styles.bookInfoText}>
                      <CustomText style={styles.boldText}>ناشر:</CustomText>{" "}
                      {bookInfo.publisher}
                    </CustomText>
                  )}
                  {bookInfo.price && (
                    <CustomText style={styles.bookInfoText}>
                      <CustomText style={styles.boldText}>قیمت:</CustomText>{" "}
                      {bookInfo.price} تومان
                    </CustomText>
                  )}
                  <TouchableOpacity
                    style={styles.bookPageBtn}
                    onPress={() =>
                      router.push({
                        pathname: "/book",
                        params: { id: bookInfo.code },
                      })
                    }
                  >
                    <CustomText style={styles.buttonText}>
                      مشاهده جزئیات کتاب
                    </CustomText>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.addCodeInputWrapper}>
                <TextInput
                  style={styles.addCodeInput}
                  placeholder="را وارد کنید QR کد درج شده در قسمت"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={bookQRCode}
                  onChangeText={setBookQRCode}
                  maxLength={13}
                />
                <TouchableOpacity
                  onPress={addBookToLibrary}
                  style={styles.addCodeButton}
                >
                  <CustomText style={styles.addCodeButtonText}>
                    تایید
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        <View style={{ marginBottom: 16 }}>
          {!qrInType ? (
            <View>
              <CustomText style={styles.label}>کد کتاب:</CustomText>
              <TextInput
                style={styles.input}
                placeholder="کد کتاب را وارد کنید"
                placeholderTextColor="#999"
                value={bookCode}
                onChangeText={setBookCode}
                keyboardType="default"
              />
            </View>
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
                <CustomText style={styles.buttonText}>یافتن کتاب</CustomText>
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
            <CustomText style={styles.loadingText}>در حال جستجو...</CustomText>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
