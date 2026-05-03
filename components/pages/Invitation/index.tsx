// app/contact.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from "./styles";

export default function Contact() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>دعوت از دوستان</Text>
        <Text style={styles.description}>
          اطلاعات و آیکونهای دعوت از دوستان اینجا قرار میگیرد.
        </Text>
      </View>
    </ScrollView>
  );
}