import { Text, View, ViewStyle, StyleSheet } from "react-native";
import { useAuth } from "@/hooks/useAuth";

interface CycleProps {
  style?: ViewStyle;
}

export default function UserInfoLable({ style }: CycleProps) {
  const { isLoggedIn, user } = useAuth();

  return (
    <View style={style}>
      <Text
        style={Styles.userName}
      >{`کاربر ${isLoggedIn ? user?.nName || user?.ID : " مهمان"}`}</Text>
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
