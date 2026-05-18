// book finder - نسخه نهایی
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
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
}

export default function BookFinder() {
  const [bookCode, setBookCode] = useState<string>("");
  const [bookInfo, setBookInfo] = useState<BookInfo | null>(null);
  const [qrInType, setQrInType] = useState(false);

  const router = useRouter();

  const QRListerner = (QRPass: string) => {
    setQrInType(false);
    setBookCode(QRPass);
    findBookWithCode(QRPass);
  };

  const handleToggleMode = () => {
    setQrInType(!qrInType);
    setBookInfo(null);
    setBookCode("");
  };

  const findBookWithCode = (code: string) => {
    if (!code.trim()) {
      Toast.show({
        type: "error",
        text1: "لطفاً کد کتاب را وارد کنید",
        position: "top",
        topOffset: 20,
        visibilityTime: 1500,
      });
      setBookInfo(null);
      return;
    }

    setBookInfo({
      title: "نمونه کتاب",
      code: code,
      author: "نویسنده نمونه",
    });
  };

  const handleFindBook = () => {
    findBookWithCode(bookCode);
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
            >
              <Text style={styles.buttonText}>یافتن کتاب</Text>
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

        {bookInfo && (
          <View style={styles.bookInfoContainer}>
            <Text style={styles.bookInfoTitle}>اطلاعات کتاب:</Text>
            <Text style={styles.bookInfoText}>عنوان: {bookInfo.title}</Text>
            <Text style={styles.bookInfoText}>کد: {bookInfo.code}</Text>
            <Text style={styles.bookInfoText}>نویسنده: {bookInfo.author}</Text>
            <TouchableOpacity
              style={styles.bookPageBtn}
              onPress={() =>
                router.push({
                  pathname: "/book",
                  params: { id: bookCode },
                })
              }
            >
              <Text style={styles.buttonText}>مشاهده کتاب</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
