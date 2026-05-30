import React from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";

import { useCat } from "@/context/CatContext";

import PreList from "@/components/UI/PreList";

export default function Categories() {
  const { catList, isLoading, error } = useCat();

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
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <CustomText style={styles.title}>دسته بندی کتاب‌ها</CustomText>
        <CustomText style={styles.description}>
          {genres.length} دسته بندی مختلف برای کشف کتاب‌های جدید
        </CustomText>

        <View style={styles.categoriesGrid}>
          {genres.map((genre) => (
            <>
              <PreList key={genre.id} label={genre.label} name={genre.name} fImage={genre.featuredImage} />
            </>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
