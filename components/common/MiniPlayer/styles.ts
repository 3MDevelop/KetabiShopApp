import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 86,
    borderTopWidth: 1,
    borderTopColor: "#575757",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    alignItems:"center"
  },
  content: {
    width:"100%",
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
  
  title: {
    fontSize: 14,
  },
  author: {
    fontSize: 11,
    color: "#999",
  },
  controls: {
    height:"100%",
    flexDirection: "row",
    justifyContent:"flex-end",
    alignItems: "center",
    gap: 8,
    
  },
  controlButton: {
    padding: 4,
  },
});
