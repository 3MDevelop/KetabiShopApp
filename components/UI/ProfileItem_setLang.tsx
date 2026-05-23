import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslate } from "@/hooks/useTranslation";

export default function ProfileItem_setLang() {
  const { language, setLanguage, isRTL } = useLanguage();
  const { t } = useTranslate();

  const languages = [
    { id: "fa", name: "فارسی" },
    { id: "en", name: "English" },
    { id: "ar", name: "العربية" }, // ✅ اضافه شد
  ];

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.leftSection}>
          <Ionicons
            name="language-sharp"
            size={24}
            color="#3996e8"
            style={isRTL ? styles.iconRTL : styles.iconLTR}
          />
          <Text style={styles.title}>
            {t('profile.language') || "تغییر زبان"}
          </Text>
        </View>

        <View style={styles.languageGroup}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={[
                styles.languageItem,
                language === lang.id && styles.languageItemActive,
              ]}
              onPress={async () => {
                await setLanguage(lang.id as any);
              }}
            >
              <Text
                style={[
                  styles.languageText,
                  language === lang.id && styles.languageTextActive,
                ]}
              >
                {lang.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  innerContainer: {
    padding: 14,
    paddingHorizontal: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconRTL: {
    marginLeft: 0,
    marginRight: 8,
  },
  iconLTR: {
    marginLeft: 8,
    marginRight: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  languageGroup: {
    flexDirection: "row",
    gap: 8,
  },
  languageItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  languageItemActive: {
    backgroundColor: "#3996e8",
    borderColor: "#3996e8",
  },
  languageText: {
    fontSize: 13,
    color: "#666",
  },
  languageTextActive: {
    color: "#fff",
  },
});