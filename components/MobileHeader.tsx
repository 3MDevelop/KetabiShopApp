import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MobileHeader() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  if (isDesktop) {
    return null;
  }
  const menuItems = [
    { icon: "home" as const, label: "Home" },
    { icon: "list" as const, label: "Category" },
    { icon: "star" as const, label: "Offers" },
    { icon: "bookmark" as const, label: "My Library" },
  ];
  return (
    <View style={styles.mobileHeader}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.mBarItem}
          onPress={() => console.log(`${item.label} pressed`)}
        >
          <Ionicons
            name={item.icon as any}
            size={24}
            color="rgba(48, 48, 48, 1)"
            style={styles.icon}
          />
          <Text style={styles.mBarItemLable}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  mobileHeader: {
    width: "100%",
    height: 75,
    backgroundColor: "#d9d9d9",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    paddingBottom: 4,
  },
  mBarItem: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "90%",
    minWidth: 90,
    borderRadius: 8,
  },
  mBarItemLable: {
    display: "none",
    color: "#d9d9d9",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
  icon: {
    marginBottom: 4,
  },
});
