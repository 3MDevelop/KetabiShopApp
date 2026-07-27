// components/common/MiniPlayer/styles.ts
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "100%",
    maxWidth: 1000,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  author: {
    fontSize: 12,
    color: "#999",
  },
  controls: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
    height: "100%",
  },
});