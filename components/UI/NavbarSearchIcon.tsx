import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function NavbarSeachIcon() {
  const router = useRouter();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          router.push("/bookFinder");
        }}
      >
        <View style={[{ marginLeft: 10 }]}>
          <Ionicons
            name="search"
            size={24}
            style={[{ color: "#dbdbdb", marginBottom: 3 }]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
