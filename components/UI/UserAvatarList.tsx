import { View, Text, StyleSheet } from "react-native";

export default function UserAvatarList() {
  return (
    <View style={styles.container}>
      <Text>Avatart List</Text>
    </View>
  );
}


const styles = StyleSheet.create({
    container:{
        padding:16,
        backgroundColor:"orange"
    }
})