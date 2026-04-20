import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import styles from "./styles";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  anchorPosition: { x: number; y: number };
  Colors: any;
  appTheme: string;
};

export default function UserMenu({
  isVisible,
  onClose,
  anchorPosition,
  Colors,
  appTheme,
}: Props) {
  const { user, isLoggedIn, logout } = useAuth();

  const handleLogin = () => {
    onClose();
    router.push("/login");
  };

  const handleProfile = () => {
    onClose();
    router.push("/login");
  };

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  if (!isVisible) return null;

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <View
          style={[
            styles.menuContainer,
            {
              backgroundColor: Colors[appTheme].background,
              top: anchorPosition.y + 50,
              left: anchorPosition.x-45,
            },
          ]}
        >
          {isLoggedIn ? (
            <>
              <View style={styles.userInfo}>
                <Ionicons
                  name="person-circle"
                  size={50}
                  color={Colors[appTheme].primary}
                />
                <View>
                  <Text
                    style={[styles.userName, { color: Colors[appTheme].text }]}
                  >
                    {user?.name}
                  </Text>
                  <Text
                    style={[
                      styles.userEmail,
                      { color: Colors[appTheme].secondaryText || "#666" },
                    ]}
                  >
                    {user?.email}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.menuItem} onPress={handleProfile}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={Colors[appTheme].text}
                />
                <Text
                  style={[styles.menuText, { color: Colors[appTheme].text }]}
                >
                  پروفایل من
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
                <Text style={[styles.menuText, { color: "#FF3B30" }]}>
                  خروج از حساب
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.menuItem} onPress={handleLogin}>
                <Ionicons
                  name="log-in-outline"
                  size={20}
                  color={Colors[appTheme].primary}
                />
                <Text
                  style={[styles.menuText, { color: Colors[appTheme].primary }]}
                >
                  ورود / ثبت‌نام
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
