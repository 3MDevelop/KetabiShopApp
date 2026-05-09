// components/pages/User/styles.ts

import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
  userInfoCard: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
    marginBottom: 8,
  },
  tokenValue: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
    fontFamily: "monospace",
  },

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 20,
    marginHorizontal: "auto",
    width: "100%",
    maxWidth: 600,
  },
  // حالت خالی (عدم ورود)
  emptyStateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#999",
    marginTop: 10,
    marginBottom: 30,
  },
  // هدر پروفایل
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatarImage: {
    width: 75,
    height: 75,
    borderRadius: 45,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  profilePhone: {
    marginTop:15,
    fontSize: 16,
    color: "#999",
    
  },
  // کارت اطلاعات
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    paddingVertical: 8,
  },
  infoIcon: {
    width: 40,
    marginTop: 20,
  },
  infoContent: {
    flex: 1,
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  halfField: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  input: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 8,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },

  // دکمه ورود
  loginButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  // کانتینر دکمه‌ها
  buttonContainer: {
    gap: 12,
    marginTop: 10,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  // دکمه بروزرسانی
  updateButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
    gap: 10,
  },
  updateButtonDisabled: {
    borderColor: "#ccc",
    opacity: 0.6,
  },
  updateButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  updateButtonTextDisabled: {
    color: "#999",
  },
  // دکمه خروج
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FF3B30",
    gap: 10,
  },
  logoutButtonText: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "600",
  },
});
