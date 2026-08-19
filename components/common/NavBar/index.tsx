import { View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import NavbarSeachIcon from "@/components/UI/NavbarSearchIcon";
import NavbarBasketIcon from "@/components/UI/NavbarBasketIcon";
import NavbarUserIcon from "@/components/UI/NavbarUserIcon";
import styles from "./styles";
import NavbarLogo from "@/components/UI/NavbarLogo";
import NavbarCategoryIcon from "@/components/UI/NavbarCategoryIcon";

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

          <View style={{ marginStart: "auto" }}></View>

          <NavbarSeachIcon />
          <NavbarBasketIcon />
          <NavbarUserIcon />
        </View>
      </View>
    </>
  );
}
