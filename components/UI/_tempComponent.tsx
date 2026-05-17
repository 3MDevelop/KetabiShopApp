import { View, Text, StyleSheet } from "react-native";

interface tempComponentProps {
  data?: number;
}

export default function tempComponent({ data }: tempComponentProps) {
  return (
    <View style={styles.container}>
      <Text>Vertical List Content</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
  },
});
