import { View, Text, StyleSheet } from "react-native";

export default function MobileTopBar() {
  return (
    <View style={styles.MobileTopBar}>
      <Text>MobileTopBar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  MobileTopBar: {
    margin: 16,
    padding: 20,
    backgroundColor: "#f1f2f6",
    borderRadius: 16,
  },
});
