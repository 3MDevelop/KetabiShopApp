import { View, Animated, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";

import BackToTop from "@/components/UI/BackToTop";
import FullWidthBanner from "@/components/UI/FullWidthBanner";
import CustomText from "@/components/common/CustomText";

import styles from "./styles";

export default function List() {
  const params  = useLocalSearchParams();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  
  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const paramsList = Object.entries(params).map(([key, value]) => ({
    key,
    value: Array.isArray(value) ? value.join(", ") : String(value)
  }));

  const listID = paramsList[0].key

  

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollViewRef as any}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={true}
        indicatorStyle="black"
        persistentScrollbar={true}
      >
        <View style={styles.content}>
          {listID && (
            <FullWidthBanner
              height={100}
              fontSize={35}
              text={listID}
              textColor="#06443a"
              isInner
              url="about"
              imageSource={require("@/assets/images/fullWidthBanner.jpg")}
            />
          )}
          <CustomText center bold variant="h1" style={{ color: "orange" }}>
            List Page
          </CustomText>
        </View>
      </Animated.ScrollView>
      <BackToTop scrollY={scrollY} onPress={scrollToTop} />
    </View>
  );
}
