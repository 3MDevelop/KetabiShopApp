import React from "react";
import { Text, ScrollView, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import styles from "./styles";

export default function Book() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { p } = route.params as { p: string };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>صفحه کتاب</Text>
        <Text style={styles.description}>
          شما در حال مشاهده {p ? "صفحه" + p : null}کتاب {id} میباشید
        </Text>
      </View>
    </ScrollView>
  );
}
