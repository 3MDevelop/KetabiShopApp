import React, { useRef } from "react";
import { ScrollView, View, Animated } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";
import { useCat } from "@/context/CatContext";
import PreList from "@/components/UI/PreList";
import BackToTop from "@/components/UI/BackToTop";
import FullWidthBanner from "@/components/UI/FullWidthBanner";

export default function Categories() {
  const { catList, isLoading, error } = useCat();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const getGenreImage = (id: number) => {
    switch (id) {
      case 1:
        return require("@/assets/images/bookCat/01.png");
      case 2:
        return require("@/assets/images/bookCat/02.png");
      case 3:
        return require("@/assets/images/bookCat/03.png");
      case 4:
        return require("@/assets/images/bookCat/04.png");
      case 5:
        return require("@/assets/images/bookCat/05.png");
      case 6:
        return require("@/assets/images/bookCat/06.png");
      case 7:
        return require("@/assets/images/bookCat/07.png");
      case 8:
        return require("@/assets/images/bookCat/08.png");
      case 9:
        return require("@/assets/images/bookCat/09.png");
      case 10:
        return require("@/assets/images/bookCat/10.png");
      case 11:
        return require("@/assets/images/bookCat/11.png");
      case 12:
        return require("@/assets/images/bookCat/12.png");
      case 13:
        return require("@/assets/images/bookCat/13.png");
      case 14:
        return require("@/assets/images/bookCat/14.png");
      case 15:
        return require("@/assets/images/bookCat/15.png");
      case 16:
        return require("@/assets/images/bookCat/16.png");
      case 17:
        return require("@/assets/images/bookCat/17.png");
      case 18:
        return require("@/assets/images/bookCat/18.png");
      case 19:
        return require("@/assets/images/bookCat/19.png");
      case 20:
        return require("@/assets/images/bookCat/20.png");
      case 21:
        return require("@/assets/images/bookCat/21.png");
      case 22:
        return require("@/assets/images/bookCat/22.png");
      case 23:
        return require("@/assets/images/bookCat/23.png");
      case 24:
        return require("@/assets/images/bookCat/24.png");
      case 25:
        return require("@/assets/images/bookCat/25.png");
      case 26:
        return require("@/assets/images/bookCat/26.png");
      case 27:
        return require("@/assets/images/bookCat/27.png");
      case 28:
        return require("@/assets/images/bookCat/28.png");
    }
  };

  const scrollToTop = () => {
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
          <FullWidthBanner
            height={100}
            fontSize={35}
            text="Ketabika App"
            textColor="#06443a"
            isInner
            url="about"
            imageSource={require("@/assets/images/fullWidthBanner.jpg")}
          />

          {genres.map((genre) => {
            console.info(genre.id);
            return (
              <PreList
                key={genre.id}
                label={genre.label}
                fImage={getGenreImage(genre.id)}
                listItemRatio={0.64}
                apiUrl={genre.apiUrl}
              />
            );
          })}
        </View>
      </Animated.ScrollView>
      <BackToTop scrollY={scrollY} onPress={scrollToTop} />
    </View>
  );
}
