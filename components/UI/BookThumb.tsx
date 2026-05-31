// components/UI/BookThumb.tsx

import { Text, StyleSheet, TouchableOpacity } from "react-native";

interface BookThumbProps {
  label?: string;
  backgroundColor?: string;
  onPress?: () => void;
}

export default function BookThumb({ 
  label = "sampleBook", 
  backgroundColor = "orange",
  onPress 
}: BookThumbProps) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: "100%",
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
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