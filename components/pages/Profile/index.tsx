// components/pages/Profile/index.tsx
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import {
    Animated,
    ScrollView as NativeScrollView,
    TouchableOpacity,
    View
} from "react-native";

import BackToTop from "@/components/UI/BackToTop";
import Cycles from "@/components/UI/Cycles";
import LogoutBtn from "@/components/UI/LogoutBtn";
import ParallexCycles from "@/components/UI/ParallexCycles";
import ProfileItems from "@/components/UI/ProfileItem";
import ProfileItem_setLang from "@/components/UI/ProfileItem_setLang";
import ProfileItem_theme from "@/components/UI/ProfileItem_theme";
import SocialBtn from "@/components/UI/SocialBtn";
import UserAvatar from "@/components/UI/userAvatar";
import UserAvatarEditBtn from "@/components/UI/UserAvatarEditBtn";
import UserInfoLable from "@/components/UI/UserInfoLable";
import { useTranslate } from "@/hooks/useTranslation";
import { useTheme } from "@/context/ThemeContext";

import {
    createHeaderBackgroundAnimation,
    createHeaderOpacityAnimation,
    createHeaderTranslateAnimation,
    createProgressBarAnimation,
} from "./animation";
import { styles } from "./styles";
import CustomText from "@/components/common/CustomText";

export default function Profile() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<NativeScrollView>(null);
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { t } = useTranslate();
  const {theme} = useTheme()

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
              <CustomText style={[styles.mainTitle, { marginTop: 40,color:theme.colors.text }]}>
                {t("pages.Profile.myActivities")}
              </CustomText>

              <ProfileItems
                itemLable={t("pages.Profile.myLibrary")}
                itemAddress={"./myLibrary"}
                itemLogo={"library"}
              />

              <ProfileItems
                itemLable={t("pages.Profile.paymentHistory")}
                itemAddress={"./paymentRecords"}
                itemLogo={"wallet-sharp"}
              />

              <ProfileItems
                itemLable={t("pages.Profile.myComments")}
                itemAddress={"./myComments"}
                itemLogo={"chatbubble-sharp"}
              />

              <ProfileItems
                itemLable={t("pages.Profile.myLikes")}
                itemAddress={"./myLikes"}
                itemLogo={"thumbs-up-sharp"}
              />

              <ProfileItems
                itemLable={t("pages.Profile.myFavorites")}
                itemAddress={"./myFavorites"}
                itemLogo={"star-sharp"}
              />
            </>
          ) : null}

          <CustomText style={[styles.mainTitle,{color:theme.colors.text}]}>
            {t("pages.Profile.settings")}
          </CustomText>

          <ProfileItem_theme />
          <ProfileItem_setLang />

          <ProfileItems
            itemLable={t("pages.Profile.support")}
            itemAddress={"support"}
            itemLogo={"headset-sharp"}
          />

          <ProfileItems
            itemLable={t("pages.Profile.about")}
            itemAddress={"about"}
            itemLogo={"id-card-sharp"}
          />
        </View>

        <View style={styles.bottomContainer}>
          <SocialBtn />
          {isLoggedIn ? <LogoutBtn targetURL="/" /> : null}
        </View>
      </Animated.ScrollView>

      <BackToTop scrollY={scrollY} onPress={scrollToTop} />
    </View>
  );
}
