import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useCat } from "@/context/CatContext";
import styles from "./styles";

export default function Categories() {
  const { catList, isLoading, error } = useCat();

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <Text>در حال بارگذاری...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>خطا: {error}</Text>
      </View>
    );
  }

  // حالا به درستی می‌توانید به book_genres دسترسی پیدا کنید
  const genres = catList?.book_genres || [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>دسته بندی کتاب‌ها</Text>
        <Text style={styles.description}>
          {genres.length} دسته بندی مختلف برای کشف کتاب‌های جدید
        </Text>

        <View style={styles.categoriesGrid}>
          {genres.map((genre) => (
            <TouchableOpacity key={genre.id} style={styles.categoryCard}>
              <Text style={styles.categoryName}>{genre.label}</Text>
              <Text style={styles.categoryId}>{genre.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}