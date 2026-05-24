import FullWidthBanner from "@/components/common/FullWidthBanner";
import React from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";
import { useFontFamily } from "@/hooks/useFonts"; 


export default function HomePage() {
  const { getFontFamily } = useFontFamily(); 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <CustomText style={styles.title}>صفحه اصلی</CustomText>
        <CustomText style={[styles.description]}>
          تست فونت: این متن باید با فونت Vazirmatn نمایش داده شود
        </CustomText>
        <CustomText
          style={[styles.description, { fontFamily: getFontFamily("normal") }]}
        >
          تست فونت: این متن باید با فونت Vazirmatn نمایش داده شود
        </CustomText>
        <FullWidthBanner urlIsInner={true} url={"about"} />
      </View>
    </ScrollView>
  );
}
