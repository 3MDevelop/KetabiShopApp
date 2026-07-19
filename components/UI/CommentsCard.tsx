import { View, StyleSheet } from "react-native";
import CustomText from "../common/CustomText";
import { useAuth } from "@/hooks/useAuth";
import React from "react";

interface CommentsCardProps {
  productID?: number;
}

export default function CommentsCard({ productID }: CommentsCardProps) {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <CustomText>{productID}</CustomText>
      <CustomText>{user?.ID}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    width: "100%",
    flexWrap: "wrap",
  },
});
