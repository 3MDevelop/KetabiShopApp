import { StyleSheet } from "react-native";

export default StyleSheet.create({  overlay: {
    flex: 1,
    
  },
  menuContainer: {
    position: "absolute",
    width: 220,
    borderRadius: 8,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
  },
  userName: {
    fontSize: 14,
    fontWeight: "600",
  },
  userEmail: {
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#cf1f1f",
    marginVertical: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
  },
  menuText: {
    fontSize: 14,
  },
});