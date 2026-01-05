import { View, Text, StyleSheet, Image,useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export default function DesktopHeader() {

const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  if (isDesktop) {
    return null;
  }
  return (
    <View style={styles.DesktopHeader}>
      <Text>MobileHeader</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  DesktopHeader: {
    backgroundColor: "#1039ddff",
  },
});
