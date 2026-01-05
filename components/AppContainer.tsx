import { View, Text, StyleSheet } from "react-native";

export default function AppContainer() {
  return (
    <View style={styles.AppContainer}>
      <Text>AppContainer</Text>
      <Text>AppContainer</Text>
      <Text>AppContainer</Text>
      <Text>AppContainer</Text>
      <Text>AppContainer</Text>
      <Text>AppContainer</Text>
      <Text>AppContainer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  AppContainer: {
    padding: 8,
    flexGrow: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
