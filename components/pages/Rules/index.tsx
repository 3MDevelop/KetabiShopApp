// app/about.tsx
import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./styles";

export default function Rules() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>قوانین سایت</Text>
        <Text style={styles.description}>همه جا باید داد بزنین که ما خوبیم و بیاین سایت ما ثبت نام کنین</Text>
      </View>
    </ScrollView>
  );
}
