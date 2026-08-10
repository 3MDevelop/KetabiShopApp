// components/pages/Index/index.tsx
import { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";
import DynamicRenderer from "@/components/Blocks/DynamicRenderer";
import { API } from "@/constants/api";

export default function HomePage() {
  const [layoutData, setLayoutData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLayoutData = async () => {
      try {
        const response = await fetch(API.getstatic, {
          /* const response = await fetch(API.getHome, { */
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

        if (result.status === true && result.data) {
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
            height: 250,
            gap: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              height: "100%",
              overflow: "hidden",
              borderRadius: 8,
            }}
          >
            <ImageBackground
              source={{ uri: "https://ketabika.ir//files/images/slide/14.jpg" }}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View
            style={{
              flex: 1,
              height: "100%",
              overflow: "hidden",
              borderRadius: 8,
            }}
          >
            <ImageBackground
              source={{ uri: "https://ketabika.ir//files/images/slide/15.jpg" }}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View
            style={{
              flex: 1,
              height: "100%",
              overflow: "hidden",
              borderRadius: 8,
            }}
          >
            <ImageBackground
              source={{ uri: "https://ketabika.ir//files/images/slide/16.jpg" }}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View
            style={{
              flex: 1,
              height: "100%",
              overflow: "hidden",
              borderRadius: 8,
            }}
          >
            <ImageBackground
              source={{ uri: "https://ketabika.ir//files/images/slide/17.png" }}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        </View>
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
