import { Text, View, ViewStyle, StyleSheet } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { useTranslate } from "@/hooks/useTranslation";
interface CycleProps {
  style?: ViewStyle;
}

export default function UserInfoLable({ style }: CycleProps) {
  const { isLoggedIn, user } = useAuth();
  const { t } = useTranslate();
  return (
    <View style={style}>
      <Text
        style={Styles.userName}
      >{`${isLoggedIn ? user?.nName || user?.ID : t("profile.guestUserLable")}`}</Text>
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
