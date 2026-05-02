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
    width: 120,
    aspectRatio: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInner: {
    width: "70%",
    aspectRatio: 1,
    borderRadius: 999,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  userIconContainer: {
    backgroundColor: "#007AFF",
    width: 70,
    height: 70,
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  userIconText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  guestIcon: {
    marginTop: 2,
    color: "#dbdbdb",
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
  userName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
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
  
});