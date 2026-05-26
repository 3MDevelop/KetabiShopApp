import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    
  },
  content: {
    padding: 16,
    width: "100%",
    alignSelf: "center",
    maxWidth: 500,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "right",
  },
  codeHint: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "right",
  },
  findButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  qrButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  bookInfoContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  bookInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  bookInfoText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    textAlign: "right",
  },
  bookPageBtn: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop:15,
    alignSelf:"flex-end"
  },

  bookHeader: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },
  bookImage: {
    width: 150,
    height: 150 * 1.4,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  noImage: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  bookDetails: {
    flex: 1,
    justifyContent: "center",
  },
  boldText: {
    fontWeight: "bold",
    color: "#333",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },

  bookAddBtn: {
    backgroundColor: "orange",
    padding: 8,
    borderRadius: 8,
  },
  btnContainer: {
    flexDirection: "row",
    gap: 15,
    marginHorizontal: "auto",
  },

addCodeContainer: {
  backgroundColor: "#fff",
  borderRadius: 16,
  padding: 16,
  marginVertical: 12,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 3,
},
addCodeHeader: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  marginBottom: 12,
},
addCodeTitle: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#333",
},
addCodeDescription: {
  fontSize: 13,
  color: "#999",
  marginBottom: 16,
  lineHeight: 18,
},
addCodeLabel: {
  fontSize: 14,
  color: "#666",
  marginBottom: 8,
},
addCodeInputWrapper: {
  marginTop:15,
  flexDirection: "row",
  gap: 10,
},
addCodeInput: {
  flex: 1,
  borderWidth: 1,
  borderColor: "#e0e0e0",
  borderRadius: 10,
  paddingHorizontal: 12,
  paddingVertical: 12,
  fontSize: 14,
  color: "#333",
  textAlign: "center",
},
addCodeButton: {
  backgroundColor: "#4CAF50",
  paddingHorizontal: 20,
  paddingVertical: 12,
  borderRadius: 10,
  justifyContent: "center",
},
addCodeButtonText: {
  color: "#fff",
  fontWeight: "bold",
},
scanButton: {
  backgroundColor: "#2196F3",
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 10,
},
scanButtonText: {
  color: "#fff",
  fontWeight: "bold",
},
verifyButton: {
  backgroundColor: "#4CAF50",
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: "center",
  marginTop: 16,
},
verifyButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},

});
