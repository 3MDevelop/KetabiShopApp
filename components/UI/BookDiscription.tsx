import { StyleSheet, View, TouchableOpacity, useWindowDimensions } from "react-native";
import CustomText from "@/components/common/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { useTranslate } from "@/hooks/useTranslation";
import RenderHTML from "react-native-render-html";
import { useLanguage } from "@/context/LanguageContext";

interface BookDiscriptionProps {
  desText?: string;
}

export default function BookDiscription({ desText }: BookDiscriptionProps) {
  const { t } = useTranslate();
  const { language } = useLanguage();
  const [showMore, setShowMore] = useState(false);
  const { width } = useWindowDimensions();

  const fontFamily = language === 'fa' ? 'Vazirmatn-Regular' : 'Inter-Regular';
  const fontFamilyBold = language === 'fa' ? 'Vazirmatn-Bold' : 'Inter-Bold';


  if (!desText) {
    return null;
  }

  const tagsStyles = {
    body: {
      color: '#555',
      fontSize: 14,
      lineHeight: 24,
      fontFamily: fontFamily,
    },
    p: {
      fontFamily: fontFamily,
      marginBottom: 8,
      color: '#555',
      fontSize: 14,
      lineHeight: 24,
    },
    h1: {
      fontSize: 22,
      fontWeight: 'bold' as const,
      color: '#333',
      marginTop: 16,
      marginBottom: 8,
      fontFamily: fontFamilyBold,
    },
    h2: {
      fontSize: 20,
      fontWeight: 'bold' as const,
      color: '#333',
      marginTop: 14,
      marginBottom: 8,
      fontFamily: fontFamilyBold,
    },
    h3: {
      fontSize: 18,
      fontWeight: 'bold' as const,
      color: '#333',
      marginTop: 12,
      marginBottom: 6,
      fontFamily: fontFamilyBold,
    },
    ul: {
      marginLeft: 16,
      marginBottom: 8,
      fontFamily: fontFamily,
    },
    li: {
      marginBottom: 4,
      color: '#555',
      fontSize: 14,
      lineHeight: 22,
      fontFamily: fontFamily,
    },
    strong: {
      fontWeight: 'bold' as const,
      fontFamily: fontFamilyBold,
    },
    a: {
      color: '#007AFF',
      textDecorationLine: 'underline' as const,
      fontFamily: fontFamily,
    },
  };

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

      <RenderHTML
        contentWidth={width - 32}
        source={{ html: desText }}
        baseStyle={{
          fontSize: 14,
          color: "#555",
          lineHeight: 24,
          fontFamily: fontFamily,
        }}
        tagsStyles={tagsStyles}
        defaultTextProps={{
          style: {
            fontFamily: fontFamily,
          },
        }}
      />

      <TouchableOpacity
        onPress={() => setShowMore(!showMore)}
        style={styles.moreButton}
        activeOpacity={0.7}
      >
        {!showMore && (
          <LinearGradient
            colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradient}
          />
        )}
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
    position: "relative",
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
  moreButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: "center",
    paddingTop: 10,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    pointerEvents: "none",
  },
});