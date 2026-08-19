import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function NavbarLogo() {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.replace("/");
      }}
    >
      <Image
        style={[styles.headerLogo, { marginBottom: 4 }]}
        source={require("@/assets/images/icon.png")}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerLogo: {
    height: 64,
    width: 64,
    marginHorizontal: 10,
  },
});
