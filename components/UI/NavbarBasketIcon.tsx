import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../common/CustomText";
import { getBasketCount, subscribeBasket } from "@/utils/basket";

export default function NavbarBasketIcon() {
  const router = useRouter();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const refreshCount = async () => {
      const nextCount = await getBasketCount();
      setCount(nextCount);
    };

    refreshCount();
    return subscribeBasket(refreshCount);
  }, []);

  return (
    <TouchableOpacity onPress={() => router.push("/basket")}>
      <View style={[{ marginLeft: 10 }]}>
        <Ionicons
          name="basket"
          size={24}
          style={{
            color: "#dbdbdb",
            marginBottom: 3,
          }}
        />
        {count > 0 && (
          <View style={styles.basketBadge}>
            <CustomText style={styles.badgeText}>
              {count > 99 ? "99+" : count}
            </CustomText>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  basketBadge: {
    position: "absolute",
    top: -6,
    right: -3.2,
    backgroundColor: "#dc3545",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 8,
  },
});
