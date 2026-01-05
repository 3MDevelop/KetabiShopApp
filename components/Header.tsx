import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>کتابیکا</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: "#2c2c54",
    alignItems: "center",
  },
  logo: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});
