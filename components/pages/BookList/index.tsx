import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";

export default function About() {
  const targetList = useLocalSearchParams().q as string;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <CustomText style={styles.title}>نمایش لیست سفارسی</CustomText>
        <CustomText style={styles.description}>
          شما در حال مشاهده لیست سفارشی {targetList} هستید
        </CustomText>
      </View>
    </ScrollView>
  );
}
