import React from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";

import FullWidthBanner from "@/components/UI/FullWidthBanner";
import PreList from "@/components/UI/PreList";

export default function HomePage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        
        <FullWidthBanner
          height={100}
          fontSize={35}
          text="Ketabika App"
          textColor="#06443a"
          isInner
          url="about"
          imageSource={require("@/assets/images/fullWidthBanner.jpg")}
        />

        <PreList
          label="رمانتیک"
          fImage={require("@/assets/images/bookCat/04.png")}
          listItemRatio={0.64}
          apiUrl="https://ketabishop.com/api/getlist/"
        />
      </View>
    </ScrollView>
  );
}
