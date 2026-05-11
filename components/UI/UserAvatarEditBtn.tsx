import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";

export default function UserAvatarEditBtn() {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return null;
  return (
    <View style={styles.avatarEditBtnContainer}>
      <Text style={styles.avatarEditBtn}>
        <Ionicons name="create" size={18} />
      </Text>
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
    right: 15,
    top: 55,
  },
});
