import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import styles from "./styles"

type Props = {
  visible: boolean;
  onClose: () => void;
  anchorPosition: { x: number; y: number };
  Colors: any;
  appTheme: string;
};

export default function DropdownMenu({ visible, onClose, anchorPosition, Colors, appTheme }: Props) {
  const { user, isLoggedIn, logout } = useAuth();

  const handleProfile = () => {
    onClose();
    router.push("/login");
  };

  const handleLogout = async () => {
    onClose();
    await logout();
    router.push("/");
  };

  const handleLogin = () => {
    onClose();
    router.push("/login");
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
      style={styles.container}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View
          style={[
            styles.dropdown,
            {
              top: anchorPosition.y,
              left: anchorPosition.x - 40,
              backgroundColor: Colors[appTheme].background,
              borderColor: Colors[appTheme].border || "#ddd",
            },
          ]}
        >
          {isLoggedIn ? (
            <>
              {/* نمایش اطلاعات کاربر */}
              <View style={styles.userInfo}>
                <View style={[styles.avatar, { backgroundColor: Colors[appTheme].primary || "#007AFF" }]}>
                  <Text style={styles.avatarText}>
                    {user?.name?.charAt(0).toUpperCase() || "?"}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.userName, { color: Colors[appTheme].text }]}>
                    {user?.name}
                  </Text>
                  <Text style={[styles.userEmail, { color: Colors[appTheme].text + "80" }]}>
                    {user?.email}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* گزینه پروفایل */}
              <TouchableOpacity style={styles.menuItem} onPress={handleProfile}>
                <Ionicons name="person-outline" size={20} color={Colors[appTheme].text} />
                <Text style={[styles.menuText, { color: Colors[appTheme].text }]}>
                  پروفایل من
                </Text>
              </TouchableOpacity>

              {/* گزینه کتابخانه من */}
              <TouchableOpacity style={styles.menuItem} onPress={() => {
                onClose();
                router.push("/myLibrary");
              }}>
                <Ionicons name="bookmark-outline" size={20} color={Colors[appTheme].text} />
                <Text style={[styles.menuText, { color: Colors[appTheme].text }]}>
                  کتابخانه من
                </Text>
              </TouchableOpacity>

              {/* گزینه تنظیمات */}
              <TouchableOpacity style={styles.menuItem} onPress={() => {
                onClose();
                // router.push("/settings");
              }}>
                <Ionicons name="settings-outline" size={20} color={Colors[appTheme].text} />
                <Text style={[styles.menuText, { color: Colors[appTheme].text }]}>
                  تنظیمات
                </Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              {/* دکمه خروج */}
              <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
                <Text style={[styles.menuText, { color: "#FF3B30" }]}>
                  خروج از حساب
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* حالت عدم لاگین */}
              <TouchableOpacity style={styles.menuItem} onPress={handleLogin}>
                <Ionicons name="log-in-outline" size={20} color={Colors[appTheme].primary || "#007AFF"} />
                <Text style={[styles.menuText, { color: Colors[appTheme].primary || "#007AFF", fontWeight: "600" }]}>
                  ورود / ثبت نام
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Pressable>
    </Modal>
  );
}
