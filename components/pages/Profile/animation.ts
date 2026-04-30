// animations/profile.animations.ts
import { Animated } from "react-native";

export const createHeaderBackgroundAnimation = (scrollY: Animated.Value) => {
  return scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: ["#6a96ee", "#4a76ce"],
    extrapolate: "clamp",
  });
};

export const createHeaderTranslateAnimation = (scrollY: Animated.Value) => {
  return scrollY.interpolate({
    inputRange: [0, 100, 200, 300],
    outputRange: [0, -30, -60, -100],
    extrapolate: "clamp",
  });
};

export const createHeaderOpacityAnimation = (scrollY: Animated.Value) => {
  return scrollY.interpolate({
    inputRange: [0, 150, 250, 350],
    outputRange: [1, 0.8, 0.4, 0],
    extrapolate: "clamp",
  });
};

export const createProgressBarAnimation = (scrollY: Animated.Value) => {
  return scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });
};

export const createBackToTopOpacityAnimation = (scrollY: Animated.Value) => {
  return scrollY.interpolate({
    inputRange: [200, 350],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
};

export const createBackToTopScaleAnimation = (scrollY: Animated.Value) => {
  return scrollY.interpolate({
    inputRange: [200, 350],
    outputRange: [0.8, 1],
    extrapolate: "clamp",
  });
};

// انیمیشن‌های دایره‌های پارالاکس
export const createCircleTranslateAnimation = (
  scrollY: Animated.Value,
  outputRange: number[]
) => {
  return scrollY.interpolate({
    inputRange: [0, 300, 600],
    outputRange: [0, outputRange[0], outputRange[1]],
    extrapolate: "clamp",
  });
};

export const createCircleScaleAnimation = (
  scrollY: Animated.Value,
  outputRange: number[]
) => {
  return scrollY.interpolate({
    inputRange: [0, 200, 400],
    outputRange: [1, outputRange[0], outputRange[1]],
    extrapolate: "clamp",
  });
};

export const createCircleOpacityAnimation = (scrollY: Animated.Value) => {
  return scrollY.interpolate({
    inputRange: [0, 200, 400],
    outputRange: [0.8, 0.5, 0.2],
    extrapolate: "clamp",
  });
};