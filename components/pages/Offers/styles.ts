import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
   
  },
  content: {
    padding: 20,
    maxWidth: 950,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },

  toast:{
    padding: 12,
              borderRadius: 8,
              marginTop: 20,
              marginHorizontal: "auto",
              maxWidth: 400,
              minWidth:250,
  }
});
