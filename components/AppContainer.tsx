import { View, Text, StyleSheet } from "react-native";

export default function AppContainer() {
  return (
    <View style={styles.AppContainer}>
      <Text>AppContainer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  AppContainer: {
    margin: 16,
    padding: 20,
    backgroundColor: "#f1f2f6",
    borderRadius: 16,
  },
});
