import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { FontAwesome5, AntDesign, Ionicons,  } from "@expo/vector-icons";

import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Dimensions,
  Linking,
  ScrollView as NativeScrollView,
} from "react-native";
import { useAuth } from "@/hooks/useAuth";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export default function CombinedParallax() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<NativeScrollView>(null);
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();

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
      // "خطا", "نمی‌توان این لینک را باز کرد"
    }
  };

  const getInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return "?";
  };

  const handleLogout = async () => {
    await logout();
  };

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 100, 200, 300],
    outputRange: [0, -30, -60, -100],
    extrapolate: "clamp",
  });

  const headerScale = scrollY.interpolate({
    inputRange: [0, 100, 200, 300],
    outputRange: [1, 0.9, 0.8, 0.7],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150, 250, 350],
    outputRange: [1, 0.8, 0.4, 0],
    extrapolate: "clamp",
  });

  const headerBackground = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: ["#6a96ee", "#4a76ce"],
    extrapolate: "clamp",
  });

  const circle1Translate = scrollY.interpolate({
    inputRange: [0, SCREEN_HEIGHT * 0.5, SCREEN_HEIGHT],
    outputRange: [0, SCREEN_HEIGHT * 0.15, SCREEN_HEIGHT * 0.3],
    extrapolate: "clamp",
  });

  const circle1Scale = scrollY.interpolate({
    inputRange: [0, SCREEN_HEIGHT * 0.3, SCREEN_HEIGHT * 0.6],
    outputRange: [1, 1.2, 1.5],
    extrapolate: "clamp",
  });

  const circle2Translate = scrollY.interpolate({
    inputRange: [0, SCREEN_HEIGHT * 0.5, SCREEN_HEIGHT],
    outputRange: [0, -SCREEN_HEIGHT * 0.1, -SCREEN_HEIGHT * 0.2],
    extrapolate: "clamp",
  });

  const circle2Scale = scrollY.interpolate({
    inputRange: [0, SCREEN_HEIGHT * 0.3, SCREEN_HEIGHT * 0.6],
    outputRange: [1, 1.1, 1.3],
    extrapolate: "clamp",
  });

  const circle2Opacity = scrollY.interpolate({
    inputRange: [0, 200, 400],
    outputRange: [0.8, 0.5, 0.2],
    extrapolate: "clamp",
  });

  const circle3Translate = scrollY.interpolate({
    inputRange: [0, SCREEN_HEIGHT * 0.5, SCREEN_HEIGHT],
    outputRange: [0, SCREEN_HEIGHT * 0.2, SCREEN_HEIGHT * 0.4],
    extrapolate: "clamp",
  });

  const circle3Scale = scrollY.interpolate({
    inputRange: [0, SCREEN_HEIGHT * 0.3, SCREEN_HEIGHT * 0.6],
    outputRange: [1, 0.9, 0.8],
    extrapolate: "clamp",
  });

  const circle4Translate = scrollY.interpolate({
    inputRange: [0, SCREEN_HEIGHT * 0.5, SCREEN_HEIGHT],
    outputRange: [0, -SCREEN_HEIGHT * 0.15, -SCREEN_HEIGHT * 0.35],
    extrapolate: "clamp",
  });

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={true}
        indicatorStyle="black"
        persistentScrollbar={true}
      >
        <Animated.View
          style={{
            height: 300,
            overflow: "hidden",
            backgroundColor: headerBackground,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Animated.View
            style={{
              position: "absolute",
              width: SCREEN_WIDTH * 0.8,
              height: SCREEN_WIDTH * 0.8,
              borderRadius: SCREEN_WIDTH * 0.4,
              backgroundColor: "rgba(255,255,255,0.08)",
              top: -SCREEN_WIDTH * 0.2,
              right: -SCREEN_WIDTH * 0.3,
              transform: [
                { translateY: circle1Translate },
                { scale: circle1Scale },
              ],
            }}
          />

          <Animated.View
            style={{
              position: "absolute",
              width: SCREEN_WIDTH * 0.6,
              height: SCREEN_WIDTH * 0.6,
              borderRadius: SCREEN_WIDTH * 0.3,
              backgroundColor: "rgba(255,255,255,0.12)",
              bottom: -SCREEN_WIDTH * 0.2,
              left: -SCREEN_WIDTH * 0.2,
              transform: [
                { translateY: circle2Translate },
                { scale: circle2Scale },
              ],
              opacity: circle2Opacity,
            }}
          />

          <Animated.View
            style={{
              position: "absolute",
              width: SCREEN_WIDTH * 0.4,
              height: SCREEN_WIDTH * 0.4,
              borderRadius: SCREEN_WIDTH * 0.2,
              backgroundColor: "rgba(255,255,255,0.15)",
              top: SCREEN_WIDTH * 0.13,
              left: -SCREEN_WIDTH * 0.25,
              transform: [
                { translateY: circle3Translate },
                { scale: circle3Scale },
              ],
            }}
          />

          <Animated.View
            style={{
              position: "absolute",
              width: SCREEN_WIDTH * 0.5,
              height: SCREEN_WIDTH * 0.5,
              borderRadius: SCREEN_WIDTH * 0.25,
              backgroundColor: "rgba(255,255,255,0.05)",
              bottom: SCREEN_WIDTH * 0.1,
              right: -SCREEN_WIDTH * 0.15,
              transform: [{ translateY: circle4Translate }],
              borderWidth: 2,
              borderColor: "rgba(255,255,255,0.07)",
            }}
          />

          <Animated.View
            style={{
              position: "absolute",
              width: 150,
              height: 150,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.1)",
              top: "-20%",
              right: "-5%",
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, SCREEN_HEIGHT * 0.5],
                    outputRange: [0, SCREEN_HEIGHT * 0.25],
                    extrapolate: "clamp",
                  }),
                },
                {
                  scale: scrollY.interpolate({
                    inputRange: [0, SCREEN_HEIGHT * 0.3],
                    outputRange: [1, 1.4],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          />

          <Animated.View
            style={{
              alignItems: "center",
              transform: [
                { translateY: headerTranslate },
                { scale: headerScale },
              ],
              opacity: headerOpacity,
              zIndex: 10,
            }}
          >
            <View
              style={{
                width: 120,
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
                  borderRadius: 999,
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
                {isLoggedIn ? (
                  <View
                    style={{
                      backgroundColor: "#007AFF",
                      width: 70,
                      height: 70,
                      borderRadius: 200,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 40,
                        fontWeight: "bold",
                      }}
                    >
                      {getInitial()}
                    </Text>
                  </View>
                ) : (
                  <Ionicons
                    name="person-circle"
                    size={45}
                    style={[{ marginLeft: 20, color: "#dbdbdb" }]}
                  />
                )}
              </View>
            </View>

            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                gap: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isLoggedIn ? (
                <View style={{ alignItems: "center", gap: 10 }}>
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                  >
                    {user?.name}
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#36b8f4",
                    paddingHorizontal: 24,
                    paddingVertical: 12,
                    borderRadius: 8,
                    width: "100%",
                  }}
                  onPress={() => {
                    router.push("/login");
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    ورود به حساب کاربری
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>

          <Animated.View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              backgroundColor: "rgba(255,255,255,0.3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Animated.View
              style={{
                height: "100%",
                width: scrollY.interpolate({
                  inputRange: [0, 150],
                  outputRange: ["0%", "100%"],
                  extrapolate: "clamp",
                }),
                backgroundColor: "#ff6b35",
              }}
            />
          </Animated.View>
        </Animated.View>

        <View
          style={{
            padding: 20,
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 20,
              color: "#333",
            }}
          >
            📱 محتوای اصلی
          </Text>

          {[...Array(7)].map((_, i) => (
            <View
              key={i}
              style={{
                padding: 18,
                backgroundColor: "#f8f9fa",
                marginBottom: 12,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#e9ecef",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>
                کارت شماره {i + 1}
              </Text>
              <Text style={{ fontSize: 13, color: "#6c757d", marginTop: 6 }}>
                توضیحات مربوط به این کارت با افکت پارالاکس زیبا
              </Text>
            </View>
          ))}
        </View>

        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            gap: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#f44336",
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 8,
              width: "100%",
            }}
            onPress={handleLogout}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              خروج از حساب کاربری
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingBottom: 30,
            marginHorizontal: "auto",
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
      </Animated.ScrollView>

      <Animated.View
        style={{
          position: "absolute",
          bottom: 30,
          left: 20,
          opacity: scrollY.interpolate({
            inputRange: [50, 50],
            outputRange: [0, 1],
            extrapolate: "clamp",
          }),
          zIndex: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#6a96ee",
            width: 38,
            height: 38,
            borderRadius: 28,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 8,
            paddingBottom: 4,
          }}
          onPress={scrollToTop}
          activeOpacity={0.8}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            ↑
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
