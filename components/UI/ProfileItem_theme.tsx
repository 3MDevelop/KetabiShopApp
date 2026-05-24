import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslate } from "@/hooks/useTranslation";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

export default function ProfileItem_theme() {
  const [selectedTheme, setSelectedTheme] = useState("light");
  const { isRTL } = useLanguage();
  const { t } = useTranslate();

  const themes: {
    id: string;
    name: string;
    icon: IconName;
    activeIcon: IconName;
  }[] = [
    {
      id: "system",
      name: t('ui.ProfileItem_theme.system') ,
      icon: "phone-portrait-outline",
      activeIcon: "phone-portrait",
    },
    { 
      id: "dark", 
      name: t('ui.ProfileItem_theme.dark'), 
      icon: "moon-outline", 
      activeIcon: "moon" 
    },
    { 
      id: "light", 
      name: t('ui.ProfileItem_theme.light') , 
      icon: "sunny-outline", 
      activeIcon: "sunny" 
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.leftSection}>
          <Ionicons
            name="color-palette-sharp"
            size={24}
            color="#3996e8"
            style={isRTL ? styles.iconRTL : styles.iconLTR}
          />
          <Text style={styles.title}>
            {t('ui.ProfileItem_theme.theme')}
          </Text>
        </View>

        <View style={[
          styles.iconGroup,
          isRTL ? styles.iconGroupRTL : styles.iconGroupLTR
        ]}>
          {themes.map((theme) => (
            <TouchableOpacity
              key={theme.id}
              style={styles.iconItem}
              onPress={() => setSelectedTheme(theme.id)}
            >
              <Text
                style={[
                  styles.iconLabel,
                  selectedTheme === theme.id && styles.iconLabelActive,
                ]}
              >
                {theme.name}
              </Text>
              <Ionicons
                name={
                  selectedTheme === theme.id ? theme.activeIcon : theme.icon
                }
                size={22}
                color={selectedTheme === theme.id ? "#3996e8" : "#999"}
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
  iconGroup: {
    flexDirection: "row",
    gap: 12,
  },
  iconGroupRTL: {
    // حالت RTL: دکمه‌ها به ترتیب معمولی
  },
  iconGroupLTR: {
    // حالت LTR: ترتیب برعکس
    flexDirection: "row-reverse",
  },
  iconItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
  },
  iconLabel: {
    fontSize: 12,
    color: "#999",
  },
  iconLabelActive: {
    color: "#3996e8",
    fontWeight: "500",
  },
});