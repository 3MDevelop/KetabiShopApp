import React from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";

export default function Offers() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <CustomText style={styles.title}>صفحه پیشنهادات</CustomText>
        <CustomText style={styles.description}>
          این محتوای صفحه اصلی است که در Offers نمایش داده می‌شود.
        </CustomText>
      </View>
    </ScrollView>
  );
}
