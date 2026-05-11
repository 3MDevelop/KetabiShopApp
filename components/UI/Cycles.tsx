import { View, ViewStyle, StyleSheet } from "react-native";

interface CycleProps {
  innerWidth: number;
  style?: ViewStyle;
}

export default function Cycles({ innerWidth, style }: CycleProps) {
  return (
    <View style={[style, styles.container]}>
      {[30, 20, 10, 0].map((offset, i) => (
        <View
          key={i}
          style={[
            styles.sameStyle,
            { width: innerWidth + offset, opacity: i === 3 ? 0.6 : 0.1 }
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  sameStyle: {
    aspectRatio: 1,
    borderRadius: 999,
    position: "absolute",
    backgroundColor: "white",
  },
});