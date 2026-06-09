import { View } from "react-native";
import CustomText from "@/components/common/CustomText";
import styles from "./styles"
export default function Reader() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CustomText bold variant="h4">EPub Reader</CustomText>
        <View>
          ePub File Container
        </View>
      </View>
    </View>
  );
}