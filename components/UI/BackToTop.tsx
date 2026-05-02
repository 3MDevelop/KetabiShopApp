// backToTop.tsx
import { Animated, TouchableOpacity, Text } from "react-native";

interface BackToTopProps {
  scrollY: Animated.Value;
  onPress: () => void;
}

export default function BackToTop({ scrollY, onPress }: BackToTopProps) {
  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 20,
        left: 20,
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
        zIndex: 20,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#6a96ee",
          width: 42,
          height: 42,
          borderRadius: 28,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 8,
          paddingBottom: 4,
        }}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
          ↑
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}