import { View, StyleSheet } from "react-native";
import DesktopHeader from "../components/DesktopHeader";
import MobileTopBar from "../components/MobileTopBar";
import AppContainer from "../components/AppContainer";
import MobileHeader from "../components/MobileHeader";

export default function HomeScreen() {

  return (
  <View style={styles.root}>
    <DesktopHeader />
    <MobileTopBar />
    <AppContainer />
    <MobileHeader />
  </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    padding: 0,
    margin: 0,
    flex: 1, 
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#d5e2fd",
  },
});
