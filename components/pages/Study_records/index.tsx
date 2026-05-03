// app/about.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from "./styles";

export default function Basket() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>تاریخچه مطالعات</Text>
        <Text style={styles.description}>
          این صفحه تاریخچه مطالعات است. اطلاعات مربوط به تاریخچه مطالعات اینجا قرار می‌گیرد.
        </Text>
      </View>
    </ScrollView>
  );
}