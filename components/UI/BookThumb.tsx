// components/UI/BookThumb.tsx

import { useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import CustomText from "@/components/common/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslate } from "@/hooks/useTranslation";
import {
  formatNumber,
  normalizePricePair,
  parseMoney,
} from "@/utils/money";
import { isBookOutOfStock } from "@/utils/stock";

interface BookThumbProps {
  bookID?: number;
  bookName?: string;
  author?: string;
  price?: number | string;
  imageUrl?: string;
  itemWidth?: number;
  percent?: number | string;
  discount?: number | string;
  exist?: number | string;
  color?: string;
}

const priceRowStyle = {
  marginTop: 5,
  flexDirection: "row-reverse" as const,
  gap: 8,
  alignItems: "center" as const,
  alignSelf: "flex-start" as const,
};

const strikethroughPriceStyle = {
  fontSize: 14,
  lineHeight: 20,
  textDecorationLine: "line-through" as const,
  color: "#999",
};

const finalPriceStyle = {
  fontSize: 14,
  lineHeight: 20,
  color: "#4CAF50",
};

const soldOutStyle = {
  fontSize: 16,
  lineHeight: 20,
  color: "#999999",
};

export default function BookThumb({
  bookID,
  bookName,
  price,
  imageUrl,
  itemWidth,
  percent,
  discount,
  exist,
}: BookThumbProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const { t } = useTranslate();
  const [priceBoxWidth, setPriceBoxWidth] = useState(0);
  const [discountRowWidth, setDiscountRowWidth] = useState(0);

  const { price: priceValue, discount: discountValue } = normalizePricePair(
    price,
    discount,
  );
  const percentValue = parseMoney(percent);
  const hasDiscount = percentValue > 0 && discountValue > 0;
  const formattedPrice = formatNumber(priceValue, language);
  const formattedDiscount = formatNumber(discountValue, language);
  const formattedPercent = formatNumber(percentValue, language);
  const currency = t("common.cart.currency");
  const canShowDiscount =
    hasDiscount &&
    (priceBoxWidth === 0 ||
      discountRowWidth === 0 ||
      discountRowWidth <= priceBoxWidth);
  const visibleAmount = canShowDiscount
    ? formattedDiscount
    : formattedDiscount || formattedPrice;
  const soldOut = isBookOutOfStock(exist, price);

  return (
    <TouchableOpacity
      onPress={() =>
        router.push(`/book/${bookID}`)
      }
      activeOpacity={0.7}
      style={{
        backgroundColor: "#e9e9e9",
        height: "100%",
        padding: 10,
        minWidth: 100,
        flex: 1,
        alignSelf: "center",
        width: itemWidth,
      }}
    >
      {hasDiscount && !soldOut && (
        <View
          style={{
            position: "absolute",
            top: -3,
            left: 0,
            flexDirection: "row-reverse",
            justifyContent: "flex-start",
            alignItems: "center",
            zIndex: 99,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Ionicons name="bookmark-sharp" color={"red"} size={46} />
            <CustomText
              variant="discription"
              bold
              style={{
                color: "white",
                position: "absolute",
                alignSelf: "center",
              }}
            >
              {formattedPercent}%
            </CustomText>
          </View>
        </View>
      )}

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        {imageUrl ? (
          <Image
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
            source={{ uri: imageUrl }}
          />
        ) : (
          <CustomText>notFound</CustomText>
        )}
      </View>

      <View
        style={{
          marginTop: 12,
          height: "22%",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CustomText
          bold
          variant="caption"
          style={[
            {
              fontSize: 15,
              marginBottom: 8,
              paddingHorizontal:5,
              textAlign: "right",
              width: "100%",
            },
            {
              wordBreak: "keep-all",
              overflowWrap: "normal",
            } as object,
          ]}
          numberOfLines={2}
          ellipsizeMode="tail"
          textBreakStrategy="simple"
        >
          {bookName}
        </CustomText>

        <View
          onLayout={(event) =>
            setPriceBoxWidth(event.nativeEvent.layout.width)
          }
          style={{
            overflow: "hidden",
            width: "100%",
            alignItems: "flex-start",
            direction: "ltr",
          }}
        >
          {soldOut ? (
            <CustomText bold style={soldOutStyle}>
              {t("pages.Book.soldOut")}
            </CustomText>
          ) : (
            <>
              {hasDiscount ? (
                <View
                  onLayout={(event) =>
                    setDiscountRowWidth(event.nativeEvent.layout.width)
                  }
                  style={{
                    position: "absolute",
                    opacity: 0,
                    flexDirection: "row-reverse",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <CustomText style={strikethroughPriceStyle}>
                    {formattedPrice}
                  </CustomText>
                  <CustomText bold style={finalPriceStyle}>
                    {formattedDiscount}
                  </CustomText>
                  <CustomText bold style={finalPriceStyle}>
                    {currency}
                  </CustomText>
                </View>
              ) : null}

              {visibleAmount ? (
                <View style={priceRowStyle}>
                  {canShowDiscount ? (
                    <CustomText style={strikethroughPriceStyle}>
                      {formattedPrice}
                    </CustomText>
                  ) : null}
                  <CustomText bold style={finalPriceStyle}>
                    {visibleAmount}
                  </CustomText>
                  <CustomText bold style={finalPriceStyle}>
                    {currency}
                  </CustomText>
                </View>
              ) : null}
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
