import { View,StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import NavbarSeachIcon from "@/components/UI/NavbarSearchIcon";
import NavbarBasketIcon from "@/components/UI/NavbarBasketIcon";
import NavbarUserIcon from "@/components/UI/NavbarUserIcon";
import NavbarLogo from "@/components/UI/NavbarLogo";
import NavbarCategoryIcon from "@/components/UI/NavbarCategoryIcon";
import Spacer from "@/components/UI/Spacer";

export default function NavBar() {
  const { theme } = useTheme();
  return (
    <>
      <View
        style={[
          styles.NavBarContainer,
          { backgroundColor: theme.colors.navBackColor },
        ]}
      >
        <View style={styles.NavBar}>
          <NavbarLogo />
          <NavbarCategoryIcon />
          <Spacer variant="horizontal" />
          <NavbarSeachIcon />
          <NavbarBasketIcon />
          <NavbarUserIcon />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  NavBarContainer: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    height: 120,
  },
  NavBar: {
    width: "100%",
    maxWidth: 950,
    shadowColor: "#000",
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    fontSize: 24,
    paddingTop: 18,
    paddingBottom: 5,
  },
})
