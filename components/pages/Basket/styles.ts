// components/pages/Basket/styles.ts

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    
  },
  content: {
    padding: 20,
    width: "100%",
    maxWidth: 850,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },

  // هدر
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  badge: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },

  // حالت خالی سبد
  emptyCartContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginTop: 20,
  },
  emptyCartTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  emptyCartText: {
    fontSize: 15,
    color: "#999",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  shopButton: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  shopButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // لیست سبد خرید
  cartListContainer: {
    marginBottom: 20,
    gap: 12,
  },
  cartCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cartItemInfo: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 15,
  },
  bookIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f7ff",
    alignItems: "center",
    justifyContent: "center",
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  cartItemAuthor: {
    fontSize: 13,
    color: "#999",
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
  cartItemActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  quantityButton: {
    backgroundColor: "#007AFF",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    minWidth: 30,
    textAlign: "center",
  },
  removeButton: {
    padding: 8,
  },

  // بخش پرداخت
  checkoutCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 15,
    color: "#999",
  },
  totalPrice: {
    fontSize: 15,
    color: "#666",
  },
  finalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  finalPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 15,
  },
  checkoutButton: {
    flexDirection: "row",
    backgroundColor: "#28a745",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 15,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginHint: {
    textAlign: "center",
    color: "#FF3B30",
    fontSize: 13,
    marginTop: 12,
  },

  // دکمه ادامه خرید
  continueShoppingButton: {
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  continueShoppingText: {
    color: "#007AFF",
    fontSize: 15,
    fontWeight: "500",
  },

  // اضافه کردن به استایل‌های موجود

  productIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  productHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  productTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  productTypeText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  productDuration: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
    marginBottom: 4,
  },
  unitPrice: {
    fontSize: 12,
    color: "#999",
    minWidth: 80,
    textAlign: "center",
  },

  // اضافه کردن به styles.ts

  quantityButtonDisabled: {
    opacity: 0.5,
  },
  singleItemBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#e8f5e9",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  singleItemText: {
    fontSize: 12,
    color: "#28a745",
    fontWeight: "500",
  },
  digitalBadge: {
    fontSize: 11,
    color: "#666",
    marginTop: 2,
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
  },
});
