import React from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";

export default function Rules() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <CustomText style={styles.title}>قوانین سایت</CustomText>
        <CustomText style={styles.description}>
          همه جا باید داد بزنین که ما خوبیم و بیاین سایت ما ثبت نام کنین
        </CustomText>
      </View>
    </ScrollView>
  );
}
