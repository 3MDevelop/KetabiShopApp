// logoutBTN.tsx
import { useAuth } from "@/hooks/useAuth";
import { useTranslate } from "@/hooks/useTranslation";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import CustomText from "@/components/common/CustomText";

interface LogoutBtnProps {
  targetURL: string;
}

export default function LogoutBtn({ targetURL }: LogoutBtnProps) {
  const router = useRouter();
  const { logout } = useAuth();
  const { t } = useTranslate();

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
          paddingVertical: 8,
          paddingHorizontal:20,
          borderRadius: 8,
        }}
        onPress={handleLogout}
      >
        <CustomText
          style={{
            fontSize:12,
            color: "white",
            textAlign: "center",
          }}
        >
          {t("common.common.logoutBtn")}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
}
