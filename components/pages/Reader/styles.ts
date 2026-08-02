import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    padding: 20,
    maxWidth: 950,
    width: "100%",
    alignSelf: "center",
  },
  pdfContainer: {
    flex: 1,
    marginTop: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#e9ecef",
  },
  webview: {
    flex: 1,
    backgroundColor: "transparent",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e9ecef",
    zIndex: 1,
  },
});