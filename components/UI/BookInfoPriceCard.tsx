import { StyleSheet, View, TouchableOpacity } from "react-native";
import CustomText from "@/components/common/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { useTranslate } from "@/hooks/useTranslation";
import { useAuth } from "@/hooks/useAuth";
import Toast from "react-native-toast-message";
import { usePlayer } from "@/context/PlayerContext";
import { useRouter } from "expo-router";
import { useLanguage } from "@/context/LanguageContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { showAlert } from "@/utils/alert";
import {
  addToBasket,
  BasketEntry,
  getBasketItem,
  removeFromBasket,
  subscribeBasket,
  updateBasketQuantity,
} from "@/utils/basket";
import {
  addStockReminder,
  clearPendingStockReminder,
  getPendingStockReminder,
  isBookOutOfStock,
  setPendingStockReminder,
} from "@/utils/stock";

interface BookInfoPriceCardProps {
  book?: any;
}

export default function BookInfoPriceCard({ book }: BookInfoPriceCardProps) {
  const { t } = useTranslate();
  const { isRTL } = useLanguage()
  const { isLoggedIn } = useAuth();
  const { playAudio } = usePlayer();
  const router = useRouter();
  const [basketItem, setBasketItem] = useState<BasketEntry | undefined>();
  const notifyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const appliedPendingRef = useRef(false);

  const refreshBasketItem = useCallback(async () => {
    if (!book?.id) {
      setBasketItem(undefined);
      return;
    }
    const item = await getBasketItem(String(book.id));
    setBasketItem(item);
  }, [book?.id]);

  useEffect(() => {
    refreshBasketItem();
    return subscribeBasket(refreshBasketItem);
  }, [refreshBasketItem]);

  const registerStockReminder = useCallback(async () => {
    if (!book?.id) {
      return;
    }
    await addStockReminder(String(book.id));
    Toast.show({
      type: "success",
      text1: t("pages.Book.notifyRegistered"),
      position: "top",
      topOffset: 20,
      visibilityTime: 2000,
    });
  }, [book?.id, t]);

  useEffect(() => {
    if (!isLoggedIn || !book?.id) {
      return;
    }

    const applyPendingReminder = async () => {
      if (appliedPendingRef.current) {
        return;
      }
      const pendingId = await getPendingStockReminder();
      if (pendingId !== String(book.id)) {
        return;
      }
      appliedPendingRef.current = true;
      await clearPendingStockReminder();
      await registerStockReminder();
    };

    void applyPendingReminder();
  }, [isLoggedIn, book?.id, registerStockReminder]);

  useEffect(() => {
    return () => {
      if (notifyTimerRef.current) {
        clearTimeout(notifyTimerRef.current);
      }
    };
  }, []);

  const showError = () => {
    Toast.show({
      type: "error",
      text1: t("common.common.error"),
      text2: t("common.common.connectionError"),
      position: "top",
      topOffset: 20,
      visibilityTime: 2000,
    });
  };

  const addToCart = async () => {
    if (!book?.id) {
      return;
    }

    try {
      await addToBasket(String(book.id));
      Toast.show({
        type: "success",
        text1: t("common.cart.added"),
        text2: `${book?.title} ${t("common.cart.addedToCart")}`,
        position: "top",
        topOffset: 20,
        visibilityTime: 2000,
      });
    } catch {
      showError();
    }
  };

  const notifyWhenAvailable = async () => {
    if (!book?.id) {
      return;
    }

    if (isLoggedIn) {
      await registerStockReminder();
      return;
    }

    await setPendingStockReminder(String(book.id));
    Toast.show({
      type: "info",
      text1: t("pages.Book.notifyLoginRequired"),
      position: "top",
      topOffset: 20,
      visibilityTime: 2000,
    });

    if (notifyTimerRef.current) {
      clearTimeout(notifyTimerRef.current);
    }
    notifyTimerRef.current = setTimeout(() => {
      router.push({
        pathname: "/login",
        params: { redirect: `/book/${book.id}` },
      });
    }, 2000);
  };

  const changeQuantity = async (nextQuantity: number) => {
    if (!book?.id) {
      return;
    }

    try {
      await updateBasketQuantity(String(book.id), nextQuantity);
    } catch {
      showError();
    }
  };

  const removeFromCart = () => {
    if (!book?.id) {
      return;
    }

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
            void removeFromBasket(String(book.id)).catch(showError);
          },
        },
      ],
    );
  };

  const handleReader = () => {
    if (!book) return;
    router.push({
      pathname: "/reader",
      params: { id: book.id },
    });
  };

  const handlePlayAudio = () => {
    if (!book) return;
    const audioUrl =
      book.audio_url ||
      "https://ketabishop.com/static/app/sound/sampleSound.mp3";
    playAudio({
      id: book.id,
      title: book.title,
      author: book.author || "نویسنده نامشخص",
      image: book.pic,
      audioUrl: audioUrl,
    });
  };

  const hasDiscount = book?.discountFa;
  const isAvailable = !isBookOutOfStock(book?.exist, book?.price ?? book?.priceFa);
  const isPhysicalBook = !book?.type || book?.type === "physical_book";
  return (
    <View
      style={[
        styles.priceSection,
        { flexDirection: "row-reverse", alignItems: "flex-end" },
      ]}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.priceWrapper}>
          {!isAvailable ? (
            <CustomText bold style={styles.unavailablePrice}>
              {t("pages.Book.soldOut")}
            </CustomText>
          ) : hasDiscount ? (
            <>
              <CustomText style={styles.oldPrice}>
                {isRTL ? book?.priceFa : book?.price} {t("common.cart.currency")}
              </CustomText>
              <CustomText style={styles.finalPrice}>
                {isRTL ? book.discountFa : book.discount} {t("common.cart.currency")}
              </CustomText>
            </>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <CustomText style={styles.singlePrice}>
                {isRTL ? book?.priceFa : book?.price} {t("common.cart.currency")}
              </CustomText>
            </View>
          )}
        </View>

        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          {basketItem && isAvailable ? (
            <View
              style={[
                styles.inCartRow,
                { flexDirection: isRTL ? "row-reverse" : "row" },
              ]}
            >
              {isPhysicalBook ? (
                <View style={styles.quantityControl}>
                  <TouchableOpacity
                    style={[
                      styles.quantityButton,
                      basketItem.quantity <= 1 && styles.quantityButtonDisabled,
                    ]}
                    onPress={() => changeQuantity(basketItem.quantity - 1)}
                    disabled={basketItem.quantity <= 1}
                  >
                    <Ionicons name="remove" size={18} color="#fff" />
                  </TouchableOpacity>
                  <CustomText style={styles.quantityText}>
                    {isRTL
                      ? basketItem.quantity.toLocaleString("fa-IR")
                      : String(basketItem.quantity)}
                  </CustomText>
                  <TouchableOpacity
                    style={[
                      styles.quantityButton,
                      basketItem.quantity >= 99 &&
                        styles.quantityButtonDisabled,
                    ]}
                    onPress={() => changeQuantity(basketItem.quantity + 1)}
                    disabled={basketItem.quantity >= 99}
                  >
                    <Ionicons name="add" size={18} color="#fff" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.quantityControl}>
                  <CustomText style={styles.quantityText}>
                    {isRTL ? "۱" : "1"}
                  </CustomText>
                </View>
              )}

              <TouchableOpacity
                style={styles.viewCartButton}
                onPress={() => router.push("/basket")}
              >
                <CustomText style={styles.viewCartText}>
                  {t("common.cart.viewCart")}{" "}
                  <CustomText style={styles.viewCartLink}>
                    {t("common.cart.title")}
                  </CustomText>
                </CustomText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.removeButton}
                onPress={removeFromCart}
              >
                <Ionicons name="trash-outline" size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.cartButton, !isAvailable && styles.notifyButton]}
              onPress={isAvailable ? addToCart : notifyWhenAvailable}
            >
              <CustomText style={styles.cartButtonText}>
                {isAvailable
                  ? t("pages.Book.addToCart")
                  : t("pages.Book.notifyWhenAvailable")}
              </CustomText>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.eButton]} onPress={handleReader}>
            <Ionicons name="reader-outline" size={28} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.audioButton]}
            onPress={handlePlayAudio}
          >
            <Ionicons name="headset" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  priceWrapper: {
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  oldPrice: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
    marginBottom: 4,
  },
  finalPrice: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  singlePrice: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  unavailablePrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#999999",
  },
  priceSection: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cartButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  inCartRow: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  viewCartButton: {
    flex: 1,
    alignItems: "center",
  },
  viewCartText: {
    color: "#666",
    fontSize: 13,
  },
  viewCartLink: {
    color: "#007AFF",
    fontSize: 13,
    fontWeight: "bold",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  quantityButton: {
    backgroundColor: "#007AFF",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    minWidth: 24,
    textAlign: "center",
  },
  removeButton: {
    padding: 8,
  },
  notifyButton: {
    backgroundColor: "#FF9800",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  audioButton: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    /* borderWidth: 1, */
    /* borderColor: "#FF6B35", */
  },
  eButton: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
  },
});
