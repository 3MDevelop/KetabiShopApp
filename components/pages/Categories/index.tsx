// app/index.tsx
import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./styles";

export default function Categories() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>صفحه دسته بندی</Text>
        <Text style={styles.description}>
          این محتوای صفحه اصلی است که در categories نمایش داده می‌شود.
        </Text>
      </View>
    </ScrollView>
  );
}
