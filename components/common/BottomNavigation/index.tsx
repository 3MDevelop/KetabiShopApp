import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { Href, usePathname, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo } from "react";
import { Pressable, View } from "react-native";
import Toast from "react-native-toast-message";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";

export default function BottomNavigation({
  labels,
  setActivePage,
  activePage,
  Colors,
  appTheme,
}: any) {
  const router = useRouter();
  const pathname = usePathname();

  const showToast = () => {
    Toast.show({
      type: "error",
      text1: "برای مشاهده این بخش ابتدا به حساب کاربری وارد شوید",
      position: "top",
      topOffset: 20,
      visibilityTime: 3000,
    });
  };

  const { isLoggedIn } = useAuth();

  const menuItems = useMemo(
    () => [
      { href: "/", icon: "home" as const, label: labels.home, target: "home" },
      {
        href: "/categories",
        icon: "list" as const,
        label: labels.cat,
        target: "category",
      },
      {
        href: "/bookFinder",
        icon: "search" as const,
        label: labels.offer,
        target: "bookFinder",
      },
      {
        href: "/offers",
        icon: "star" as const,
        label: labels.offer,
        target: "offers",
      },
    ],
    [labels.home, labels.cat, labels.offer],
  );

  // تابع همگام‌سازی با useCallback
  const syncActivePage = useCallback(() => {
    // بررسی برای myLibrary
    if (pathname === "/myLibrary") {
      if (activePage !== "myLibrary") {
        setActivePage("myLibrary");
      }
      return;
    }

    const currentItem = menuItems.find((item) => item.href === pathname);
    if (currentItem && activePage !== currentItem.target) {
      setActivePage(currentItem.target);
    } else if (!currentItem && activePage !== null) {
      setActivePage(null);
    }
  }, [pathname, activePage, setActivePage, menuItems]);

  // همگام‌سازی activePage با مسیر فعلی
  useEffect(() => {
    syncActivePage();
  }, [syncActivePage]);

  const isActive = useCallback(
    (target: string) => {
      // بررسی برای myLibrary
      if (target === "myLibrary") {
        return pathname === "/myLibrary";
      }
      const currentItem = menuItems.find((item) => item.href === pathname);
      if (!currentItem) return false;
      return currentItem.target === target;
    },
    [pathname, menuItems],
  );

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
            <CustomText
              style={[
                styles.mBarItemLabel,
                isActive(item.target) && styles.mBarItemLabelActive,
              ]}
            >
              {item.label}
            </CustomText>
          </Pressable>
        ))}
        <Pressable
          style={({ pressed }) => [
            styles.mBarItem,
            isActive("myLibrary") && styles.mBarItemActive,
            pressed && styles.mBarItemPressed,
          ]}
          onPress={() => {
            if (isLoggedIn) {
              setActivePage("myLibrary");
              router.push("/myLibrary");
            } else {
              showToast();
            }
          }}
        >
          <Ionicons
            name={"library"}
            size={24}
            color={isActive("myLibrary") ? "#ffffff" : "#dbdbdb"}
          />
          <CustomText
            style={[
              styles.mBarItemLabel,
              isActive("myLibrary") && styles.mBarItemLabelActive,
            ]}
          ></CustomText>
        </Pressable>
      </View>
    </View>
  );
}
