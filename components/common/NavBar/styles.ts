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
});
