// app/contact.tsx
import React from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";

export default function Contact() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <CustomText style={styles.title}>دعوت از دوستان</CustomText>
        <CustomText style={styles.description}>
          اطلاعات و آیکونهای دعوت از دوستان اینجا قرار میگیرد.
        </CustomText>
      </View>
    </ScrollView>
  );
}
