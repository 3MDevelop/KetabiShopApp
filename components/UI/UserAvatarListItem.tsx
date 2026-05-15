import { Text, View, StyleSheet } from "react-native";

interface UserAvatarListItemProps {
  avatarInd: number
}

export default function UserAvatarListItem({avatarInd}: UserAvatarListItemProps) {
  return (
    <View>
      <Text
        style={styles.container}>
        {avatarInd}
      </Text>
    </View>
  )
}


const styles = StyleSheet.create({

  container: {
    height: 80,
    width: 70,
    backgroundColor: "green"
  }
})