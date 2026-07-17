import CustomText from "@/components/common/CustomText";
import { ScrollView, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Auther() {



  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <CustomText>Book list with tagID : {id}</CustomText>
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
