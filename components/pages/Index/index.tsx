import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import FullWidthBanner from "@/components/common/FullWidthBanner";
import { useRouter } from "expo-router";

export default function HomePage() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <FullWidthBanner urlIsInner={true} url={"about"} />
        <Text style={styles.title}>صفحه اصلی</Text>
        <Text style={styles.description}>
          این محتوای صفحه اصلی است که در mainContainer نمایش داده می‌شود.
        </Text>
      </View>

      <TouchableOpacity
        style={{
          margin: "auto",
          padding: 10,
          paddingHorizontal: 40,
          backgroundColor: "#007AFF",
          borderRadius: 8,
        }}
        onPress={() =>
          router.push({
            pathname: "/book",
            params: { id: 321321, p: 12 },
          })
        }
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          کتاب 12345 را باز کن
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
