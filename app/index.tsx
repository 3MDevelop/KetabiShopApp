// app/index.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FullWidthBanner from '@/components/common/FullWidthBanner'

export default function HomePage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <FullWidthBanner urlIsInner={true} url={'about'} />
        <Text style={styles.title}>صفحه اصلی</Text>
        <Text style={styles.description}>
          این محتوای صفحه اصلی است که در mainContainer نمایش داده می‌شود.
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