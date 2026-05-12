import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function LoginBtn() {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.loginButton}
      onPress={() => router.push("/login")}
    >
      <Text style={styles.loginButtonText}>ورود به حساب کاربری</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
