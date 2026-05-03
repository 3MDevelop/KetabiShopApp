import { StyleSheet } from "react-native";

export default StyleSheet.create({
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginHorizontal: "auto",
    width: "100%",
    maxWidth: 1000,

    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  input: {
    textAlign: "right",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    paddingHorizontal: 18,
    marginBottom: 15,
    fontSize: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  loginButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 8,
    paddingBottom:12,
    alignItems: "center",
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "#FF3B30",
    textAlign: "center",
    marginBottom: 10,
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    width: 80,
  },
  value: {
    fontSize: 16,
    color: "#666",
    flex: 1,
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
    opacity: 0.7,
  },
});
