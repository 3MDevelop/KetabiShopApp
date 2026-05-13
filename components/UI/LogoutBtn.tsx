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
    router.push(targetURL as any);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#f44336",
          minWidth:170,
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