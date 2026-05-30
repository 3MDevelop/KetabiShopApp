import { View, StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "../common/CustomText";

interface PreListProps {
  label?: string;
  name?: string;
  onPress?: () => void;
  fImage?:string;
}

export default function PreList({ 
  name = "sampleName", 
  label = "sampleTitle",
  fImage,
  onPress 
}: PreListProps) {
  return (
    <View style={{
        width:"100%"
    }}>
      <TouchableOpacity 
        style={styles.categoryCard} 
        onPress={onPress}
        activeOpacity={0.7}
      >
        <CustomText style={styles.categoryName}>{label}</CustomText>
        <CustomText style={styles.categoryId}>{name}</CustomText>
        <CustomText style={styles.categoryId}>{fImage}</CustomText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  categoryId: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
});