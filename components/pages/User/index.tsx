import LoginBtn from "@/components/UI/LoginBtn";
import LogoutBtn from "@/components/UI/LogoutBtn";
import UpdateUserDataBtn from "@/components/UI/UpdateUserDataBtn";
import UserAddressList from "@/components/UI/UserAddressList";
import UserAvatar from "@/components/UI/userAvatar";
import UserAvatarList from "@/components/UI/UserAvatarList";
import UserPageFormField from "@/components/UI/UserPageFormField";
import { fetchUserInfo } from "@/utils/userInfo";
import { useAuth } from "@/hooks/useAuth";
import { useResponsive } from "@/hooks/useResponsive";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";
import UserAvatarEditBtn from "@/components/UI/UserAvatarEditBtn";
import UserAvatarPicker from "@/components/UI/UserAvatarPicker";

export default function CombinedParallax() {
  const { isDesktop } = useResponsive();
  const { user, isLoggedIn, updateUser } = useAuth();
  const [nickname, setNickname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [initialNickname, setInitialNickname] = useState("");
  const [initialFirstName, setInitialFirstName] = useState("");
  const [initialLastName, setInitialLastName] = useState("");
  const [initialEmail, setInitialEmail] = useState("");
  const [initialAvatar, setInitialAvatar] = useState("");
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const userData = {
        nName: user?.nName || "",
        name: user?.name || "",
        lName: user?.lName || "",
        email: user?.email || "",
        avatar: user?.avatar?.toString() || "",
      };

      setNickname(userData.nName);
      setFirstName(userData.name);
      setLastName(userData.lName);
      setEmail(userData.email);
      setAvatar(userData.avatar);

      setInitialNickname(userData.nName);
      setInitialFirstName(userData.name);
      setInitialLastName(userData.lName);
      setInitialEmail(userData.email);
      setInitialAvatar(userData.avatar);
    }
  }, [user]);

  useEffect(() => {
    if (!isLoggedIn || user?.ID == null) return;
    let cancelled = false;

    const loadUserInfo = async () => {
      try {
        const info = await fetchUserInfo(user.ID);
        if (!info || cancelled) return;
        await updateUser({
          ...(info.name != null ? { name: info.name } : {}),
          ...(info.nName != null ? { nName: info.nName } : {}),
          ...(info.lName != null ? { lName: info.lName } : {}),
          ...(info.email != null ? { email: info.email } : {}),
          ...(info.avatar != null ? { avatar: info.avatar } : {}),
        });
      } catch (error) {
        console.error("خطا در دریافت اطلاعات کاربر:", error);
      }
    };

    loadUserInfo();
    return () => {
      cancelled = true;
    };
  }, [isLoggedIn, user?.ID]);

  useEffect(() => {
    const hasAnyChange =
      nickname !== initialNickname ||
      firstName !== initialFirstName ||
      lastName !== initialLastName ||
      email !== initialEmail ||
      avatar !== initialAvatar;

    setHasChanges(hasAnyChange);
  }, [
    nickname,
    firstName,
    lastName,
    email,
    avatar,
    initialNickname,
    initialFirstName,
    initialLastName,
    initialEmail,
    initialAvatar,
  ]);

  const handleUpdateProfile = async () => {
    if (!hasChanges) return;
    setIsUpdating(true);
    /*try {
      await updateUser({
        nName: nickname,
        name: firstName,
        lName: lastName,
        email: email,
        avatar: avatar ? parseInt(avatar) : 0,
      });
      
      setInitialNickname(nickname);
      setInitialFirstName(firstName);
      setInitialLastName(lastName);
      setInitialEmail(email);
      setInitialAvatar(avatar);
      
      Alert.alert("موفق", "اطلاعات شما با موفقیت بروزرسانی شد");
    } catch (error) {
      Alert.alert("خطا", "مشکلی در بروزرسانی اطلاعات رخ داد");
    } finally {
      setIsUpdating(false);
    } */

    setIsUpdating(false);
  };

  const handleSelectAvatar = async (nextAvatar: number) => {
    await updateUser({ avatar: nextAvatar });
    setAvatar(String(nextAvatar));
    setInitialAvatar(String(nextAvatar));
    setAvatarPickerOpen(false);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.content, !isDesktop && styles.columnContainer]}>
        <View style={isDesktop ? styles.rowContainer : styles.columnContainer}>
          <View
            style={[
              styles.cards,
              isDesktop ? styles.doubleSize : styles.fullWidth,
            ]}
          >
            <View
              style={[
                styles.infoCardLogo,
                isDesktop
                  ? {
                    left: "-2%",
                    top: "-8%",
                  }
                  : {
                    alignSelf: "center",
                    top: "29%",
                  },
              ]}
            >
              <Ionicons
                name="finger-print-outline"
                size={isDesktop ? 160 : 90}
              />
            </View>
            <View
              style={isDesktop ? styles.rowContainer : styles.columnContainer}
            >
              <View style={[styles.avatar]}>
                <View>
                  <TouchableOpacity
                    onPress={() => setAvatarPickerOpen(true)}
                    activeOpacity={0.85}
                    accessibilityLabel="ویرایش آواتار"
                  >
                    <UserAvatar iconWidth={isDesktop ? 150 : 120} />
                  </TouchableOpacity>
                  <UserAvatarEditBtn onPress={() => setAvatarPickerOpen(true)} />
                </View>
                <View
                  style={[
                    styles.userIDContainer,
                    isDesktop ? { marginTop: 40 } : { marginTop: 30 },
                  ]}
                >
                  <View style={styles.userIDCotent}>
                    <CustomText style={styles.userIDLogo}>ID</CustomText>
                  </View>
                  <CustomText style={styles.userIDText}>{user?.ID}</CustomText>
                </View>
              </View>
              <View style={styles.infoCardForm}>
                <CustomText style={styles.sectionTitle}>مشخصات فردی</CustomText>
                <UserPageFormField
                  label="نام مستعار"
                  value={nickname}
                  onChangeText={setNickname}
                  iconName="star-outline"
                />

                <UserPageFormField
                  label="نام"
                  value={firstName}
                  onChangeText={setFirstName}
                  iconName="person-outline"
                />

                <UserPageFormField
                  label="نام خانوادگی"
                  value={lastName}
                  onChangeText={setLastName}
                  iconName="people-outline"
                />
              </View>
            </View>
          </View>

          <View
            style={[
              styles.cards,
              isDesktop ? styles.normalSize : styles.fullWidth,
            ]}
          >
            {isDesktop ? <View style={styles.infoCardHeader} /> : null}
            {isDesktop ? (
              <View
                style={[
                  styles.infoCardHeader,
                  { top: "-89%", right: "-14%", borderWidth: 3 },
                ]}
              />
            ) : null}

            <View style={styles.infoCardLogoContent}>
              <Ionicons name="at-sharp" size={isDesktop ? 160 : 90} />
            </View>
            <CustomText style={styles.sectionTitle}>اطلاعات تماس</CustomText>

            <UserPageFormField
              label="ایمیل"
              value={email}
              onChangeText={setEmail}
              iconName="mail-outline"
            />

            <View style={styles.contactField}>
              <Ionicons name="call-outline" size={20} color="#007AFF" />
              <CustomText style={styles.contactText}>
                {user?.phone || "شماره ثبت نشده"}
              </CustomText>
            </View>
          </View>
        </View>

        <View style={styles.cards}>
          <UserAddressList />
        </View>

        <View style={[styles.buttonContainer, isDesktop && styles.buttonRow]}>
          <UpdateUserDataBtn
            hasChanges={hasChanges}
            onPress={handleUpdateProfile}
            isLoading={isUpdating}
          />
          
        </View>
      </View>
      <UserAvatarPicker
        visible={avatarPickerOpen}
        selectedAvatar={Number(user?.avatar) || 0}
        onSelect={handleSelectAvatar}
        onClose={() => setAvatarPickerOpen(false)}
      />
    </ScrollView>
  );
}
