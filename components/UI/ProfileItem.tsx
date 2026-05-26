// components/UI/ProfileItem.tsx
import { useLanguage } from "@/context/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "@/components/common/CustomText";
import { useTheme } from "@/context/ThemeContext";

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
const {theme} = useTheme()
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        router.push(("./" + itemAddress) as any);
      }}
      activeOpacity={0.7}
    >
      <View style={[styles.innerContainer,{backgroundColor:theme.colors.itemBack}]}>
        <Ionicons
          name={itemLogo as any}
          size={24}
          color={theme.colors.iconColor}
          style={isRTL ? styles.iconRight : styles.iconLeft}
        />

        <CustomText style={[styles.title,{color:theme.colors.text}]}>{itemLable}</CustomText>

        <Ionicons
          name={isRTL ? "arrow-back" : "arrow-forward"}
          size={18}
          color={theme.colors.iconColor}
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
