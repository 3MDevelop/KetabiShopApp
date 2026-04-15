import {
  View,
  Text,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from './styles';

export default function NavBar({Colors,appTheme}:any) {

  return (
    <View style={[styles.NavBarContainer, {backgroundColor: Colors[appTheme].background}]}>
      <View style={styles.NavBar}>
        <View>
          <Ionicons
            name="person-circle"
            size={45}
            style={[{ marginLeft: 20, color: "#dbdbdb" }]}
          />
        </View>
        <View style={[{ marginLeft: 10 }]}>
          <Ionicons
            name="basket"
            size={24}
            style={[{ color: "#dbdbdb", marginBottom: 3 }]}
          />
          <View style={styles.basketBadge}>
            <Text style={styles.badgeText}>99</Text>
          </View>
        </View>

        <View style={[{ marginLeft: 10 }]}>
          <Ionicons
            name="search"
            size={24}
            style={[{ color: "#dbdbdb", marginBottom: 3 }]}
          />
        </View>

        <Image
          style={[styles.headerLogo, { marginStart: "auto", marginBottom: 4 }]}
          source={require("@/assets/images/icon.png")}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

