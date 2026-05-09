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
import ProfileItems from "@/components/UI/ProfileItem";

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


  console.info(user)

  return (
    <View style={styles.container}>
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
        style={styles.scrollView}
      >
        {/* header with parallex */}
        <Animated.View
          style={[styles.header, { backgroundColor: headerBackground }]}
        >
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
                  <Text style={styles.userName}>{`کاربر ${user?.nName || user?.ID || ""}`}</Text>
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
              style={[styles.progressBar, { width: progressBarWidth }]}
            />
          </View>
        </Animated.View>
        <View style={{ marginHorizontal:"auto",  width:"100%",   maxWidth: 1000 }}>
          {isLoggedIn ? (
            <>
              <Text style={[styles.mainTitle, { marginTop: 40 }]}>
                فعالیتهای من
              </Text>

              <ProfileItems
                itemLable={"کتابخانه شخصی"}
                itemAddress={"./myLibrary"}
                itemLogo={"library"}
              />
              <ProfileItems
                itemLable={"دعوت از دوستان"}
                itemAddress={"./invitation"}
                itemLogo={"person-add-sharp"}
              />
              <ProfileItems
                itemLable={"تاریخچه پرداخت"}
                itemAddress={"./paymentRecords"}
                itemLogo={"wallet-sharp"}
              />
              <ProfileItems
                itemLable={"نظرات من"}
                itemAddress={"./myComments"}
                itemLogo={"chatbubble-sharp"}
              />

              <ProfileItems
                itemLable={"پسندیده های من"}
                itemAddress={"./myLikes"}
                itemLogo={"thumbs-up-sharp"}
              />
              <ProfileItems
                itemLable={"علاقه مندی ها"}
                itemAddress={"./myFavorites"}
                itemLogo={"star-sharp"}
              />
            </>
          ) : null}

          <Text style={styles.mainTitle}>تنظیمات</Text>

          <ProfileItems
            itemLable={"ظاهر برنامه"}
            itemAddress={""}
            itemLogo={"color-palette-sharp"}
          />
          <ProfileItems
            itemLable={"پشتیبانی"}
            itemAddress={"support"}
            itemLogo={"headset-sharp"}
          />
          <ProfileItems
            itemLable={"درباره ما"}
            itemAddress={"about"}
            itemLogo={"id-card-sharp"}
          />
        </View>

        <View style={{ marginTop: 25 }}></View>

        {isLoggedIn ? <LogoutBtn targetURL="/" /> : null}

        <SocialBtn />
      </Animated.ScrollView>

      <BackToTop scrollY={scrollY} onPress={scrollToTop} />
    </View>
  );
}
