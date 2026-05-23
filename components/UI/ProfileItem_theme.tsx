import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

export default function ProfileItem_theme() {
  const itemLable = "ظاهر برنامه";
  const itemLogo = "color-palette-sharp";
  const [selectedTheme, setSelectedTheme] = useState("light");

  const themes: {
    id: string;
    name: string;
    icon: IconName;
    activeIcon: IconName;
  }[] = [
    {
      id: "system",
      name: "سیستمی",
      icon: "phone-portrait-outline",
      activeIcon: "phone-portrait",
    },
    { id: "dark", name: "تیره", icon: "moon-outline", activeIcon: "moon" },
    { id: "light", name: "روشن", icon: "sunny-outline", activeIcon: "sunny" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Ionicons
          name={itemLogo as any}
          size={24}
          color="#3996e8"
          style={styles.icon}
        />
        <Text style={styles.title}>{itemLable}</Text>

        <View style={styles.iconGroup}>
          {themes.map((theme, index) => (
            <TouchableOpacity
              key={theme.id}
              style={[styles.iconItem, index === 0 && styles.firstItem]}
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
                size={28}
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
  icon: {
    marginLeft: 12,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  arrowIcon: {
    marginLeft: 12,
  },

  iconGroup: {
    flexDirection: "row",
    gap: 12,
  },
  iconItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
  },
  firstItem: {
    paddingLeft: 0,
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
