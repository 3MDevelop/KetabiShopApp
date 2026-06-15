import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    width:"100%",
    padding: 20,
    maxWidth: 950,
    alignSelf: "center",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
