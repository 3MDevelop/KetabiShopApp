import { StyleSheet, View, TouchableOpacity } from "react-native";
import CustomText from "@/components/common/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { useTranslate } from "@/hooks/useTranslation";

interface bookDiscriptionProps {
  desText?: string;
}

const stripHtmlTags = (html: string) => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

export default function BookDiscription({ desText }: bookDiscriptionProps) {
  const { t } = useTranslate();
  const [showMore, setShowMore] = useState(false);

  return (
    <View
      style={[
        styles.descriptionCard,
        {
          height: !showMore ? 200 : "auto",
          overflow: "hidden",
          paddingBottom: !showMore ? 30 : "auto",
        },
      ]}
    >
      <CustomText style={styles.cardTitle}>
        📖 {t("pages.Book.description")}
      </CustomText>
      <CustomText style={styles.descriptionText}>
        {stripHtmlTags(desText as any)}
      </CustomText>
      <TouchableOpacity
        onPress={() => setShowMore(!showMore)}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "100%",
        }}
      >
        <LinearGradient
          colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 50,
            pointerEvents: "none",
          }}
        />
        <Ionicons
          name="chevron-down"
          size={24}
          color="#505050"
          style={{
            alignSelf: "center",
            transform: [{ rotate: showMore ? "180deg" : "0deg" }],
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  descriptionCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    width: "100%",
  },
  descriptionText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 24,
    textAlign: "justify",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
});
