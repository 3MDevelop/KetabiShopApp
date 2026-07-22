import { StyleSheet, View } from "react-native";
import CustomText from "@/components/common/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { useTranslate } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { useResponsive } from "@/hooks/useResponsive";

interface BookInfoDetailProps {
  book?: any;
}

export default function BookInfoDetail({ book }: BookInfoDetailProps) {
  const { t } = useTranslate();
  const { isRTL } = useLanguage();
  const { isMobile } = useResponsive();
  return (
    <View style={styles.infoCard}>
      <View style={styles.infoGrid}>
        <View style={[styles.infoItem, { width: isMobile ? "100%" : "45%" }]}>
          <View style={styles.infoIcon}>
            <Ionicons name="barcode-outline" size={20} color="#4CAF50" />
          </View>
          <View style={styles.infoText}>
            <CustomText style={styles.infoLabel}>
              {t("pages.Book.isbn")}
            </CustomText>
            <CustomText style={styles.infoValue}>
              {book?.isbn || t("common.common.unknown")}
            </CustomText>
          </View>
        </View>

        <View style={[styles.infoItem, { width: isMobile ? "100%" : "45%" }]}>
          <View style={styles.infoIcon}>
            <Ionicons name="document-text-outline" size={20} color="#4CAF50" />
          </View>
          <View style={styles.infoText}>
            <CustomText style={styles.infoLabel}>
              {t("pages.Book.pages")}
            </CustomText>
            <CustomText style={styles.infoValue}>
              {book?.number_pages || t("common.unknown")}{" "}
              {t("pages.Book.pagesUnit")}
            </CustomText>
          </View>
        </View>

        <View style={[styles.infoItem, { width: isMobile ? "100%" : "45%" }]}>
          <View style={styles.infoIcon}>
            <Ionicons name="calendar-outline" size={20} color="#4CAF50" />
          </View>
          <View style={styles.infoText}>
            <CustomText style={styles.infoLabel}>
              {t("pages.Book.year")}
            </CustomText>
            <CustomText style={styles.infoValue}>
              {!isRTL
                ? book?.publish_year
                : book?.publish_year_fa || t("common.common.unknown")}
            </CustomText>
          </View>
        </View>

        <View style={[styles.infoItem, { width: isMobile ? "100%" : "45%" }]}>
          <View style={styles.infoIcon}>
            <Ionicons name="layers-outline" size={20} color="#4CAF50" />
          </View>
          <View style={styles.infoText}>
            <CustomText style={styles.infoLabel}>
              {t("pages.Book.size")}
            </CustomText>
            <CustomText style={styles.infoValue}>
              {book?.providers[0]?.book_size || t("common.unknown")}
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 18,
    backgroundColor: "#f0f8f0",
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
    marginRight: 16,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
});
