import React from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";

/* Componnets */
import FullWidthBanner from "@/components/UI/FullWidthBanner";
import PreList from "@/components/UI/PreList";

export default function HomePage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <CustomText marginB={16} center bold variant="h2">
          صفحه اصلی
        </CustomText>
        <FullWidthBanner
          height={120}
          fontSize={40}
          text="Ketabika App"
          textColor="#066959"
          isInner={true}
          url={"about"}
        />

        <PreList
          label="رمانتیک"
          fImage={require("@/assets/images/bookCat/04.png")}
          listItemRatio={0.64}
        />
      </View>
    </ScrollView>
  );
}
