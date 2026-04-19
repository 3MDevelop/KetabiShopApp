// app/about.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from "./styles";

export default function About() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>درباره ما</Text>
        <Text style={styles.description}>
          این صفحه درباره ما است. اطلاعات مربوط به شرکت یا برنامه اینجا قرار می‌گیرد.
        </Text>
      </View>
    </ScrollView>
  );
}