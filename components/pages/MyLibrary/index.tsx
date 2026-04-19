// app/index.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from "./styles";

export default function MyLibrary() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>صفحه کتابخانه من </Text>
        <Text style={styles.description}>
          این محتوای صفحه اصلی است که در MyLibrary نمایش داده می‌شود.
        </Text>
      </View>
    </ScrollView>
  );
}