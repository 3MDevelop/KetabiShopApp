import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import CustomText from "@/components/common/CustomText";
import { useRouter } from "expo-router";


interface TagBoxProps {
  height?: number;
  backColor?: string;
  tagText?: string;
  textColor?: string;
  tagID?: string;
}

export default function TagBox({
  height = 30,
  backColor = "#08a537",
  tagText = "Tag",
  textColor = "#ffffff",
  tagID
}: TagBoxProps) {
    const router = useRouter();
  
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/tag",
          params: { id: tagID },
        });
      }}
      style={[styles.container, { height, backgroundColor: backColor }]}
    >
      <View
        style={{
          backgroundColor: "white",
          aspectRatio: 1,
          width: 18,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 6,
        }}
      >
        <Text style={{ fontWeight: "bold", color: "green" }}>#</Text>
      </View>
      <CustomText style={[styles.text, { color: textColor, paddingTop: 3 }]}>
        {tagText}
      </CustomText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    borderRadius: 6,
    gap: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
});
