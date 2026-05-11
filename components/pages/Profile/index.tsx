// components/Profile/Profile.tsx
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  ScrollView as NativeScrollView,
} from "react-native";

import SocialBtn from "@/components/UI/SocialBtn";
import Cycles from "@/components/UI/Cycles";
import BackToTop from "@/components/UI/BackToTop";
import LogoutBtn from "@/components/UI/LogoutBtn";
import ParallexCycles from "@/components/UI/ParallexCycles";
import ProfileItems from "@/components/UI/ProfileItem";
import UserAvatar from "@/components/UI/userAvatar";
import UserInfoLable from "@/components/UI/UserInfoLable";
import UserAvatarEditBtn from "@/components/UI/UserAvatarEditBtn";

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
  const { isLoggedIn } = useAuth();

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

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
            <TouchableOpacity
              onPress={() => {
                if (isLoggedIn) {
                  router.push("/user");
                } else {
                  router.push("/login");
                }
              }}
            >
              <View style={styles.avatarContainer}>
                <Cycles innerWidth={85} style={{ marginTop: -42 }} />
                <UserAvatar iconWidth={75} />
                <UserAvatarEditBtn />
                <UserInfoLable style={{ marginTop: 0 }} />
              </View>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.progressBarContainer}>
            <Animated.View
              style={[styles.progressBar, { width: progressBarWidth }]}
            />
          </View>
        </Animated.View>
        <View
          style={{ marginHorizontal: "auto", width: "100%", maxWidth: 700 }}
        >
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
