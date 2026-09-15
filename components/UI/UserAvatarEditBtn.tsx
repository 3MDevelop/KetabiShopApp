import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { shadow } from "@/utils/shadow";

interface UserAvatarEditBtnProps {
  onPress?: () => void;
}

export default function UserAvatarEditBtn({ onPress }: UserAvatarEditBtnProps) {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return null;
  return (
    <TouchableOpacity
      style={styles.avatarEditBtnContainer}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityLabel="ویرایش آواتار"
    >
      <Ionicons name="create" size={18} color="#e7651a" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatarEditBtnContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: -4,
    alignSelf: "center",
    zIndex: 2,
    ...shadow("#000", { width: 0, height: 1 }, 0.12, 3, 2),
  },
});
