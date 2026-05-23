import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslate } from "@/hooks/useTranslation";

interface LoginBtnProps {
  isIconic?: boolean;
}

export default function LoginBtn({ isIconic = false }: LoginBtnProps) {
  const router = useRouter();
  const {t} = useTranslate()
  return (
    <TouchableOpacity
      
      onPress={() => router.push("/login")}
    >
      {isIconic ? (
        <View style={styles.loginIconButton}>
          <Ionicons name="log-in-sharp" size={30} color={"white"} />
        </View>
      ) : (
        <View style={styles.loginTextButton}>
          <Text style={styles.loginButtonText}> {t('profile.login')} </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loginIconButton: {
    backgroundColor: "#007AFF",
    padding: 8,
    paddingRight:12,
    borderRadius: 8,
    alignItems: "center",
  },
  loginTextButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingBottom: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
