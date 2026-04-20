import { StyleSheet } from "react-native";

export default StyleSheet.create({
  NavBarContainer: {
    position: "relative",
    backgroundColor: "#646464",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  NavBar: {
    width: "100%",
    maxWidth: 950,
    shadowColor: "#000",
    elevation: 5, // For Android
    // Flex properties
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    // Font size (for Text components only)
    fontSize: 24,
    // Padding
    paddingTop: 18,
    paddingBottom: 5,
  },
  basketBadge: {
    position: "absolute",
    top: -6,
    right: -3.2,
    backgroundColor: "#dc3545",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 8,
  },
  headerLogo: {
    marginLeft: 4,
    marginRight: 4,
    height: 64,
    width: 100,
    aspectRatio: 1,
  },
  // به استایل‌های موجود اضافه کن:
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 22,
    marginRight: 3,
    marginBottom:5,
  },
  profileInitial: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
