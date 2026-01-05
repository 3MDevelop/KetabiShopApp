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
    width: "100%",
    padding: 0,
    margin: 0,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden", // or 'visible', 'scroll'
  },
});
