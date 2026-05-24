import React from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";

export default function About() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <CustomText style={styles.title}>درباره ما</CustomText>
        <CustomText style={styles.description}>ما خوبیم</CustomText>
        <CustomText style={styles.description}>ما خیلی خفنیم</CustomText>
        <CustomText style={styles.description}>بقیه ....</CustomText>
      </View>
    </ScrollView>
  );
}
