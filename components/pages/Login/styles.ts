// styles.ts
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
    marginHorizontal: "auto",
    width: "100%",
    maxWidth: 1000,

    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    paddingHorizontal: 18,
    marginBottom: 15,
    fontSize: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    color: "#333",
    textAlign: "auto",
  },
  loginButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 8,
    
    alignItems: "center",
    marginBottom: 8,
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

  // استایل‌های اضافه شده از Login.tsx
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },

  cardContainer: {
    backgroundColor: "#ececec22",
    width: 300,
    height: 500,
    borderRadius: 8,
    padding: 16,
    justifyContent: "space-around",
    alignContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  cardContainerLoggedIn: {
    backgroundColor: "#ececec22",
    width: 300,
    height: 300,
    borderRadius: 8,
    padding: 16,
    justifyContent: "space-around",
    alignContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  avatarContainer: {
    width: "30%",
    aspectRatio: 1,
    marginTop: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadada",
    borderRadius: "50%",
    marginHorizontal: "auto",
    padding: 12,
  },

  avatarContainerLoggedIn: {
    width: "30%",
    aspectRatio: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadada",
    borderRadius: "50%",
    marginHorizontal: "auto",
    padding: 12,
  },

  welcomeText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },

  redirectText: {
    marginTop: 10,
    fontWeight: "300",
    textAlign: "center",
  },

  activityIndicator: {
    marginTop: 20,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    gap: 10,
    marginTop: "auto",
    marginBottom: 30,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#2196f3",
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxChecked: {
    backgroundColor: "#2196f3",
  },

  checkboxText: {
    color: "white",
    fontSize: 14,
  },

  rulesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 5,
    alignItems: "center",
    paddingTop: 5,
  },

  rulesText: {
    color: "#333",
    fontSize: 14,
  },

  rulesLink: {
    color: "#2196f3",
    fontSize: 14,
    fontWeight: "500",
  },

  codeInputContainer: {
    width: "100%",
  },

  backButton: {
    marginTop: 10,
  },

  backButtonText: {
    color: "#2196f3",
    fontSize: 14,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 20,
    textAlign: "center",
  },

  disabledButton: {
    backgroundColor: "#6b6b6b",
  },

  cardContainerWithCode: {
    backgroundColor: "#ececec22",
    width: 300,
    minHeight: 580,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  titleWithMargin: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
    paddingTop: 15,
  },

  buttonWithMargin: {
    marginBottom: 20,
    width: "100%",
  },
});
