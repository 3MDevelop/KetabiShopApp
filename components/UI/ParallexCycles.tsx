import { Animated, Dimensions } from "react-native";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

interface ParallexCyclesProps {
  scrollY: Animated.Value;
}


export default function ParallexCycles( { scrollY }: ParallexCyclesProps) {
  

  const circle1Translate = scrollY.interpolate({
    inputRange: [0, SCREEN_HEIGHT * 0.5, SCREEN_HEIGHT],
    outputRange: [0, SCREEN_HEIGHT * 0.15, SCREEN_HEIGHT * 0.3],
    extrapolate: "clamp",
  });

  const circle1Scale = scrollY.interpolate({
    inputRange: [0, SCREEN_HEIGHT * 0.3, SCREEN_HEIGHT * 0.6],
    outputRange: [1, 1.2, 1.5],
    extrapolate: "clamp",
  });

  const circle2Translate = scrollY.interpolate({
    inputRange: [0, SCREEN_HEIGHT * 0.5, SCREEN_HEIGHT],
    outputRange: [0, -SCREEN_HEIGHT * 0.1, -SCREEN_HEIGHT * 0.2],
    extrapolate: "clamp",
  });

  const circle2Scale = scrollY.interpolate({
    inputRange: [0, SCREEN_HEIGHT * 0.3, SCREEN_HEIGHT * 0.6],
    outputRange: [1, 1.1, 1.3],
    extrapolate: "clamp",
  });

  const circle2Opacity = scrollY.interpolate({
    inputRange: [0, 200, 400],
    outputRange: [0.8, 0.5, 0.2],
    extrapolate: "clamp",
  });

  const circle3Translate = scrollY.interpolate({
    inputRange: [0, SCREEN_HEIGHT * 0.5, SCREEN_HEIGHT],
    outputRange: [0, SCREEN_HEIGHT * 0.2, SCREEN_HEIGHT * 0.4],
    extrapolate: "clamp",
  });

  const circle3Scale = scrollY.interpolate({
    inputRange: [0, SCREEN_HEIGHT * 0.3, SCREEN_HEIGHT * 0.6],
    outputRange: [1, 0.9, 0.8],
    extrapolate: "clamp",
  });

  const circle4Translate = scrollY.interpolate({
    inputRange: [0, SCREEN_HEIGHT * 0.5, SCREEN_HEIGHT],
    outputRange: [0, -SCREEN_HEIGHT * 0.15, -SCREEN_HEIGHT * 0.35],
    extrapolate: "clamp",
  });

  return (
    <>
      <Animated.View
        style={{
          position: "absolute",
          width: 150,
          height: 150,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.1)",
          top: "-20%",
          right: "-5%",
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, SCREEN_HEIGHT * 0.5],
                outputRange: [0, SCREEN_HEIGHT * 0.25],
                extrapolate: "clamp",
              }),
            },
            {
              scale: scrollY.interpolate({
                inputRange: [0, SCREEN_HEIGHT * 0.3],
                outputRange: [1, 1.4],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      />

      <Animated.View
        style={{
          position: "absolute",
          width: SCREEN_WIDTH * 0.8,
          height: SCREEN_WIDTH * 0.8,
          borderRadius: SCREEN_WIDTH * 0.4,
          backgroundColor: "rgba(255,255,255,0.08)",
          top: -SCREEN_WIDTH * 0.2,
          right: -SCREEN_WIDTH * 0.3,
          transform: [
            { translateY: circle1Translate },
            { scale: circle1Scale },
          ],
        }}
      />

      <Animated.View
        style={{
          position: "absolute",
          width: SCREEN_WIDTH * 0.6,
          height: SCREEN_WIDTH * 0.6,
          borderRadius: SCREEN_WIDTH * 0.3,
          backgroundColor: "rgba(255,255,255,0.12)",
          bottom: -SCREEN_WIDTH * 0.2,
          left: -SCREEN_WIDTH * 0.2,
          transform: [
            { translateY: circle2Translate },
            { scale: circle2Scale },
          ],
          opacity: circle2Opacity,
        }}
      />

      <Animated.View
        style={{
          position: "absolute",
          width: SCREEN_WIDTH * 0.4,
          height: SCREEN_WIDTH * 0.4,
          borderRadius: SCREEN_WIDTH * 0.2,
          backgroundColor: "rgba(255,255,255,0.15)",
          top: SCREEN_WIDTH * 0.13,
          left: -SCREEN_WIDTH * 0.25,
          transform: [
            { translateY: circle3Translate },
            { scale: circle3Scale },
          ],
        }}
      />

      <Animated.View
        style={{
          position: "absolute",
          width: SCREEN_WIDTH * 0.5,
          height: SCREEN_WIDTH * 0.5,
          borderRadius: SCREEN_WIDTH * 0.25,
          backgroundColor: "rgba(255,255,255,0.05)",
          bottom: SCREEN_WIDTH * 0.1,
          right: -SCREEN_WIDTH * 0.15,
          transform: [{ translateY: circle4Translate }],
          borderWidth: 2,
          borderColor: "rgba(255,255,255,0.07)",
        }}
      />
    </>
  );
}
