import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { useResponsive } from "@/hooks/useResponsive";
import { useRouter } from "expo-router";
import { useRef } from "react";

import styles from "./styles";

export default function NavBar({ Colors, appTheme }: any) {
  const { user, isLoggedIn } = useAuth();
  const { isDesktop } = useResponsive();
  const profileRef = useRef<View>(null);

  const router = useRouter();

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
            onPress={() => {
              router.push("/profile");
            }}
            activeOpacity={0.7}
          >
            {isLoggedIn ? (
              <View
                style={{
                  backgroundColor: Colors[appTheme].primary || "#007AFF",
                  width: 40,
                  height: 40,
                  borderRadius: 25,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 22,
                  marginRight: 3,
                  marginBottom: 5,
                }}
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
                <Text
                  style={{ marginEnd: 10, color: "white", fontWeight: 500 }}
                >
                  دسته بندی
                </Text>
                <Ionicons
                  name="list"
                  size={24}
                  style={[{ color: "#dbdbdb" }]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/offers")}
                style={[styles.dIcon, { marginEnd: 16 }]}
              >
                <Text
                  style={{ marginEnd: 10, color: "white", fontWeight: 500 }}
                >
                  پیشنهادات
                </Text>
                <Ionicons
                  name="ribbon"
                  size={24}
                  style={[{ color: "#dbdbdb" }]}
                />
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
    </>
  );
}
