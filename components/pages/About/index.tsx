// app/about.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginHorizontal:'auto',
    width:'100%',
    maxWidth:1000,
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