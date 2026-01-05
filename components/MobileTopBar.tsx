import { View, Text, StyleSheet, Image,useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MobileTopBar() {
const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  if (isDesktop) {
    return null;
  }
  return (
    <View style={styles.mobileTopBar}>
      <View>
        <Ionicons
          name="person-circle"
          size={38}
          style={[{ marginLeft: 20, color: "#dbdbdb" }]}
        />
      </View>
      <View style={[{ marginLeft: 10 }]}>
        <Ionicons name="basket" size={28} style={[{ color: "#dbdbdb" }]} />
        <View style={styles.basketBadge}>
          <Text style={styles.badgeText}>99</Text>
        </View>
      </View>

      <View style={[{  marginLeft: 10 }]}>
        <Ionicons name="search" size={28} style={[{ color: "#dbdbdb" }]} />
      </View>

      <Image
        style={[styles.headerLogo,{marginStart: "auto"}]}
        source={require("../assets/images/logo-small.png")}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mobileTopBar: {
    width: "100%",
    backgroundColor: "#646464",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 5, // For Android
    // Flex properties
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    // Font size (for Text components only)
    fontSize: 24,
    // Padding
    paddingTop: 24,
    paddingBottom: 16,
  },
  basketBadge: {
    position: "absolute",
    top: -6,
    right: -3.2,
    backgroundColor: "#dc3545",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 8,
  },
  headerLogo: {
    marginLeft: 4,
    marginRight: 4,
    height: 42,
    width: 100,
    aspectRatio: 1,
  },
});
