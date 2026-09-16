import { useAuth } from "@/hooks/useAuth";
import { useTranslate } from "@/hooks/useTranslation";
import { StyleSheet, View, ViewStyle } from "react-native";
import CustomText from "@/components/common/CustomText";

interface CycleProps {
  style?: ViewStyle;
}

function profileDisplayName(user?: {
  nName?: string;
  name?: string;
  phone?: string;
} | null) {
  const nName = String(user?.nName || "").trim();
  if (nName) return nName;
  const name = String(user?.name || "").trim();
  if (name) return name;
  return String(user?.phone || "").trim();
}

export default function UserInfoLable({ style }: CycleProps) {
  const { isLoggedIn, user } = useAuth();
  const { t } = useTranslate();
  return (
    <View style={style}>
      <CustomText style={Styles.userName}>
        {isLoggedIn
          ? profileDisplayName(user)
          : t("pages.Profile.guestUserLabel")}
      </CustomText>
    </View>
  );
}

const Styles = StyleSheet.create({
  userName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 16,
    marginTop: 0,
    includeFontPadding: false,
  },
});
