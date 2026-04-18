import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import styles from './styles';

export default function NavBar({ Colors, appTheme }: any) {
  const { user, isLoggedIn } = useAuth();

  const handleProfilePress = () => {
    if (isLoggedIn) {
      // اگر لاگین است، برو به صفحه پروفایل (modal)
      router.push("/modal");
    } else {
      // اگر لاگین نیست، برو به صفحه لاگین
      router.push("/modal");
    }
  };

  // گرفتن اولین حرف نام کاربر برای نمایش در دایره
  const getInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return "?";
  };

  return (
    <View style={[styles.NavBarContainer, { backgroundColor: Colors[appTheme].background }]}>
      <View style={styles.NavBar}>
        
        {/* دکمه پروفایل - تغییر کرده */}
        <TouchableOpacity onPress={handleProfilePress}>
          {isLoggedIn ? (
            // اگر لاگین است: دایره با حرف اول نام
            <View style={[styles.profileCircle, { backgroundColor: Colors[appTheme].primary || "#007AFF" }]}>
              <Text style={styles.profileInitial}>{getInitial()}</Text>
            </View>
          ) : (
            // اگر لاگین نیست: آیکون person-circle
            <Ionicons
              name="person-circle"
              size={45}
              style={[{ marginLeft: 20, color: "#dbdbdb" }]}
            />
          )}
        </TouchableOpacity>

        {/* سبد خرید */}
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

        {/* جستجو */}
        <View style={[{ marginLeft: 10 }]}>
          <Ionicons
            name="search"
            size={24}
            style={[{ color: "#dbdbdb", marginBottom: 3 }]}
          />
        </View>

        {/* لوگو */}
        <Image
          style={[styles.headerLogo, { marginStart: "auto", marginBottom: 4 }]}
          source={require("@/assets/images/icon.png")}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}