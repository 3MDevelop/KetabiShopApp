import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { useResponsive } from "@/hooks/useResponsive";
import { useRouter } from "expo-router";
import { useState, useRef } from "react";

import DropdownMenu from "../UserDropMenu";
import styles from "./styles";

export default function NavBar({ Colors, appTheme }: any) {
  const { user, isLoggedIn } = useAuth();
  const { isDesktop } = useResponsive();
  const [menuVisible, setMenuVisible] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState({ x: 0, y: 0 });
  const profileRef = useRef<View>(null);

  const router = useRouter();

  const handleProfilePress = () => {
    if (isDesktop) {
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
          <TouchableOpacity
            onPress={() => {
              router.push("/basket");
            }}
          >
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
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("/search");
            }}
          >
            <View style={[{ marginLeft: 10 }]}>
              <Ionicons
                name="search"
                size={24}
                style={[{ color: "#dbdbdb", marginBottom: 3 }]}
              />
            </View>
          </TouchableOpacity>

          <View style={{ marginStart: "auto" }}></View>

          {isDesktop ? (
            <View style={[styles.dIcoContainer]}>
              <TouchableOpacity
                onPress={() => router.push("/categories")}
                style={styles.dIcon}
              >
                <Ionicons
                  name="search"
                  size={24}
                  style={[{ color: "#dbdbdb" }]}
                />
                <Text
                  style={{
                    fontSize: 16,
                    marginEnd: 4,
                    paddingBottom: 3,
                    color: "#dbdbdb",
                    fontWeight: "bold",
                  }}
                >
                  Categuries
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/offers")}
                style={[styles.dIcon, { marginEnd: 16 }]}
              >
                <Ionicons
                  name="search"
                  size={24}
                  style={[{ color: "#dbdbdb" }]}
                />
                <Text
                  style={{
                    fontSize: 16,
                    marginEnd: 4,
                    paddingBottom: 3,
                    color: "#dbdbdb",
                    fontWeight: "bold",
                  }}
                >
                  Offers
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

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
