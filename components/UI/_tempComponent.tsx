import { StyleSheet, View } from "react-native";
import CustomText from "@/components/common/CustomText";

interface tempComponentProps {
  data?: number;
}

export default function tempComponent({ data }: tempComponentProps) {
  return (
    <View style={styles.container}>
      <CustomText>Vertical List Content</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
  },
});
