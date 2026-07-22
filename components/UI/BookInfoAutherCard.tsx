import { StyleSheet, View } from "react-native";
import CustomText from "@/components/common/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { useTranslate } from "@/hooks/useTranslation";

interface BookInfoAutherCardProps {
  publisher?: string;
  auther?: string;
}

export default function BookInfoAutherCard({
  publisher,
  auther,
}: BookInfoAutherCardProps) {
  const { t } = useTranslate();
  return (
    <View style={[{ marginTop: 32, marginBottom: 50, marginEnd: 8 }]}>
      <View style={[styles.infoItem, { marginBottom: 16 }]}>
        <View style={styles.autherInfoIcon}>
          <Ionicons name="person-outline" size={20} color="#fff" />
        </View>
        <View style={styles.infoText}>
          <CustomText
            variant="discription"
            bold
            style={[styles.infoLabel, { fontSize: 16 }]}
          >
            {t("pages.Book.auther")}
          </CustomText>
          <CustomText
            variant="discription"
            bold
            style={[styles.infoValue, { fontSize: 18 }]}
          >
            {auther || t("pages.Book.unknownAuthor")}
          </CustomText>
        </View>
      </View>
      <View style={[styles.infoItem]}>
        <View style={styles.autherInfoIcon}>
          <Ionicons name="book-outline" size={20} color="#fff" />
        </View>
        <View style={styles.infoText}>
          <CustomText
            variant="discription"
            bold
            style={[styles.infoLabel, { fontSize: 16 }]}
          >
            {t("pages.Book.publisher")}
          </CustomText>
          <CustomText
            variant="discription"
            bold
            style={[styles.infoValue, { fontSize: 18 }]}
          >
            {publisher || t("common.common.unknown")}
          </CustomText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  autherInfoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
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
  infoText: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
  },
});
