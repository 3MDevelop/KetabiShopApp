import { View } from "react-native";
import CustomText from "@/components/common/CustomText";

export default function CopyRight() {
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "yellow",
        borderTopColor: "darkgray",
        borderTopWidth: 1,
      }}
    >
      <CustomText
        style={{ fontSize: 11, padding: 4, fontWeight: 500, color: "#979797" }}
      >
        copyright © 2026 3M on DPM
      </CustomText>
    </View>
  );
}
