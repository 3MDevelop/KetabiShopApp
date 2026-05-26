import { useLanguage } from "@/context/LanguageContext";
import { useTranslate } from "@/hooks/useTranslation";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "@/components/common/CustomText";
import { useTheme } from "@/context/ThemeContext";

export default function ProfileItem_setLang() {
  const { language, setLanguage, isRTL } = useLanguage();
  const { t } = useTranslate();
  const { theme } = useTheme();

  const languages = [
    { id: "fa", name: "فارسی" },
    { id: "en", name: "English" },
  ];

  return (
    <View
      style={styles.container}
    >
      <View style={[styles.innerContainer, { backgroundColor: theme.colors.itemBack }]}>
        <View style={styles.leftSection}>
          <Ionicons
            name="language-sharp"
            size={24}
           color={theme.colors.iconColor}
            style={isRTL ? styles.iconRTL : styles.iconLTR}
          />
          <CustomText style={[styles.title, { color: theme.colors.text }]}>
            {t("ui.ProfileItem_setLang.language")}
          </CustomText>
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
              <CustomText
                style={[
                  styles.languageText,
                  language === lang.id && styles.languageTextActive,
                ]}
              >
                {lang.id}
              </CustomText>
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
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconRTL: {
    marginLeft: 12,
    marginRight: 0,
  },
  iconLTR: {
    marginLeft: 0,
    marginRight: 12,
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
