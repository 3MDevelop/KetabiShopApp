import { useAuth } from "@/hooks/useAuth";
import { useTranslate } from "@/hooks/useTranslation";
import { StyleSheet, View, ViewStyle } from "react-native";
import CustomText from "@/components/common/CustomText";

interface CycleProps {
  style?: ViewStyle;
}

export default function UserInfoLable({ style }: CycleProps) {
  const { isLoggedIn, user } = useAuth();
  const { t } = useTranslate();
  return (
    <View style={style}>
      <CustomText
        style={Styles.userName}
      >{`${isLoggedIn ? user?.nName || user?.ID : t("pages.Profile.guestUserLabel")}`}</CustomText>
    </View>
  );
}

const Styles = StyleSheet.create({
  userName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
});
