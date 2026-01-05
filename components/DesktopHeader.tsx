import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // or react-native-vector-icons

export default function DesktopHeader() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  // Hide on mobile, show on desktop (768px and above)
  if (!isDesktop) {
    return null;
  }

  return (
    <View style={styles.desktopHeader}>
      <View style={styles.desktopHeaderContainer}>
        <Image
          style={styles.headerLogo}
          source={require("../assets/images/logo-small.png")}
          resizeMode="contain"
        />

        {/* Category */}
        <View style={styles.headerCategory}>
          <Text style={styles.headerText}>دسته بندی</Text>
        </View>

        {/* Special Offer */}
        <View style={styles.headerSpecial}>
          <Text style={styles.headerText}>پیشنهاد ویژه</Text>
        </View>

        {/* Search Icon */}
        <View style={styles.headerSearch}>
          <Ionicons name="search" size={22} color="black" />
        </View>

        {/* Profile Icon */}
        <View style={styles.headerProfile}>
          <Ionicons name="person-circle" size={36} color="black" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  desktopHeader: {
    width: "100%",
    position: "relative",
    paddingHorizontal: 14.4,
    paddingVertical: 9.6,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    backgroundColor: "#d9d9d9",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 5,
  },
  desktopHeaderContainer: {
    maxWidth: 1000,
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 4,
    paddingHorizontal: 0,
  },
  headerCategory: {
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 4,
    padding: 2,
  },
  headerSpecial: {
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 4,
    padding: 2,
  },
  headerLogo: {
    marginLeft: 4,
    marginRight: 4,
    height: 54,
    width: 100,
    aspectRatio: 1,
  },
  headerSearch: {
    marginLeft: 8,
    flexGrow: 1,
    marginRight: 16,
    paddingBottom:6,
    alignItems: "flex-start",
  },
  headerProfile: {
    marginLeft: 8,
    marginRight: 8,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 14,
    color:"rgba(48, 48, 48, 1)"
  },
});
