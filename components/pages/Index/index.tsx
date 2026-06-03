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
        <CustomText center bold variant="h2">
          صفحه اصلی
        </CustomText>

        <PreList
          label="رمانتیک"
          listHeight={200}
          fImage={require("@/assets/images/bookCat/04.png")}
          listItemRatio={0.64}
        />

        <FullWidthBanner urlIsInner={true} url={"about"} />
      </View>
    </ScrollView>
  );
}
