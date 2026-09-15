// UserAvatarList.tsx
import { Pressable, View, StyleSheet } from "react-native";
import UserAvatarListItem from "./UserAvatarListItem";
import UserAvatar from "./userAvatar";
import { AVATAR_LIST } from "@/constants/avatarImages";
import { useAuth } from "@/hooks/useAuth";

interface UserAvatarListProps {
  selectedAvatar?: number;
  onSelect?: (avatar: number) => void;
}

export default function UserAvatarList({
  selectedAvatar,
  onSelect,
}: UserAvatarListProps) {
  const { user } = useAuth();
  const current = selectedAvatar ?? Number(user?.avatar) ?? 0;

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Pressable
          onPress={() => onSelect?.(0)}
          disabled={!onSelect}
          style={[
            styles.childBorder,
            current === 0 && styles.childBorderActive,
          ]}
        >
          <UserAvatar
            iconWidth={80}
            squared={true}
            inText={user?.name}
            useInitials
          />
        </Pressable>
        {AVATAR_LIST.map((imageSource, index) => {
          const avatarInd = index + 1;
          return (
            <Pressable
              key={imageSource}
              onPress={() => onSelect?.(avatarInd)}
              disabled={!onSelect}
              style={[
                styles.childBorder,
                current === avatarInd && styles.childBorderActive,
              ]}
            >
              <UserAvatarListItem
                avatarInd={avatarInd}
                imageSource={imageSource}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
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
  childBorderActive: {
    borderColor: "#007AFF",
  },
});
