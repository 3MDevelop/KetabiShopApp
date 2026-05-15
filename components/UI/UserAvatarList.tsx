import { View, Text, StyleSheet } from "react-native";
import UserAvatarListItem from "./UserAvatarListItem";


export default function UserAvatarList() {
const avatarCount = 20
  
  return (
    <View style={styles.container}>
      <Text>
        Avatar List Container
      </Text>
       
      <UserAvatarListItem avatarInd = {avatarCount} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    shadowRadius: 2,
    textShadowColor: "#f0f0f05d",
    borderRadius: 12
  }
})