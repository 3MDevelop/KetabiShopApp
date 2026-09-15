import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { shadow } from "@/utils/shadow";

interface UserAvatarEditBtnProps {
  onPress?: () => void;
  inline?: boolean;
}

export default function UserAvatarEditBtn({
  onPress,
  inline = false,
}: UserAvatarEditBtnProps) {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return null;
  return (
    <TouchableOpacity
      style={[
        styles.avatarEditBtnContainer,
        inline ? styles.inline : styles.overlay,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityLabel="ویرایش آواتار"
    >
      <Ionicons
        name="create"
        size={inline ? 22 : 18}
        color={inline ? "#ffffff" : "#e7651a"}
      />
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
    zIndex: 2,
    ...shadow("#000", { width: 0, height: 1 }, 0.12, 3, 2),
  },
  overlay: {
    position: "absolute",
    bottom: -4,
    alignSelf: "center",
  },
  inline: {
    position: "relative",
    backgroundColor: "transparent",
    width: 22,
    height: 22,
    borderRadius: 0,
    boxShadow: "none",
    elevation: 0,
    marginTop: -4,
  },
});
