import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  content: {
    width: "100%",
    maxWidth: 950,
    alignSelf: "center",
    gap: 16,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 16,
    minHeight: 260,
  },
  columnContainer: {
    flexDirection: "column",
    gap: 16,
  },
  cards: {
    overflow: "hidden",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  doubleSize: {
    flex: 2,
  },
  normalSize: {
    flex: 1,
    justifyContent: "flex-end",
  },
  fullWidth: {
    width: "100%",
  },
  avatar: {
    alignItems: "center",
    marginHorizontal: 25,
  },
  infoCardForm: {
    overflow: "hidden",
    flex: 1,
    gap: 16,
    justifyContent: "flex-end",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  contactField: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
    paddingEnd:8
    
  },
  contactText: {
    flex: 1,
    fontSize: 15,
    color: "#555",
    textAlign: "right",
    marginEnd:8
  },
  buttonContainer: {
    gap: 12,
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "flex-end",
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 30,
  },

  infoCardLogo: {
    position: "absolute",
    opacity: 0.04,
    transform: [{ rotate: "35deg" }],
  },

  userIDContainer: {
    minWidth: 120,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#bebebead",
    padding: 8,
    paddingTop: 16,
    borderRadius: 8,
  },
  userIDCotent: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    position: "absolute",
    alignSelf: "center",
    top: -18,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  userIDLogo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#969696",
  },
  userIDText: {
    fontWeight: 700,
    fontSize: 18,
    fontStyle: "normal",
    letterSpacing: 4,
    alignSelf: "center",
    color: "#007AFF",
  },
  infoCardHeader: {
    width: "130%",
    height: "100%",
    position: "absolute",
    right: "-15%",
    top: "-85%",
    borderRadius: 33,
    /* backgroundColor: "#000", */
    borderWidth: 5,
    borderStyle: "dashed",
    borderColor: "#000",

    opacity: 0.04,
    transform: [{ rotate: "15deg" }, { skewX: "-20deg" }],
  },
  infoCardLogoContent: {
    position: "absolute",
    left: "3%",
    top: "-2%",
    opacity: 0.08,
  },
});
