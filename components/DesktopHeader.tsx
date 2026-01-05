import { View, Text, StyleSheet } from "react-native";

export default function DesktopHeader() {
  return (
    <View style={styles.DesktopHeader}>
      <Text>DesktopHeader</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  DesktopHeader: {
    margin: 16,
    padding: 20,
    backgroundColor: "#f1f2f6",
    borderRadius: 16,
  },
});
