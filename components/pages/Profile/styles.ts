// styles/Profile.styles.ts
import { StyleSheet, Dimensions } from "react-native";

Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    height: 250,
    overflow: "hidden",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  headerContent: {
    alignItems: "center",
    zIndex: 10,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  userInfoContainer: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    alignItems: "center",
  },

  loginButton: {
    padding: 10,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  progressBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#ff6b35",
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  bottomContainer: {
    marginTop: 25,
    display: "flex",
    paddingHorizontal: 64,
    marginBottom: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "auto",
    width: "100%",
    maxWidth: 700,
  },
});
