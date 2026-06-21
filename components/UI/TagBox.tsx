import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import CustomText from "@/components/common/CustomText";

interface TagBoxProps {
  height?: number;
  backColor?: string;
  tagText?: string;
  textColor?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
}

export default function TagBox({
  height = 30,
  backColor = "#f0f0f0",
  tagText = "Tag",
  textColor = "#333",
  iconName = "heart-half-sharp",
}: TagBoxProps) {
  return (
    <View style={[styles.container, { height, backgroundColor: backColor }]}>
      <Ionicons name={iconName} size={16} color={textColor} />
      <CustomText style={[styles.text, { color: textColor }]}>
        {tagText}
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
});