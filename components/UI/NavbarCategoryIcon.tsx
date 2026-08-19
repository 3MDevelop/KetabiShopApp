import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useResponsive } from "@/hooks/useResponsive";
import CustomText from "../common/CustomText";
import { useTranslate } from "@/hooks/useTranslation";

export default function NavbarCategoryIcon() {
  const { isDesktop } = useResponsive();
  const router = useRouter();
  const { t } = useTranslate();

  return (
    <>
      {isDesktop ? (
        <View style={[styles.dIcoContainer]}>
          <TouchableOpacity
            onPress={() => router.push("/categories")}
            style={styles.dIcon}
          >
            <Ionicons name="list" size={24} style={[{ color: "#dbdbdb" }]} />
            <CustomText bold style={{ marginEnd: 10, color: "white" }}>
              {t("common.navbar.categories")}
            </CustomText>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  dIcoContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  dIcon: {
    flexDirection: "row",
  },
});
