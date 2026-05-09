import React from "react";
import { ScrollView, Text, View } from "react-native";
import styles from "./styles";

export default function About() {
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
