import React, { useRef } from "react";
import { ScrollView, View, Animated } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";
import { useCat } from "@/context/CatContext";
import PreList from "@/components/UI/PreList";
import BackToTop from "@/components/UI/BackToTop";

export default function Categories() {
  const { catList, isLoading, error } = useCat();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToTop = () => {
    console.info("اسکرول به بالا");
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <CustomText>در حال بارگذاری...</CustomText>
      </View>
    );
  }

  

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <CustomText style={styles.errorText}>خطا: {error}</CustomText>
      </View>
    );
  }

  const genres = catList?.book_genres || [];

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
          <CustomText style={styles.title}>دسته بندی کتاب‌ها</CustomText>
          <View style={styles.categoriesGrid}>
            {genres.map((genre) => (
              <PreList
                key={genre.id}
                label={genre.label}
                fImage={require("@/assets/images/bookCat/04.png")}
                listItemRatio={0.64}
              />
            ))}
          </View>
        </View>
      </Animated.ScrollView>
      <BackToTop scrollY={scrollY} onPress={scrollToTop} />
    </View>
  );
}
