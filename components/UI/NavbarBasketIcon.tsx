import { View, TouchableOpacity, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../common/CustomText";
import { isBasket, toggleBasket, BasketItem } from "@/utils/basket";


export default function NavbarBasketIcon() {

  const { isLoggedIn } = useAuth();
  const router = useRouter();


  console.info(isBasket)
  console.info(toggleBasket)

  return (
    <TouchableOpacity
      onPress={() => {
        if (!isLoggedIn) {
          Toast.show({
            type: "error",
            text1: "برای مشاهده این بخش ابتدا به حساب کاربری وارد شوید",
            position: "top",
            topOffset: 20,
            visibilityTime: 3000,
          });
          return;
        }
        router.push("/basket");
      }}
    >
      <View style={[{ marginLeft: 10 }]}>
        <Ionicons
          name="basket"
          size={24}
          style={[
            {
              color: isLoggedIn ? "#dbdbdb" : "#dbdbdb9a",
              marginBottom: 3,
            },
          ]}
        />
        {isLoggedIn && (
          <View style={styles.basketBadge}>
            <CustomText style={styles.badgeText}>
              3 {/* item count on @basket on local storage */}
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
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 8,
  },
});
