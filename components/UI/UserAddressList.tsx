import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "@/hooks/useAuth";

export default function UserAddressList() {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <Text>{user?.addresses}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
  },
});
