import { StyleSheet, View, Image } from "react-native";
import CustomText from "@/components/common/CustomText";
import { useResponsive } from "@/hooks/useResponsive";

interface bookImageProps {
  url?: string;
  hasDiscount?: string;
  percent?: string;
}

export default function BookImage({
  url,
  hasDiscount,
  percent,
}: bookImageProps) {
  const { isMobile } = useResponsive();
  return (
    <View style={[styles.imageSection, { width: isMobile ? "100%" : "38%" }]}>
      {url && (
        <Image
          source={{ uri: url }}
          style={[styles.detailImage, { height: isMobile ? 500 : "100%" }]}
          resizeMode={isMobile ? "contain" : "cover"}
        />
      )}
      {hasDiscount && (
        <View style={styles.discountBadge}>
          <CustomText style={styles.discountBadgeText}>{percent}%</CustomText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageSection: {
    alignItems: "center",
    marginBottom: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  detailImage: {
    width: "100%",
  },
  discountBadge: {
    position: "absolute",
    right: 0,
    backgroundColor: "#f44336",
    paddingHorizontal: 24,
    paddingVertical: 6,

    borderBottomStartRadius: 20,
  },
  discountBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
