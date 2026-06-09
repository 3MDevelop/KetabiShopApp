// backToTop.tsx
import { Animated, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BackToTopProps {
  scrollY: Animated.Value;
  right?: boolean;
  onPress: () => void;
}

export default function BackToTop({
  right = false,
  scrollY,
  onPress,
}: BackToTopProps) {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          
          [right ? "right" : "left"]: 20,
          [right ? "left" : "right"]: "auto",
          opacity: scrollY.interpolate({
            inputRange: [200, 350],
            outputRange: [0, 1],
            extrapolate: "clamp",
          }),
          transform: [
            {
              scale: scrollY.interpolate({
                inputRange: [200, 350],
                outputRange: [0.8, 1],
                extrapolate: "clamp",
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Ionicons name="arrow-up-sharp" size={24} color={"white"} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    zIndex: 20,
  },
  button: {
    backgroundColor: "#6a96ee",
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});
