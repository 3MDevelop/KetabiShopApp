import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface QRScannerProps {
  scannedCode?: string;
  valListener?: (code: string) => void;
}

export default function QRScanner({
  valListener,
  scannedCode = "533622",
}: QRScannerProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.scannerButton}
        onPress={() => {
          if (valListener) {
            valListener(scannedCode);
          }
        }}
      >
        <Ionicons name="qr-code-outline" size={48} color="#fff" />
        <Text style={styles.scannerText}>اسکن QR کد</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4CAF50",
    aspectRatio: 1,
    borderRadius: 12,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  scannerButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  scannerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
  },
});