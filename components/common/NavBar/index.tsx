import UserAvatar from "@/components/UI/userAvatar";
import { useResponsive } from "@/hooks/useResponsive";
import { useTranslate } from "@/hooks/useTranslation";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import CustomText from "@/components/common/CustomText";
import { useTheme } from "@/context/ThemeContext";

import styles from "./styles";

export default function NavBar({ Colors, appTheme }: any) {
  const { isDesktop } = useResponsive();
  const profileRef = useRef<View>(null);
  const router = useRouter();
  const { t } = useTranslate();
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
                <CustomText
                  style={{ marginEnd: 10, color: "white", fontWeight: 500 }}
                >
                  {t("common.navbar.categories")}
                </CustomText>
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
                <CustomText
                  style={{ marginEnd: 10, color: "white", fontWeight: 500 }}
                >
                  {t("common.navbar.offers")}
                </CustomText>
              </TouchableOpacity>
            </View>
          ) : null}

          <View style={{ marginStart: "auto" }}></View>

          <TouchableOpacity
            onPress={() => {
              router.push("/bookFinder");
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
                <CustomText style={styles.badgeText}>99</CustomText>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginBottom: 5, marginHorizontal: 10 }}
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
