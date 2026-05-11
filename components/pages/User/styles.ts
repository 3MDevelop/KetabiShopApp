// components/pages/User/styles.ts

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
    marginHorizontal: "auto",
    width: "100%",
    maxWidth: 800,
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

  // بخش بالایی (آواتار + فیلدهای کناری)
  desktopTopSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 24,
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  mobileTopSection: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  desktopAvatarWrapper: {
    width: 120,
    alignItems: "center",
  },
  mobileAvatarWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  topFieldsContainer: {
    flex: 1,
    gap: 16,
    marginHorizontal:30
  },
  topFieldRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  topFieldIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f0f7ff",
    alignItems: "center",
    justifyContent: "center",
  },
  topFieldContent: {
    flex: 1,
  },
  topFieldLabel: {
    fontSize: 11,
    color: "#999",
    marginBottom: 4,
  },
  topInput: {
    fontSize: 15,
    color: "#333",
    paddingVertical: 6,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
    textAlign:"center"
  },
  nameRow: {
    flexDirection: "row",
    gap: 16,
  },
  nameField: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  // کارت اطلاعات (فیلدهای پایینی)
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoIcon: {
    width: 40,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  input: {
    fontSize: 15,
    color: "#333",
    paddingVertical: 6,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
  },
  readonlyText: {
    fontSize: 15,
    color: "#333",
    paddingVertical: 6,
  },

  // کانتینر دکمه‌ها
  buttonContainer: {
    gap: 12,
    marginTop: 10,
  },
});