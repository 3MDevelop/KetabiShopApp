import { StyleSheet } from "react-native";

export default StyleSheet.create({
  NavBarContainer: {
    position: "relative",
    backgroundColor: "#646464",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    height: 120,
  },
  NavBar: {
    width: "100%",
    maxWidth: 950,
    shadowColor: "#000",
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    fontSize: 24,
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
    height: 64,
    width: 64,
    marginHorizontal: 10,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 22,
    marginRight: 3,
  },
  profileInitial: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  dIcoContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  dIcon: {
    flexDirection: "row",
  },
  NavBarRTL: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  NavBarLTR: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
});
