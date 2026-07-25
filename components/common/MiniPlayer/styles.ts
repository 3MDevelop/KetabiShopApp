import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,

    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 12,
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 4,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 14,
  },
  author: {
    fontSize: 11,
    color: "#999",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  controlButton: {
    padding: 4,
  },
});
