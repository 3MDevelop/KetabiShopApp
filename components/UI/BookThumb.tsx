// components/UI/BookThumb.tsx

import { Text, StyleSheet, TouchableOpacity } from "react-native";

interface BookThumbProps {
  label?: string;
  backgroundColor?: string;
  onPress?: () => void;
  ratio?: number;
}

export default function BookThumb({
  label = "sampleBook",
  backgroundColor = "orange",
  onPress,
  ratio
}: BookThumbProps) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor, aspectRatio: ratio }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
