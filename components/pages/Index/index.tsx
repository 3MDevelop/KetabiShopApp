// components/pages/Index/index.tsx
import { useEffect, useState } from "react";
import { ScrollView, View, ActivityIndicator } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";
import DynamicRenderer from "@/components/Blocks/DynamicRenderer";

export default function HomePage() {
  const [layoutData, setLayoutData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLayoutData = async () => {
      try {
        const response = await fetch("https://ketabishop.com/api/getstatic/", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `name=getLayout`,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        console.info(result)

        if (result.status === true && result.data) {
          /* console.info("داده‌های layout دریافت شد:", result.data); */
          setLayoutData(result.data);
        } else {
          console.warn("پاسخ API موفقیت‌آمیز نبود:", result);
        }
      } catch (error) {
        console.error("خطا در دریافت layout:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLayoutData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <CustomText>در حال بارگذاری...</CustomText>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {layoutData.length > 0 ? (
          <DynamicRenderer blocks={layoutData} />
        ) : (
          <CustomText center bold>
            sample text
          </CustomText>
        )}
      </View>
    </ScrollView>
  );
}