import CustomText from "@/components/common/CustomText";
import { ScrollView, View, StyleSheet } from "react-native";

export default function Publisher() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <CustomText>Publisher list</CustomText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  content: {
    width: "100%",
    maxWidth: 950,
    alignSelf: "center",
    gap: 16,
  },
});
