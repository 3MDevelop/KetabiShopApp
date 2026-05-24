import { useCat } from "@/context/CatContext";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";

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

  // حالا به درستی می‌توانید به book_genres دسترسی پیدا کنید
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
            <TouchableOpacity key={genre.id} style={styles.categoryCard}>
              <CustomText style={styles.categoryName}>{genre.label}</CustomText>
              <CustomText style={styles.categoryId}>{genre.name}</CustomText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
