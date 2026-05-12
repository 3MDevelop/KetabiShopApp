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
    minHeight:260
  },
  columnContainer: {
    flexDirection: "column",
    gap: 16,
  },
  cards: {
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
    justifyContent:"flex-end",
  },
  fullWidth: {
    width: "100%",
  },
  avatar: {
    alignItems: "center",
    marginHorizontal:25
  },
  infoCardForm: {
    flex: 1,
    gap: 16,
    justifyContent:"flex-end",
  },
  formFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  fieldIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f0f7ff",
    alignItems: "center",
    justifyContent: "center",
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 11,
    color: "#999",
    marginBottom: 4,
  },
  fieldInput: {
    fontSize: 15,
    color: "#333",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
    textAlign: "right",
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
  },
  contactText: {
    flex: 1,
    fontSize: 15,
    color: "#555",
    textAlign: "right",
  },
  buttonContainer: {
    gap: 12,
    marginTop: 16,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
    justifyContent:"flex-end"
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
});