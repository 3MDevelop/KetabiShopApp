import React, { useRef } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";

export default function Offers() {
  const { isLoggedIn, user } = useAuth();
  const scrollY = useRef(new Animated.Value(0)).current;

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
      Alert.alert("خطا", "نمی‌توان این لینک را باز کرد");
    }
  };

  const headerHeight = 300;
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 280],
    outputRange: [0, -80],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.85],
    extrapolate: "clamp",
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5", overflow: "hidden" }}>
      <Animated.View
        style={{
          backgroundColor: "#6a96ee",
          height: headerHeight,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 0,
          transform: [{ translateY: headerTranslateY }],
          opacity: headerOpacity,
        }}
      >
        <View
          style={{
            width: 150,
            aspectRatio: 1,
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              aspectRatio: 1,
              position: "absolute",
              backgroundColor: "white",
              borderRadius: 999, // عدد به جای string
              opacity: 0.1,
            }}
          />
          <View
            style={{
              width: "90%",
              aspectRatio: 1,
              position: "absolute",
              backgroundColor: "white",
              borderRadius: 999,
              opacity: 0.1,
            }}
          />
          <View
            style={{
              width: "80%",
              aspectRatio: 1,
              position: "absolute",
              backgroundColor: "white",
              borderRadius: 999,
              opacity: 0.1,
            }}
          />

          <View
            style={{
              width: "70%",
              aspectRatio: 1,
              borderRadius: 999,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>UA</Text>
          </View>
        </View>
        {isLoggedIn ? (
          <View style={{ marginTop: 16 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {user?.name}
            </Text>
          </View>
        ) : null}
      </Animated.View>

      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: headerHeight + 10,
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        showsVerticalScrollIndicator={true}
      >
        <View
          style={{
            backgroundColor: "lightgray",
            padding: 20,
            minHeight: 1000,
            marginTop: -20,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
            🟡 بخش زرد
          </Text>

          {[...Array(20)].map((_, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "white",
                paddingHorizontal: 24,
                paddingVertical: 14,
                borderRadius: 6,
                marginBottom: 5,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 3,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "600" }}>
                آیتم {index + 1}
              </Text>
            </View>
          ))}
          <View
            style={{
              marginTop: 20,
              marginHorizontal: "auto",
              flexDirection: "row",
              gap: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => openLink(socialLinks.instagram)}>
              <AntDesign name="instagram" size={24} color="#808080" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => openLink(socialLinks.whatsapp)}>
              <FontAwesome5 name="whatsapp" size={24} color="#808080" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => openLink(socialLinks.telegram)}>
              <FontAwesome5 name="telegram" size={24} color="#808080" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}
