import React from "react";
import { ScrollView, Text, View } from "react-native";
import styles from "./styles";

export default function BookFinder() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>کتاب یاب</Text>
        <Text style={styles.description}>کتاب یاب</Text>
      </View>
    </ScrollView>
  );
}
