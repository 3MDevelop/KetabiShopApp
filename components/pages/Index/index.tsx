import React from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";

import layoutData from "@/assets/data/index.json";
import FullWidthBanner from "@/components/Blocks/FullWidthBanner";


export default function HomePage() {
  
  
  console.info(layoutData)



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

        


      </View>
    </ScrollView>
  );
}
