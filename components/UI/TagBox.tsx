import { StyleSheet, TouchableOpacity } from "react-native";
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
  backColor = "#d1d1d1",
  tagText = "Tag",
  textColor = "#464646",
  tagID,
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
      <CustomText
        bold
        style={[styles.text, { color: textColor, paddingTop: 3 }]}
      >
        {tagText} #
      </CustomText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    borderRadius: 50,
    gap: 6,
    borderWidth: 0.5,
    borderColor: "#7c7c7c",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
});
