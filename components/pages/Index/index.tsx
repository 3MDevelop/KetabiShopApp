import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./styles";
import FullWidthBanner from "@/components/common/FullWidthBanner";
import Seperator from "@/components/UI/Seperator";

export default function HomePage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>صفحه اصلی</Text>
        <Text style={[styles.description, { marginBottom: 20 }]}>
          این محتوای صفحه اصلی است که در mainContainer نمایش داده می‌شود.
        </Text>
        <FullWidthBanner urlIsInner={true} url={"about"} />
        <Seperator />
        <FullWidthBanner urlIsInner={false} url={"www.google.com"} />
      </View>
    </ScrollView>
  );
}
