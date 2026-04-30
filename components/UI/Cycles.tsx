import { View } from "react-native";

export default function Cycles() {
  return (
    <>
      <View
        style={{
          width: "100%",
          aspectRatio: 1,
          position: "absolute",
          backgroundColor: "white",
          borderRadius: 999,
          opacity: 0.1,
        }}
      />
      <View
        style={{
          width: "90%",
          aspectRatio: 1,
          position: "absolute",
          backgroundColor: "white",
          borderRadius: 999,
          opacity: 0.1,
        }}
      />
      <View
        style={{
          width: "80%",
          aspectRatio: 1,
          position: "absolute",
          backgroundColor: "white",
          borderRadius: 999,
          opacity: 0.1,
        }}
      />
    </>
  );
}
