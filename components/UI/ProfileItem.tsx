// components/UI/ProfileItem.tsx
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLanguage } from "@/context/LanguageContext";

interface ProfileItemsProps {
  itemLable: string;
  itemAddress: string;
  itemLogo: string;
}

export default function ProfileItems({
  itemLable,
  itemAddress,
  itemLogo,
}: ProfileItemsProps) {
  const router = useRouter();
  const { isRTL } = useLanguage();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        router.push(("./" + itemAddress) as any);
      }}
      activeOpacity={0.7}
    >
      <View style={styles.innerContainer}>
        <Ionicons
          name={itemLogo as any}
          size={24}
          color="#3996e8"
          style={isRTL ? styles.iconRight : styles.iconLeft}
        />
        
        <Text style={styles.title}>{itemLable}</Text>
        
        <Ionicons
          name={isRTL ? "arrow-back" : "arrow-forward"}
          size={18}
          color="#3996e8"
          style={isRTL ? styles.arrowLeft : styles.arrowRight}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  innerContainer: {
    padding: 14,
    paddingHorizontal: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconRight: {
    marginRight: 0,
    marginLeft: 12,
  },
  iconLeft: {
    marginLeft: 0,
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "auto",
  },
  arrowLeft: {
    marginLeft: 12,
    marginRight: 0,
  },
  arrowRight: {
    marginRight: 12,
    marginLeft: 0,
  },
});