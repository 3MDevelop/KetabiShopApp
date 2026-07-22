// app/book/styles.ts
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
  },

  scrollContainer: {
    flex: 1,
  },

  content: {
    width: "100%",
    paddingHorizontal: 12,
    paddingTop: 16,
    maxWidth: 950,
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "stretch",
  },

  
  scrollContent: {
    flexGrow: 1,
  },
  
  
  imageWrapper: {
    position: "relative",
  },
  noImage: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  titleSection: {
    alignItems: "center",
    marginBottom: 12,
  },
  bookTitle: {
    fontWeight: "bold",
    color: "#1a1a1a",
    textAlign: "center",
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
  
  
  wishlistButton: {
    borderColor: "#f44336",
  },
  shareButton: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#7e7e7e",
  },
  
  
  
  
  inStock: {
    color: "#4CAF50",
  },
  outOfStock: {
    color: "#f44336",
  },
  
  
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
  sectionNavbar: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "#e2e2e2",
    marginBottom: 12,
  },
  sectionNavbarItems: {
    borderBottomColor: "orange",
    borderBottomWidth: 2,
    marginHorizontal: 8,
    paddingHorizontal: 8,
  },
  
});
