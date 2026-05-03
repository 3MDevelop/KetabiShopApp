// app/about.tsx
import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./styles";

export default function MyFavorites() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>درباره ما</Text>
        <Text style={styles.description}>ما خوبیم</Text>
        <Text style={styles.description}>ما خیلی خفنیم</Text>
        <Text style={styles.description}>بقیه ....</Text>
      </View>
    </ScrollView>
  );
}
