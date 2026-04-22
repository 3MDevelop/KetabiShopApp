// app/about.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from "./styles";

export default function Basket() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>سبد خرید</Text>
        <Text style={styles.description}>
          این صفحه سبد خرید است. اطلاعات مربوط به خرید جاری اینجا قرار می‌گیرد.
        </Text>
      </View>
    </ScrollView>
  );
}