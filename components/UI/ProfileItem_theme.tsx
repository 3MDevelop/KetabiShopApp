// components/UI/ProfileItem_theme.tsx
import { useTheme } from "@/context/ThemeContext";
import { useTranslate } from "@/hooks/useTranslation";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "@/components/common/CustomText";

export default function ProfileItem_theme() {
  const { themeMode, setThemeMode, theme } = useTheme();
  const { t } = useTranslate();

  const themes = [
    { id: "light", icon: "sunny-outline" },
    { id: "dark", icon: "moon-outline" },
    { id: "system", icon: "phone-portrait-outline" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.itemBack }]}>
      <View style={styles.innerContainer}>
        <View style={styles.leftSection}>
          <Ionicons
            name="color-palette-sharp"
            size={24}
            color={theme.colors.iconColor}
          />
          <CustomText style={[styles.title, { color: theme.colors.text }]}>
            {t("ui.ProfileItem_theme.theme")}
          </CustomText>
        </View>

        <View style={styles.themeGroup}>
          {themes.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.themeItem,
                themeMode === item.id && styles.themeItemActive,
                { borderColor: theme.colors.border },
              ]}
              onPress={() => setThemeMode(item.id as any)}
            >
              <Ionicons
                name={item.icon as any}
                size={20}
                color={
                  themeMode === item.id
                    ? theme.colors.primary
                    : theme.colors.textSecondary
                }
              />
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
    borderRadius: 12,
  },
  innerContainer: {
    padding: 14,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginHorizontal: 12,
  },
  themeGroup: {
    flexDirection: "row",
    gap: 12,
  },
  themeItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  themeItemActive: {
    backgroundColor: "#007AFF15",
    borderColor: "#007AFF",
  },
  themeText: {
    fontSize: 12,
  },
});
