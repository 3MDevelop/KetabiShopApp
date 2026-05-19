// app/book/styles.ts
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const isMobile = width < 768;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },

  headerContainer:{
    paddingHorizontal:20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  scrollContent: {
    flexGrow: 1,
  },
  // هدر
  header: {
    width:"100%",
    maxWidth:900,
    alignSelf:"center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  content: {
    padding: isMobile ? 16 : 24,
    maxWidth: isMobile ? "100%" : 800,
    alignSelf: "center",
    width: "100%",
  },
  // بخش تصویر
  imageSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  imageWrapper: {
    position: "relative",
  },
  detailImage: {
    width: isMobile ? 180 : 220,
    height: isMobile ? 270 : 330,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
  },
  noImage: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  discountBadge: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#f44336",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  discountBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  // بخش عنوان
  titleSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  bookTitle: {
    fontSize: isMobile ? 22 : 26,
    fontWeight: "bold",
    color: "#1a1a1a",
    textAlign: "center",
    lineHeight: isMobile ? 32 : 38,
    marginBottom: 8,
  },
  authorWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  bookAuthor: {
    fontSize: 15,
    color: "#999",
  },
  // بخش قیمت
  priceSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  priceWrapper: {
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  oldPrice: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
    marginBottom: 4,
  },
  finalPrice: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  singlePrice: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  cartButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  wishlistButton: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e8e8e8",
  },
  wishlistActive: {
    backgroundColor: "#fff0f0",
    borderColor: "#f44336",
  },
  // کارت اطلاعات
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  infoItem: {
    flexDirection: "row",
    width: isMobile ? "100%" : "48%",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f0f8f0",
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  inStock: {
    color: "#4CAF50",
  },
  outOfStock: {
    color: "#f44336",
  },
  // توضیحات
  descriptionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  descriptionText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 24,
    textAlign: "justify",
  },
  // حالت بارگذاری
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#999",
  },
  // حالت خطا
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 24,
  },
  errorIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 24,
  },
  errorBackButton: {
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    gap: 8,
  },
  errorBackText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});