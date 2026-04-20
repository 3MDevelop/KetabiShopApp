import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { useResponsive } from "@/hooks/useResponsive";
import { router } from "expo-router";
import { useState, useRef } from "react";
import DropdownMenu from "../UserDropMenu";
import styles from "./styles";

export default function NavBar({ Colors, appTheme }: any) {
  const { user, isLoggedIn } = useAuth();
  const { isDesktop } = useResponsive();
  const [menuVisible, setMenuVisible] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState({ x: 0, y: 0 });
  const profileRef = useRef<View>(null);

  const handleProfilePress = () => {
    if (isDesktop) {
      // در دسکتاپ: منوی dropdown را باز کن
      if (profileRef.current) {
        profileRef.current.measure((fx, fy, width, height, px, py) => {
          setAnchorPosition({ x: px + width, y: py + height });
          setMenuVisible(true);
        });
      } else {
        setAnchorPosition({ x: 100, y: 60 });
        setMenuVisible(true);
      }
    } else {
      // در موبایل: به صفحه پروفایل برو
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
            ref={profileRef}
            onPress={handleProfilePress}
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

          <View style={{ marginStart: "auto" }}></View>

          {/* لوگو */}
          <TouchableOpacity
          onPress={() => router.push("/")}
          >
            <Image
              style={[styles.headerLogo, { marginBottom: 4 }]}
              source={require("@/assets/images/icon.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <DropdownMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        anchorPosition={anchorPosition}
        Colors={Colors}
        appTheme={appTheme}
      />
    </>
  );
}
