import React from "react";

import { View, TouchableOpacity, Linking } from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

export default function SocialBtn() {
  const socialLinks = {
    instagram: "https://www.instagram.com/yourusername",
    whatsapp: "https://wa.me/989123456789",
    telegram: "https://t.me/yourusername",
  };

  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      // "خطا", "نمی‌توان این لینک را باز کرد")
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 30,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => openLink(socialLinks.instagram)}>
        <AntDesign name="instagram" size={28} color="#808080" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openLink(socialLinks.whatsapp)}>
        <FontAwesome5 name="whatsapp" size={28} color="#808080" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openLink(socialLinks.telegram)}>
        <FontAwesome5 name="telegram" size={28} color="#808080" />
      </TouchableOpacity>
    </View>
  );
}
