import { StyleSheet } from "react-native";

export default StyleSheet.create({
  mobileHeader: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  mBarItem: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    minWidth: 70,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 10,
  },
  mBarItemActive: {
    backgroundColor: "#3498db",
  },
  mBarItemPressed: {
    opacity: 0.8,
  },
  mBarItemLabel: {
    opacity: 0,
    color: "#ffffff",
    fontSize: 12,
    marginTop: -15,
    fontWeight: "500",
  },
  mBarItemLabelActive: {
    opacity: 1,
    marginTop: 0,
  },
});
