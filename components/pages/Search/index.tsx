import React from "react";
import { ScrollView, Text, View } from "react-native";
import styles from "./styles";

export default function Search() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>جستجوی کتاب</Text>
        <Text style={styles.description}>
          این صفحه جستجوی است. اطلاعات مربوط به جستجو اینجا قرار می‌گیرد.
        </Text>
      </View>
    </ScrollView>
  );
}
