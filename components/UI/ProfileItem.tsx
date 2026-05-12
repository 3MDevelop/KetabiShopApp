import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

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
          style={styles.icon}
        />
        
        <Text style={styles.title}>{itemLable}</Text>
        
        <Ionicons
          name={"arrow-back"}
          size={18}
          color="#3996e8"
          style={styles.arrowIcon}
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    marginLeft: 12,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  arrowIcon: {
    marginLeft: 12,
  },
});