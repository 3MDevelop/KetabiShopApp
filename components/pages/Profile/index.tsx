import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from "./styles";

export default function Offers() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>صفحه پیشنهادات</Text>
        <Text style={styles.description}>
          این محتوای صفحه اصلی است که در Offers نمایش داده می‌شود.
        </Text>
      </View>
    </ScrollView>
  );
}

