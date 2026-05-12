import { View, Text, TextInput, ScrollView } from "react-native";
import UserAvatar from "@/components/UI/userAvatar";
import { useResponsive } from "@/hooks/useResponsive";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import UpdateUserDataBtn from "@/components/UI/UpdateUserDataBtn";
import LogoutBtn from "@/components/UI/LogoutBtn";
import LoginBtn from "@/components/UI/LoginBtn";
import styles from "./styles";

export default function CombinedParallax() {
  const { isDesktop } = useResponsive();
  const { user, isLoggedIn } = useAuth();
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

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.emptyStateContainer}>
            <Ionicons name="person-circle-outline" size={80} color="#ccc" />
            <Text style={styles.emptyStateTitle}>پروفایل کاربری</Text>
            <LoginBtn />
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.content, !isDesktop && styles.columnContainer]}>
        <View style={isDesktop ? styles.rowContainer : styles.columnContainer}>
          <View
            style={[
              styles.cards,
              isDesktop ? styles.doubleSize : styles.fullWidth,
            ]}
          >
            <View
              style={isDesktop ? styles.rowContainer : styles.columnContainer}
            >
              <View style={[styles.avatar]}>
                <UserAvatar iconWidth={isDesktop ? 150 : 100} />
              </View>
              <View style={styles.infoCardForm}>
                <Text style={styles.sectionTitle}>مشخصات فردی</Text>
                <View style={styles.formFieldContainer}>
                  <View style={styles.fieldIcon}>
                    <Ionicons name="star-outline" size={20} color="#007AFF" />
                  </View>
                  <View style={styles.fieldContent}>
                    <Text style={styles.fieldLabel}>نام مستعار</Text>
                    <TextInput
                      style={styles.fieldInput}
                      value={nickname}
                      onChangeText={setNickname}
                      placeholder="نام مستعار"
                      placeholderTextColor="#ccc"
                    />
                  </View>
                </View>

                <View style={styles.formFieldContainer}>
                  <View style={styles.fieldIcon}>
                    <Ionicons name="person-outline" size={20} color="#007AFF" />
                  </View>
                  <View style={styles.fieldContent}>
                    <Text style={styles.fieldLabel}>نام</Text>
                    <TextInput
                      style={styles.fieldInput}
                      value={firstName}
                      onChangeText={setFirstName}
                      placeholder="نام"
                      placeholderTextColor="#ccc"
                    />
                  </View>
                </View>

                <View style={styles.formFieldContainer}>
                  <View style={styles.fieldIcon}>
                    <Ionicons name="people-outline" size={20} color="#007AFF" />
                  </View>
                  <View style={styles.fieldContent}>
                    <Text style={styles.fieldLabel}>نام خانوادگی</Text>
                    <TextInput
                      style={styles.fieldInput}
                      value={lastName}
                      onChangeText={setLastName}
                      placeholder="نام خانوادگی"
                      placeholderTextColor="#ccc"
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.cards,
              isDesktop ? styles.normalSize : styles.fullWidth,
            ]}
          >
            <Text style={styles.sectionTitle}>اطلاعات تماس</Text>

            <View style={styles.formFieldContainer}>
              <View style={styles.fieldIcon}>
                <Ionicons name="mail-outline" size={20} color="#007AFF" />
              </View>
              <View style={styles.fieldContent}>
                <Text style={styles.fieldLabel}>ایمبل</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="ایمبل"
                  placeholderTextColor="#ccc"
                />
              </View>
            </View>

            <View style={styles.contactField}>
              <Ionicons name="call-outline" size={20} color="#007AFF" />
              <Text style={styles.contactText}>
                {user?.phone || "شماره ثبت نشده"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.cards}>
          <Text style={styles.sectionTitle}>آواتارها</Text>
          <Text>Avatar List</Text>
        </View>

        <View style={styles.cards}>
          <Text style={styles.sectionTitle}>آدرس‌ها</Text>
          <Text>Address List</Text>
        </View>

        <View style={[styles.buttonContainer, isDesktop && styles.buttonRow]}>
          <UpdateUserDataBtn
            hasChanges={hasChanges}
            onPress={handleUpdateProfile}
            isLoading={isUpdating}
          />
          <LogoutBtn targetURL="./" />
        </View>
      </View>
    </ScrollView>
  );
}
