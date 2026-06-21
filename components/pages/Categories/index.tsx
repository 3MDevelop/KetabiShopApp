import FullWidthBanner from "@/components/Blocks/FullWidthBanner";
import CustomText from "@/components/common/CustomText";
import BackToTop from "@/components/UI/BackToTop";
import BookPreList from "@/components/Blocks/BookPreList";
import { useCat } from "@/context/CatContext";
import React ,{useRef} from "react";
import { Animated, ScrollView, View } from "react-native";
import styles from "./styles";


export default function Categories() {
  const { catList, isLoading, error } = useCat();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
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
            return (
              <BookPreList
                key={genre.id}
                label={genre.label}
                fImage={genre.featuredImage}
                listItemRatio={0.64}
                listId={genre.listID}
              />
            );
          })}
        </View>
      </Animated.ScrollView>
      <BackToTop scrollY={scrollY} onPress={scrollToTop} />
    </View>
  );
}
