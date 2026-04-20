import { View, Text, Image, TouchableOpacity, Platform } from "react-native"; // ✅ Platform اضافه شد
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { useResponsive } from "@/hooks/useResponsive";
import { router } from "expo-router";
import { useState, useRef } from "react";
import UserMenu from "../UserMenu";
import styles from "./styles";

export default function NavBar({ Colors, appTheme }: any) {
  const { user, isLoggedIn } = useAuth();
  const { isDesktop, isMobile, isWeb } = useResponsive(); // ✅ isWeb اضافه شد
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const userIconRef = useRef<View>(null);

  const handleUserIconPress = () => {
    console.log("Device info:", {
      isDesktop,
      isMobile,
      isWeb,
      Platform: Platform.OS,
    });
    
    if (isDesktop) {
      // در دسکتاپ: اندازه‌گیری موقعیت آیکون و نمایش منو
      if (userIconRef.current) {
        userIconRef.current.measure((fx, fy, width, height, px, py) => {
          setMenuPosition({ x: px + width, y: py });
          setIsMenuVisible(true);
        });
      } else {
        setMenuPosition({ x: 100, y: 60 });
        setIsMenuVisible(true);
      }
    } else {
      // در موبایل: رفتن به صفحه پروفایل
      router.push("/login");
    }
  };

  const getInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return "?";
  };

  return (
    <>
      <View
        style={[
          styles.NavBarContainer,
          { backgroundColor: Colors[appTheme].background },
        ]}
      >
        <View style={styles.NavBar}>
          {/* دکمه پروفایل */}
          <TouchableOpacity
            ref={userIconRef}
            onPress={handleUserIconPress}
            activeOpacity={0.7}
          >
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
            style={[
              styles.headerLogo,
              { marginStart: "auto", marginBottom: 4 },
            ]}
            source={require("@/assets/images/icon.png")}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* منوی کاربری (فقط در دسکتاپ) */}
      {isDesktop && (
        <UserMenu
          isVisible={isMenuVisible}
          onClose={() => setIsMenuVisible(false)}
          anchorPosition={menuPosition}
          Colors={Colors}
          appTheme={appTheme}
        />
      )}
    </>
  );
}