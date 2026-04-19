// app/contact.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from "./styles";

export default function Contact() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>تماس با ما</Text>
        <Text style={styles.description}>
          اطلاعات تماس اینجا قرار می‌گیرد.
        </Text>
      </View>
    </ScrollView>
  );
}