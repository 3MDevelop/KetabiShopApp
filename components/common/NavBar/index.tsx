import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useResponsive } from "@/hooks/useResponsive";
import { useRouter } from "expo-router";
import { useRef } from "react";
import UserAvatar from "@/components/UI/userAvatar";

import styles from "./styles";

export default function NavBar({ Colors, appTheme }: any) {
  const { isDesktop } = useResponsive();
  const profileRef = useRef<View>(null);
  const router = useRouter();
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

          {isDesktop ? (
            <View style={[styles.dIcoContainer]}>
              <TouchableOpacity
                onPress={() => router.push("/categories")}
                style={styles.dIcon}
              >
                <Ionicons
                  name="list"
                  size={24}
                  style={[{ color: "#dbdbdb" }]}
                />
                <Text
                  style={{ marginEnd: 10, color: "white", fontWeight: 500 }}
                >
                  دسته بندی
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/offers")}
                style={[styles.dIcon, { marginEnd: 16 }]}
              >
                <Ionicons
                  name="ribbon"
                  size={24}
                  style={[{ color: "#dbdbdb" }]}
                />
                <Text
                  style={{ marginEnd: 10, color: "white", fontWeight: 500 }}
                >
                  پیشنهادات
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/bookFinder")}
                style={[styles.dIcon, { marginEnd: 16 }]}
              >
                <Ionicons
                  name="book"
                  size={24}
                  style={[{ color: "#dbdbdb" }]}
                />
                <Text
                  style={{ marginEnd: 10, color: "white", fontWeight: 500 }}
                >
                  کتاب یاب
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <View style={{ marginStart: "auto" }}></View>

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
            style={{ marginBottom: 5, marginStart: 10 }}
            ref={profileRef}
            onPress={() => {
              router.push("/profile");
            }}
            activeOpacity={0.7}
          >
            <UserAvatar iconWidth={50} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
