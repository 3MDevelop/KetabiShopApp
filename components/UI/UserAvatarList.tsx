// UserAvatarList.tsx
import { View, StyleSheet } from "react-native";
import UserAvatarListItem from "./UserAvatarListItem";
import UserAvatar from "./userAvatar";
import { AVATAR_LIST } from "@/constants/avatarImages";
import { useAuth } from "@/hooks/useAuth";

export default function UserAvatarList() {
  const avatarCount = AVATAR_LIST.length;
const {user} = useAuth()
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <View style={styles.childBorder}>
          <UserAvatar iconWidth={80} squared={true} inText={user?.name} />
        </View>
        {Array.from({ length: avatarCount }).map((_, index) => (
          <View key={index} style={styles.childBorder}>
            <UserAvatarListItem 
              avatarInd={index + 1}
              imageSource={AVATAR_LIST[index]} 
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f9f9f9",
    shadowRadius: 2,
    borderRadius: 12,
  },
  listContainer: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    gap: 6,
  },
  childBorder: {
    borderWidth: 2,
    borderColor: "#bdbdbd",
    borderRadius: 8, 
    overflow: "hidden",
  },
});