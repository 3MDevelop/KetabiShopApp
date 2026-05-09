import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import styles from "./styles";

export default function About() {
  const targetList = useLocalSearchParams().q as string;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>نمایش لیست سفارسی</Text>
        <Text style={styles.description}>
          شما در حال مشاهده لیست سفارشی {targetList || "عمومی"} هستید
        </Text>
      </View>
    </ScrollView>
  );
}
