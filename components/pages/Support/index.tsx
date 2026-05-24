import React from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";

export default function About() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <CustomText style={styles.title}>پشتیبانی</CustomText>
        <CustomText style={styles.description}>
          این صفحه پشتیبانی است. اطلاعات مربوط به شرکت یا برنامه اینجا قرار
          می‌گیرد.
        </CustomText>
      </View>
    </ScrollView>
  );
}
