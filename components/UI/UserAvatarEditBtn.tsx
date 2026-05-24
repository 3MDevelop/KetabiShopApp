import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import CustomText from "@/components/common/CustomText";

export default function UserAvatarEditBtn() {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return null;
  return (
    <View style={styles.avatarEditBtnContainer}>
      <CustomText style={styles.avatarEditBtn}>
        <Ionicons name="create" size={18} />
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarEditBtn: {
    color: "#e7651a",
  },
  avatarEditBtnContainer: {
    backgroundColor: "white",
    borderRadius: "50%",
    aspectRatio: "1/1",
    padding: 5,
    position: "absolute",
    right: 5,
    top: 55,
  },
});
