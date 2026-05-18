import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    width:"100%",
    maxWidth:900,
    alignSelf:"center"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#666",
    marginTop: 16,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  backText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 32,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  detailImage: {
    width: 200,
    height: 300,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
  },
  noImage: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    flexWrap: "wrap",
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginLeft: 8,
    width: 100,
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  discountPrice: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  inStock: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  outOfStock: {
    color: "#f44336",
    fontWeight: "600",
  },
  descriptionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
    textAlign: "justify",
  },
});