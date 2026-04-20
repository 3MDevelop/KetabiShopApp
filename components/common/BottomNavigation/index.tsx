import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { useRouter, Href, usePathname } from "expo-router"; 
import { useEffect } from "react";

export default function BottomNavigation({
  labels,
  setActivePage,
  activePage,
  Colors,
  appTheme,
}: any) {
  const router = useRouter();
  const pathname = usePathname(); 
  
  const menuItems = [
    { href: "/", icon: "home" as const, label: labels.home, target: "home" },
    {
      href: "/categories",
      icon: "list" as const,
      label: labels.cat,
      target: "category",
    },
    {
      href: "/offers",
      icon: "star" as const,
      label: labels.offer,
      target: "offers",
    },
    {
      href: "/myLibrary",
      icon: "bookmark" as const,
      label: labels.lib,
      target: "library",
    },
  ] as const;

  // همگام‌سازی activePage با مسیر فعلی
  useEffect(() => {
    const currentItem = menuItems.find(item => item.href === pathname);
    if (currentItem && activePage !== currentItem.target) {
      setActivePage(currentItem.target);
    } else if (!currentItem && activePage !== null) {
      setActivePage(null);
    }
  }, [pathname]);

  const isActive = (target: string) => {
    // پیدا کردن آیتم متناسب با مسیر فعلی
    const currentItem = menuItems.find(item => item.href === pathname);
    if (!currentItem) return false;
    return currentItem.target === target;
  };

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: Colors[appTheme].background,
      }}
    >
      <View style={styles.mobileHeader}>
        {menuItems.map((item, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.mBarItem,
              isActive(item.target) && styles.mBarItemActive,
              pressed && styles.mBarItemPressed,
            ]}
            onPress={() => {
              setActivePage(item.target);
              router.push(item.href as Href);
            }}
          >
            <Ionicons
              name={item.icon}
              size={24}
              color={isActive(item.target) ? "#ffffff" : "#dbdbdb"}
            />
            <Text
              style={[
                styles.mBarItemLabel,
                isActive(item.target) && styles.mBarItemLabelActive,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}