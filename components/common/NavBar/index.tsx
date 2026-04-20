import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import styles from "./styles";

export default function NavBar({ Colors, appTheme }: any) {
  const { user, isLoggedIn } = useAuth();

  const handleProfilePress = () => {
    if (isLoggedIn) {
      router.push("/modal");
    } else {
      router.push("/modal");
    }
  };

  const getInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return "?";
  };

  return (
    <View
      style={[
        styles.NavBarContainer,
        { backgroundColor: Colors[appTheme].background },
      ]}
    >
      <View style={styles.NavBar}>
        <TouchableOpacity onPress={handleProfilePress}>
          {isLoggedIn ? (
            <View
              style={[
                styles.profileCircle,
                { backgroundColor: Colors[appTheme].primary || "#007AFF" },
              ]}
            >
              <Text style={styles.profileInitial}>{getInitial()}</Text>
            </View>
          ) : (
            <Ionicons
              name="person-circle"
              size={45}
              style={[{ marginLeft: 20, color: "#dbdbdb" }]}
            />
          )}
        </TouchableOpacity>

        <View style={[{ marginLeft: 10 }]}>
          <Ionicons
            name="basket"
            size={24}
            style={[{ color: "#dbdbdb", marginBottom: 3 }]}
          />
          <View style={styles.basketBadge}>
            <Text style={styles.badgeText}>99</Text>
          </View>
        </View>

        <View style={[{ marginLeft: 10 }]}>
          <Ionicons
            name="search"
            size={24}
            style={[{ color: "#dbdbdb", marginBottom: 3 }]}
          />
        </View>

        <View style={{ marginHorizontal: "auto" }}></View>

        <TouchableOpacity
          activeOpacity={70}
          style={{ marginBottom: 4 }}
          onPress={() => router.push("/")}
        >
          <Image
            style={[styles.headerLogo]}
            source={require("@/assets/images/icon.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
