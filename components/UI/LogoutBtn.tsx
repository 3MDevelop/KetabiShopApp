// logoutBTN.tsx
import { View, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

interface LogoutBtnProps {
  targetURL: string;
}

export default function LogoutBtn({ targetURL }: LogoutBtnProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    // راه حل 1: استفاده از as any
    router.push(targetURL as any);
  };

  return (
    <View
      style={{
        marginBottom: 20,
        flexDirection: "row",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#f44336",
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 8,
        }}
        onPress={handleLogout}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          خروج از حساب کاربری
        </Text>
      </TouchableOpacity>
    </View>
  );
}