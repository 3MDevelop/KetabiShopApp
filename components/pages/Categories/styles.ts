import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
    maxWidth: 950,
    alignSelf: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "right",
  },
  description: {
    lineHeight: 24,
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "right",
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },

  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  listContainer: {
    padding: 16,
  },
});
