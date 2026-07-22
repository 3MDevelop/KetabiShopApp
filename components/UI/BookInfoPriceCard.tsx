import { StyleSheet, View, TouchableOpacity } from "react-native";
import CustomText from "@/components/common/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { useTranslate } from "@/hooks/useTranslation";
import Toast from "react-native-toast-message";

interface BookInfoPriceCardProps {
  book?: any;
}

export default function BookInfoPriceCard({ book }: BookInfoPriceCardProps) {
  const { t } = useTranslate();

  const addToCart = () => {
    Toast.show({
      type: "success",
      text1: t("common.cart.added"),
      text2: `${book?.title} ${t("common.cart.addedToCart")}`,
      position: "top",
      topOffset: 20,
      visibilityTime: 2000,
    });
  };

  const playAudio = () => {
    console.info("play Sound");
  };

  const hasDiscount = book?.discountFa;
  const isAvailable = book?.exist === "1";
  return (
    <View
      style={[
        styles.priceSection,
        { flexDirection: "row-reverse", alignItems: "flex-end" },
      ]}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.priceWrapper}>
          {hasDiscount ? (
            <>
              <CustomText style={styles.oldPrice}>
                {book.price} {t("common.cart.currency")}
              </CustomText>
              <CustomText style={styles.finalPrice}>
                {book.discountFa} {t("common.cart.currency")}
              </CustomText>
            </>
          ) : (
            <CustomText style={styles.singlePrice}>
              {Number(book?.price).toLocaleString()} {t("common.cart.currency")}
            </CustomText>
          )}
        </View>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <TouchableOpacity
            style={[styles.cartButton, !isAvailable && styles.disabledButton]}
            onPress={addToCart}
            disabled={!isAvailable}
          >
            <Ionicons name="book" size={22} color="#fff" />
            <CustomText style={styles.cartButtonText}>
              {isAvailable
                ? t("pages.Book.addToCart")
                : t("pages.Book.outOfStock")}
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.eButton]} onPress={playAudio}>
            <Ionicons name="reader-outline" size={28} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.audioButton]} onPress={playAudio}>
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
