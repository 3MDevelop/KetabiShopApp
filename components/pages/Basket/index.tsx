import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useTranslate } from "@/hooks/useTranslation";
import { useResponsive } from "@/hooks/useResponsive";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";
import { showAlert } from "@/utils/alert";
import { withDir } from "@/utils/dir";
import { useFontFamily } from "@/hooks/useFonts";
import {
  BasketProduct,
  ProductType,
  getBasket,
  getBasketProducts,
  removeFromBasket,
  removeManyFromBasket,
  subscribeBasket,
  updateBasketQuantity,
} from "@/utils/basket";

function RemoveUnavailableButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  const hover = useRef(new Animated.Value(0)).current;
  const { getFontFamily } = useFontFamily();

  const animateTo = (value: number) => {
    Animated.timing(hover, {
      toValue: value,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => animateTo(1)}
      onHoverOut={() => animateTo(0)}
      onPressIn={() => animateTo(1)}
      onPressOut={() => animateTo(0)}
    >
      <Animated.View
        style={[
          styles.removeUnavailableButton,
          {
            backgroundColor: hover.interpolate({
              inputRange: [0, 1],
              outputRange: ["#ffffff", "#FF9800"],
            }),
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.removeUnavailableButtonText,
            {
              fontFamily: getFontFamily("bold"),
              color: hover.interpolate({
                inputRange: [0, 1],
                outputRange: ["#FF9800", "#ffffff"],
              }),
            },
          ]}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

export default function Basket() {
  const { t } = useTranslate();
  const { isRTL, language } = useLanguage();
  const { isLoggedIn } = useAuth();
  const { isMobile } = useResponsive();
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

  const formatPrice = (value: number) =>
    `${value.toLocaleString(language === "fa" ? "fa-IR" : "en-US")} ${t("common.cart.currency")}`;

  const formatAmount = (value: number) =>
    value.toLocaleString(language === "fa" ? "fa-IR" : "en-US");

  const getLineOriginal = (item: BasketProduct) =>
    (item.originalPrice > 0 ? item.originalPrice : item.price) * item.quantity;

  const getLineFinal = (item: BasketProduct) => item.price * item.quantity;

  const availableItems = cartItems.filter((item) => item.exist);
  const hasUnavailableItems = cartItems.some((item) => !item.exist);
  const originalTotal = availableItems.reduce(
    (sum, item) => sum + getLineOriginal(item),
    0,
  );
  const finalTotal = availableItems.reduce(
    (sum, item) => sum + getLineFinal(item),
    0,
  );
  const discountTotal = Math.max(0, originalTotal - finalTotal);

  const updateQuantity = async (id: string, newQuantity: number) => {
    await updateBasketQuantity(id, newQuantity);
  };

  const removeFromCart = (id: string) => {
    showAlert(
      t("common.cart.removeConfirmTitle"),
      t("common.cart.removeConfirmMessage"),
      [
        {
          text: t("common.cart.removeCancel"),
          style: "cancel",
        },
        {
          text: t("common.cart.removeConfirm"),
          style: "destructive",
          onPress: () => {
            void removeFromBasket(id);
          },
        },
      ],
    );
  };

  const handleDecrease = (item: BasketProduct) => {
    if (item.quantity <= 1) {
      removeFromCart(item.id);
      return;
    }
    void updateQuantity(item.id, item.quantity - 1);
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    router.push("/shipping");
  };

  const removeAllUnavailable = () => {
    const ids = cartItems.filter((item) => !item.exist).map((item) => item.id);
    if (ids.length === 0) {
      return;
    }

    showAlert(
      t("common.cart.removeAllUnavailableConfirmTitle"),
      t("common.cart.removeAllUnavailableConfirmMessage"),
      [
        {
          text: t("common.cart.removeCancel"),
          style: "cancel",
        },
        {
          text: t("common.cart.removeAllUnavailable"),
          style: "destructive",
          onPress: () => {
            void removeManyFromBasket(ids);
          },
        },
      ],
    );
  };

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
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

  const availableCount = availableItems.length;
  const contentDirection = isRTL ? "rtl" : "ltr";

  const paymentCard = (
    <View style={[styles.sidebar, isMobile && styles.sidebarMobile]}>
      <View {...withDir(contentDirection, styles.checkoutCard)}>
        <CustomText
          style={[
            styles.checkoutTitle,
            { textAlign: isRTL ? "right" : "left" },
          ]}
        >
          {t("common.cart.paymentDetails")}
        </CustomText>

        <View style={styles.totalRow}>
          <CustomText style={styles.totalLabel}>
            {t("common.cart.itemsTotal")} (
            {t("common.cart.itemsCount", { count: availableCount })})
          </CustomText>
          <CustomText style={styles.totalPrice}>
            {formatPrice(originalTotal)}
          </CustomText>
        </View>

        {discountTotal > 0 ? (
          <View style={styles.totalRow}>
            <CustomText style={styles.savingsLabel}>
              {t("common.cart.yourSavings")}
            </CustomText>
            <CustomText style={styles.savingsPrice}>
              {formatPrice(discountTotal)}
            </CustomText>
          </View>
        ) : null}

        <View style={styles.totalRow}>
          <CustomText style={styles.finalLabel}>
            {t("common.cart.basketTotal")}
          </CustomText>
          <CustomText style={styles.finalPrice}>{formatPrice(finalTotal)}</CustomText>
        </View>

        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <CustomText style={styles.checkoutButtonText}>
            {t("common.cart.placeOrder")}
          </CustomText>
        </TouchableOpacity>

        {!isLoggedIn && (
          <CustomText style={styles.loginHint}>
            {t("common.cart.loginRequired")}
          </CustomText>
        )}

        <View style={styles.checkoutNote}>
          <Ionicons
            name="information-circle-outline"
            size={16}
            color="#999"
          />
          <CustomText
            style={[
              styles.checkoutNoteText,
              { textAlign: isRTL ? "right" : "left" },
            ]}
          >
            {t("common.cart.checkoutNote")}
          </CustomText>
        </View>

        {hasUnavailableItems ? (
          <View style={styles.checkoutNote}>
            <Ionicons
              name="warning-outline"
              size={16}
              color="#FF3B30"
            />
            <CustomText
              style={[
                styles.unavailableCheckoutNoteText,
                { textAlign: isRTL ? "right" : "left" },
              ]}
            >
              {t("common.cart.unavailableCheckoutNote")}
            </CustomText>
          </View>
        ) : null}
      </View>
    </View>
  );

  const itemsCard = (
    <View {...withDir(contentDirection, styles.listColumn)}>
      {hasUnavailableItems ? (
        <View style={styles.unavailableBanner}>
          <CustomText
            style={[
              styles.unavailableBannerText,
              { textAlign: isRTL ? "right" : "left" },
            ]}
          >
            {t("common.cart.unavailableBanner")}
          </CustomText>
          <TouchableOpacity
            style={styles.unavailableBannerButton}
            onPress={removeAllUnavailable}
          >
            <CustomText style={styles.unavailableBannerButtonText}>
              {t("common.cart.removeAllUnavailable")}
            </CustomText>
          </TouchableOpacity>
        </View>
      ) : null}

      <View style={styles.listCard}>
      <View style={styles.listHeader}>
        <CustomText style={styles.listTitle}>{t("common.cart.title")}</CustomText>
        <CustomText style={styles.itemsCount}>
          {t("common.cart.itemsCount", { count: cartItems.length })}
        </CustomText>
      </View>

      {cartItems.map((item) => {
        const productStyle = getProductStyle(item.type);
        const canIncrease =
          item.type === "physical_book" &&
          item.quantity < (item.maxQuantity || 99);
        const lineOriginal = getLineOriginal(item);
        const lineFinal = getLineFinal(item);
        const lineDiscount = Math.max(0, lineOriginal - lineFinal);
        const percentValue =
          item.percent && item.percent > 0
            ? item.percent
            : lineOriginal > 0
              ? Math.round((lineDiscount / lineOriginal) * 100)
              : 0;
        const hasDiscount = item.exist && (lineDiscount > 0 || percentValue > 0);

        return (
          <View key={item.id} style={styles.cartItem}>
            <TouchableOpacity
              style={styles.imageWrap}
              onPress={() => router.push(`/book/${item.id}`)}
            >
              {item.full_icon_address ? (
                <Image
                  source={{ uri: item.full_icon_address }}
                  style={styles.productImage}
                  resizeMode="cover"
                />
              ) : (
                <View
                  style={[
                    styles.productImage,
                    styles.productImagePlaceholder,
                    { backgroundColor: productStyle.bgColor },
                  ]}
                >
                  <Ionicons
                    name={productStyle.name as any}
                    size={28}
                    color={productStyle.color}
                  />
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.itemMain}>
              <TouchableOpacity onPress={() => router.push(`/book/${item.id}`)}>
                <CustomText style={styles.itemTitle}>
                  {item.book_title || t("pages.Book.notFound")}
                </CustomText>
              </TouchableOpacity>
              <CustomText style={styles.itemMeta}>
                {productStyle.label}
                {item.author ? `  |  ${item.author}` : ""}
              </CustomText>
              {!item.exist && (
                <CustomText bold style={styles.outOfStock}>
                  {t("pages.Book.soldOut")}
                </CustomText>
              )}
            </View>

            <View
              style={[
                styles.itemSide,
                !item.exist && styles.itemSideUnavailable,
              ]}
            >
              {item.exist ? (
                <>
                  <View style={styles.itemPriceBlock}>
                    {hasDiscount ? (
                            <View {...withDir("ltr", styles.itemDiscountRow)}>
                        <View style={styles.itemDiscountBadge}>
                          <CustomText style={styles.itemDiscountBadgeText}>
                            {formatAmount(percentValue)}٪
                          </CustomText>
                        </View>
                        <CustomText style={styles.itemOriginalPrice}>
                          {formatAmount(lineOriginal)}
                        </CustomText>
                      </View>
                    ) : null}
                    <View {...withDir("ltr", styles.itemFinalPriceRow)}>
                      <CustomText style={styles.itemCurrency}>
                        {t("common.cart.currency")}
                      </CustomText>
                      <CustomText style={styles.itemPrice}>
                        {formatAmount(lineFinal)}
                      </CustomText>
                    </View>
                  </View>
                  <View {...withDir("ltr", styles.quantityControl)}>
                    <TouchableOpacity
                      style={[
                        styles.quantityButton,
                        item.quantity <= 1 && styles.quantityButtonDelete,
                      ]}
                      onPress={() => handleDecrease(item)}
                    >
                      <Ionicons
                        name={item.quantity <= 1 ? "trash-outline" : "remove"}
                        size={18}
                        color="#fff"
                      />
                    </TouchableOpacity>
                    <CustomText style={styles.quantityText}>
                      {item.quantity}
                    </CustomText>
                    <TouchableOpacity
                      style={[
                        styles.quantityButton,
                        !canIncrease && styles.quantityButtonDisabled,
                      ]}
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={!canIncrease}
                    >
                      <Ionicons name="add" size={18} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <RemoveUnavailableButton
                  label={t("common.cart.removeFromBasket")}
                  onPress={() => removeFromCart(item.id)}
                />
              )}
            </View>
          </View>
        );
      })}
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.content}>
        <View {...withDir("ltr", [styles.layout, isMobile && styles.layoutMobile])}>
          {itemsCard}
          {paymentCard}
        </View>
      </View>
    </ScrollView>
  );
}
