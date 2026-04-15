// app/contact.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ContactPage() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});