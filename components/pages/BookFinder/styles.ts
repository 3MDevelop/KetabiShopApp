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
    backgroundColor: "#b61111",
  },
  title: {
    color:"white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    color:"white",
    fontSize: 16,
    lineHeight: 24,
  },
});
