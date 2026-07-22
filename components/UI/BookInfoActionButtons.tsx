import { StyleSheet, View, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { isFavorite, toggleFavorite, FavoriteItem } from "@/utils/favorites";
import React, { useState, useEffect } from "react";
import { useTranslate } from "@/hooks/useTranslation";
import Toast from "react-native-toast-message";
import * as Clipboard from "expo-clipboard";

interface BookInfoActionButtonsProps {
  data?: number;
  isLiked?: boolean;
  commented?: boolean;
  book?: any;
}

export default function BookInfoActionButtons({
  commented,
  book,
}: BookInfoActionButtonsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const { t } = useTranslate();
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (book) {
        const favStatus = await isFavorite(book.id);
        setIsLiked(favStatus);
      }
    };
    checkFavoriteStatus();
  }, [book]);

  const showCommentSection = () => {
    console.info("goto Comment Section");
  };

  const toggleWishlist = async () => {
    if (!book) return;

    const favoriteItem: FavoriteItem = {
      id: book.id,
      book_title: book.title,
      full_icon_address: book.pic,
      price: Number(book.price.replace(/,/g, "")),
      discount: Number(book.discountFa?.replace(/,/g, "")) || 0,
      percent: Number(book.percentFa) || 0,
    };

    const newStatus = await toggleFavorite(favoriteItem);
    setIsLiked(newStatus);

    Toast.show({
      type: "success",
      text1: newStatus ? t("common.cart.added") : t("common.cart.removed"),
      text2: newStatus
        ? `${book.title} ${t("pages.Book.addedToWishlist")}`
        : `${book.title} ${t("pages.Book.removedFromWishlist")}`,
      position: "top",
      topOffset: 20,
      visibilityTime: 2000,
    });
  };

  const shareAction = async () => {
    try {
      let url = "";
      if (Platform.OS === "web") {
        url = window.location.href;
      } else {
        url = `https://ketabishop.com/book/${book.id}`; // آدرس دلخواه
      }
      await Clipboard.setStringAsync(url);
      Toast.show({
        type: "success",
        text1: t("pages.Book.shareSuccessMassage"),
        position: "top",
        topOffset: 20,
        visibilityTime: 2000,
        text1Style: { textAlign: "center" },
      });
    } catch (error) {
      console.error("Error copying URL:", error);
      Toast.show({
        type: "error",
        text1: "error",
        text2: "امکان کپی لینک وجود ندارد",
        position: "top",
        topOffset: 20,
        visibilityTime: 2000,
      });
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 12,
        justifyContent: "flex-end",
        marginBottom: 16,
      }}
    >
      <TouchableOpacity
        style={[styles.actionButton, isLiked && styles.wishlistActive]}
        onPress={toggleWishlist}
      >
        <Ionicons
          name={isLiked ? "heart" : "heart-outline"}
          size={24}
          color={isLiked ? "#f44336" : "#666"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, true && styles.commentlistActive]}
        onPress={showCommentSection}
      >
        <Ionicons
          name={commented ? "chatbubbles" : "chatbubbles-outline"}
          size={24}
          color="#929292"
        />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.actionButton]} onPress={shareAction}>
        <Ionicons name="share-social" size={24} color="#929292" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },

  actionButton: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#929292",
  },
  wishlistActive: {
    backgroundColor: "#fff0f0",
  },
  commentlistActive: {
    borderColor: "#189deb",
  },
});
