import { View, ActivityIndicator, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";
import { useState } from "react";
import CustomText from "@/components/common/CustomText";
import { useTheme } from "@/context/ThemeContext";
import styles from "./styles";

export default function Reader() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  // TODO (بعداً): وقتی هر کتاب فایل مخصوص خودشو رو سرور داشت، آدرس رو از
  // روی id بساز، مثلاً: `https://ketabishop.com/static/app/pdf/${id}.pdf`
  // فعلاً همه‌ی /reader?id=... همین فایل نمونه رو نشون می‌ده.
  const pdfUrl = "https://ketabishop.com/static/app/pdf/sample.pdf";

  // WebView اندروید خودش نمی‌تونه PDF رو نمایش بده، پس از Google Docs Viewer
  // رد می‌کنیم. iOS مستقیم و بدون مشکل PDF رو نشون می‌ده.
  const nativeSourceUri =
    Platform.OS === "android"
      ? `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`
      : pdfUrl;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CustomText bold variant="h4">
          EPub Reader
        </CustomText>

        <View style={styles.pdfContainer}>
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          )}

          {Platform.OS === "web" ? (
            // react-native-webview از پلتفرم وب پشتیبانی نمی‌کنه (فقط
            // Android/iOS/Windows/macOS داره)، برای همین رو وب مستقیم از
            // تگ خودِ مرورگر استفاده می‌کنیم که PDF viewer داخلی خودشو داره.
            // @ts-ignore -- تگ HTML خام، فقط رو پلتفرم وب رندر می‌شه
            <iframe
              src={pdfUrl}
              style={{ width: "100%", height: "100%", border: "none" }}
              onLoad={() => setIsLoading(false)}
            />
          ) : (
            <WebView
              source={{ uri: nativeSourceUri }}
              style={styles.webview}
              onLoadEnd={() => setIsLoading(false)}
            />
          )}
        </View>
      </View>
    </View>
  );
}