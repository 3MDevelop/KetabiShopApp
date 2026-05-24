import { useAuth } from "@/hooks/useAuth";
import { StyleSheet, View } from "react-native";
import CustomText from "@/components/common/CustomText";

export default function UserAddressList() {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <CustomText>{user?.addresses}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
  },
});
