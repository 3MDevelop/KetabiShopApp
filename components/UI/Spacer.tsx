import { View } from "react-native";

interface SpacerProps {
  variant?: "vertical" | "horizontal";
}

export default function Spacer({
  variant = "vertical",
}: SpacerProps) {
  if (variant === "vertical") {
    return <View style={{ marginVertical: "auto" }} />;
  }
  return <View style={{ marginHorizontal: "auto" }} />;
}
