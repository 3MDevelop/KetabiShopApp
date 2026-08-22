import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useTranslate } from "@/hooks/useTranslation";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Image, ScrollView, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";
import {
  BasketProduct,
  ProductType,
  clearBasket,
  getBasket,
  getBasketProducts,
  removeFromBasket,
  subscribeBasket,
  updateBasketQuantity,
} from "@/utils/basket";

export default function Basket() {
  const { t } = useTranslate();
  const { isRTL } = useLanguage();
  const { isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState<BasketProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const cartItemsRef = useRef<BasketProduct[]>([]);
  cartItemsRef.current = cartItems;

  const loadBasket = useCallback(async () => {
    const items = await getBasketProducts();
    setCartItems(items);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadBasket();

    return subscribeBasket(async () => {
      const entries = await getBasket();
      const prev = cartItemsRef.current;
      const sameIds =
        prev.length === entries.length &&
        prev.every((item) => entries.some((entry) => entry.id === item.id));

      if (!sameIds) {
        await loadBasket();
        return;
      }

      setCartItems(
        prev.map((item) => ({
          ...item,
          quantity:
            entries.find((entry) => entry.id === item.id)?.quantity ??
            item.quantity,
        })),
      );
    });
  }, [loadBasket]);

  const getProductStyle = (type: ProductType) => {
    switch (type) {
      case "physical_book":
        return {
          name: "book",
          color: "#007AFF",
          bgColor: "#007AFF15",
          label: t("common.product.physicalBook"),
        };
      case "ebook":
        return {
          name: "tablet-portrait",
          color: "#9C27B0",
          bgColor: "#9C27B015",
          label: t("common.product.ebook"),
        };
      case "audiobook":
        return {
          name: "headset",
          color: "#FF6B35",
          bgColor: "#FF6B3515",
          label: t("common.product.audiobook"),
        };
      case "podcast":
        return {
          name: "mic",
          color: "#FF6B35",
          bgColor: "#FF6B3515",
          label: t("common.product.podcast"),
        };
      case "audio":
        return {
          name: "musical-notes",
          color: "#FF6B35",
          bgColor: "#FF6B3515",
          label: t("common.product.audio"),
        };
      default:
        return {
          name: "document",
          color: "#007AFF",
          bgColor: "#007AFF15",
          label: t("common.cart.product"),
        };
    }
  };

  const canIncreaseQuantity = (item: BasketProduct) => {
    if (item.type === "physical_book") {
      return item.quantity < (item.maxQuantity || 99);
    }
    return false;
  };

  const canDecreaseQuantity = (item: BasketProduct) => {
    if (item.type === "physical_book") {
      return item.quantity > 1;
    }
    return false;
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const updateQuantity = async (id: string, newQuantity: number) => {
    await updateBasketQuantity(id, newQuantity);
  };

  const removeFromCart = async (id: string) => {
    await removeFromBasket(id);
  };

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    await clearBasket();
    setCartItems([]);
    router.push("/");
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (cartItems.length === 0) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.emptyCartContainer}>
            <Ionicons name="cart-outline" size={80} color="#ccc" />
            <CustomText style={styles.emptyCartTitle}>
              {t("common.cart.emptyTitle")}
            </CustomText>
            <CustomText style={styles.emptyCartText}>
              {t("common.cart.emptyText")}
              {"\n"}
              {t("common.cart.emptyHint")}
            </CustomText>

            <TouchableOpacity
              style={styles.shopButton}
              onPress={() => router.push("/")}
            >
              <Ionicons name="book-outline" size={20} color="#fff" />
              <CustomText style={styles.shopButtonText}>
                {t("common.product.viewProducts")}
              </CustomText>
              <Ionicons
                name={isRTL ? "arrow-back" : "arrow-forward"}
                size={18}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* هدر */}
        <View style={styles.header}>
          <Ionicons name="cart" size={28} color="#007AFF" />
          <CustomText style={styles.title}>{t("common.cart.title")}</CustomText>
          <View style={styles.badge}>
            <CustomText style={styles.badgeText}>{cartItems.length}</CustomText>
          </View>
        </View>

        <View style={styles.cartListContainer}>
          {cartItems.map((item) => {
            const productStyle = getProductStyle(item.type);
            const isDigital = item.type !== "physical_book";
            const isEbook = item.type === "ebook";

            return (
              <View key={item.id} style={styles.cartCard}>
                <View style={styles.cartItemInfo}>
                  {item.full_icon_address ? (
                    <Image
                      source={{ uri: item.full_icon_address }}
                      style={styles.productIcon}
                    />
                  ) : (
                    <View
                      style={[
                        styles.productIcon,
                        { backgroundColor: productStyle.bgColor },
                      ]}
                    >
                      <Ionicons
                        name={productStyle.name as any}
                        size={24}
                        color={productStyle.color}
                      />
                    </View>
                  )}
                  <View style={styles.cartItemDetails}>
                    <View style={styles.productHeader}>
                      <CustomText style={styles.cartItemTitle}>
                        {item.book_title || t("pages.Book.notFound")}
                      </CustomText>
                      <View
                        style={[
                          styles.productTypeBadge,
                          { backgroundColor: `${productStyle.color}20` },
                        ]}
                      >
                        <CustomText
                          style={[
                            styles.productTypeText,
                            { color: productStyle.color },
                          ]}
                        >
                          {productStyle.label}
                        </CustomText>
                      </View>
                    </View>
                    <CustomText style={styles.cartItemAuthor}>
                      {item.author}
                    </CustomText>
                    {item.duration && (
                      <CustomText style={styles.productDuration}>
                        <Ionicons name="time-outline" size={12} color="#999" />{" "}
                        {item.duration}
                      </CustomText>
                    )}
                    {isEbook && (
                      <CustomText style={styles.digitalBadge}>
                        <Ionicons
                          name="cloud-outline"
                          size={12}
                          color="#9C27B0"
                        />{" "}
                        {t("common.cart.instantDownload")}
                      </CustomText>
                    )}
                    {isDigital && item.type !== "ebook" && (
                      <CustomText style={styles.digitalBadge}>
                        <Ionicons
                          name="headset-outline"
                          size={12}
                          color="#FF6B35"
                        />{" "}
                        {t("common.cart.onlinePlay")}
                      </CustomText>
                    )}
                    <CustomText
                      style={[
                        styles.cartItemPrice,
                        { color: productStyle.color },
                      ]}
                    >
                      {(item.price * item.quantity).toLocaleString()}{" "}
                      {t("common.cart.currency")}
                    </CustomText>
                  </View>
                </View>

                <View style={styles.cartItemActions}>
                  {item.type === "physical_book" ? (
                    <View style={styles.quantityControl}>
                      <TouchableOpacity
                        style={[
                          styles.quantityButton,
                          !canDecreaseQuantity(item) &&
                            styles.quantityButtonDisabled,
                        ]}
                        onPress={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={!canDecreaseQuantity(item)}
                      >
                        <Ionicons name="remove" size={18} color="#fff" />
                      </TouchableOpacity>
                      <CustomText style={styles.quantityText}>
                        {item.quantity}
                      </CustomText>
                      <TouchableOpacity
                        style={[
                          styles.quantityButton,
                          !canIncreaseQuantity(item) &&
                            styles.quantityButtonDisabled,
                        ]}
                        onPress={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={!canIncreaseQuantity(item)}
                      >
                        <Ionicons name="add" size={18} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.singleItemBadge}>
                      <Ionicons
                        name="checkmark-circle"
                        size={16}
                        color="#28a745"
                      />
                      <CustomText style={styles.singleItemText}>
                        {t("common.cart.singleItem")}
                      </CustomText>
                    </View>
                  )}

                  <CustomText style={styles.unitPrice}>
                    {item.price.toLocaleString()} {t("common.cart.currency")}
                  </CustomText>

                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeFromCart(item.id)}
                  >
                    <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.checkoutCard}>
          <View style={styles.totalRow}>
            <CustomText style={styles.totalLabel}>
              {t("common.cart.total")}
            </CustomText>
            <CustomText style={styles.totalPrice}>
              {calculateTotal().toLocaleString()} {t("common.cart.currency")}
            </CustomText>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <CustomText style={styles.finalLabel}>
              {t("common.cart.finalAmount")}
            </CustomText>
            <CustomText style={styles.finalPrice}>
              {calculateTotal().toLocaleString()} {t("common.cart.currency")}
            </CustomText>
          </View>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}
          >
            <Ionicons name="card-outline" size={22} color="#fff" />
            <CustomText style={styles.checkoutButtonText}>
              {t("common.cart.checkout")}
            </CustomText>
          </TouchableOpacity>

          {!isLoggedIn && (
            <CustomText style={styles.loginHint}>
              ⚠️ {t("common.cart.loginRequired")}
            </CustomText>
          )}
        </View>

        <TouchableOpacity
          style={styles.continueShoppingButton}
          onPress={() => router.push("/")}
        >
          <Ionicons
            name={isRTL ? "arrow-back" : "arrow-forward"}
            size={20}
            color="#007AFF"
          />
          <CustomText style={styles.continueShoppingText}>
            {t("common.cart.continueShopping")}
          </CustomText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
