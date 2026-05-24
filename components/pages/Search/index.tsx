import React from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";

export default function Search() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <CustomText style={styles.title}>جستجوی کتاب</CustomText>
        <CustomText style={styles.description}>
          این صفحه جستجوی است. اطلاعات مربوط به جستجو اینجا قرار می‌گیرد.
        </CustomText>
      </View>
    </ScrollView>
  );
}
