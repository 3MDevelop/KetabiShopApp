import { useMemo, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import CustomText from "@/components/common/CustomText";
import { useResponsive } from "@/hooks/useResponsive";
import BookImageGallery from "./BookImageGallery";

interface bookImageProps {
  url?: string;
  urls?: string[];
  hasDiscount?: string;
  percent?: string;
}

function collectImages(url?: string, urls?: string[]) {
  const seen = new Set<string>();
  const images: string[] = [];
  for (const item of [url, ...(urls || [])]) {
    if (!item || seen.has(item)) continue;
    seen.add(item);
    images.push(item);
  }
  return images;
}

export default function BookImage({
  url,
  urls,
  hasDiscount,
  percent,
}: bookImageProps) {
  const { isMobile } = useResponsive();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const images = useMemo(() => collectImages(url, urls), [url, urls]);

  return (
    <>
      <View style={[styles.imageSection, { width: isMobile ? "100%" : "38%" }]}>
        {images[0] && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setGalleryOpen(true)}
            style={styles.imageHit}
          >
            <Image
              source={{ uri: images[0] }}
              style={[styles.detailImage, { height: isMobile ? 500 : "100%" }]}
              resizeMode={isMobile ? "contain" : "cover"}
            />
          </TouchableOpacity>
        )}
        {hasDiscount && (
          <View style={styles.discountBadge} pointerEvents="none">
            <CustomText style={styles.discountBadgeText}>{percent}%</CustomText>
          </View>
        )}
      </View>
      <BookImageGallery
        visible={galleryOpen}
        images={images}
        onClose={() => setGalleryOpen(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  imageSection: {
    alignItems: "center",
    marginBottom: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  imageHit: {
    width: "100%",
    height: "100%",
  },
  detailImage: {
    width: "100%",
  },
  discountBadge: {
    position: "absolute",
    left: 0,
    backgroundColor: "#f44336",
    paddingHorizontal: 12,
    paddingVertical: 24,
    borderBottomRightRadius: 20,
  },
  discountBadgeText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});
