// components/Profile/Profile.tsx
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  ScrollView as NativeScrollView,
} from "react-native";
import { useAuth } from "@/hooks/useAuth";
import SocialBtn from "@/components/UI/SocialBtn";
import Cycles from "@/components/UI/Cycles";
import BackToTop from "@/components/UI/BackToTop";
import LogoutBtn from "@/components/UI/LogoutBtn";
import ParallexCycles from "@/components/UI/ParallexCycles";
import { styles } from "./styles";
import {
  createHeaderBackgroundAnimation,
  createHeaderTranslateAnimation,
  createHeaderOpacityAnimation,
  createProgressBarAnimation,
} from "./animation";

export default function Profile() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<NativeScrollView>(null);
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  /* Animations */
  const headerBackground = createHeaderBackgroundAnimation(scrollY);
  const headerTranslate = createHeaderTranslateAnimation(scrollY);
  const headerOpacity = createHeaderOpacityAnimation(scrollY);
  const progressBarWidth = createProgressBarAnimation(scrollY);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={true}
        indicatorStyle="black"
        persistentScrollbar={true}
        style={styles.scrollView}
      >
        {/* header with parallex */}
        <Animated.View style={[styles.header, { backgroundColor: headerBackground }]}>
          <ParallexCycles scrollY={scrollY} />

          <Animated.View
            style={[
              styles.headerContent,
              {
                transform: [{ translateY: headerTranslate }],
                opacity: headerOpacity,
              },
            ]}
          >
            {/* user avatar */}
            <View style={styles.avatarContainer}>
              <Cycles />

              <View style={styles.avatarInner}>
                {isLoggedIn ? (
                  <View style={styles.userIconContainer}>
                    <Text style={styles.userIconText}>
                      {user?.name?.charAt(0).toUpperCase() || "?"}
                    </Text>
                  </View>
                ) : (
                  <Ionicons
                    name="person-circle"
                    size={80}
                    style={styles.guestIcon}
                  />
                )}
              </View>
            </View>

            {/* username or login btn */}
            <View style={styles.userInfoContainer}>
              {isLoggedIn ? (
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user?.name || "کاربر"}</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => {
                    router.push("/login");
                  }}
                >
                  <Text style={styles.loginButtonText}>ورود / ثبت نام</Text>
                </TouchableOpacity>
              )}
            </View>


          </Animated.View>

          {/* Progressive bar */}
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={[
                styles.progressBar,
                { width: progressBarWidth },
              ]}
            />
          </View>
        </Animated.View>

        {/* محتوای اصلی */}
        <Text style={styles.mainTitle}>📱 محتوای اصلی</Text>

        {[...Array(7)].map((_, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.cardTitle}>کارت شماره {i + 1}</Text>
            <Text style={styles.cardDescription}>
              توضیحات مربوط به این کارت با افکت پارالاکس زیبا
            </Text>
          </View>
        ))}

        {isLoggedIn ? <LogoutBtn targetURL="/" /> : null}

        <SocialBtn />
        
      </Animated.ScrollView>

      <BackToTop scrollY={scrollY} onPress={scrollToTop} />
    </View>
  );
}