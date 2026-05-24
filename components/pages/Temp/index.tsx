import LoginBtn from "@/components/UI/LoginBtn";
import LogoutBtn from "@/components/UI/LogoutBtn";
import UpdateUserDataBtn from "@/components/UI/UpdateUserDataBtn";
import UserAvatar from "@/components/UI/userAvatar";
import { useAuth } from "@/hooks/useAuth";
import { useResponsive } from "@/hooks/useResponsive";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View,TextInput } from "react-native";
import CustomText from "@/components/common/CustomText";

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
            <CustomText style={styles.emptyStateTitle}>
              پروفایل کاربری
            </CustomText>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <LoginBtn />
              <LoginBtn isIconic={true} />
            </View>
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
                <View style={styles.formFieldContainer}>
                  <View style={styles.fieldIcon}>
                    <Ionicons name="star-outline" size={20} color="#007AFF" />
                  </View>
                  <View style={styles.fieldContent}>
                    <CustomText style={styles.fieldLabel}>
                      نام مستعار
                    </CustomText>
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
                    <CustomText style={styles.fieldLabel}>نام</CustomText>
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
                    <CustomText style={styles.fieldLabel}>
                      نام خانوادگی
                    </CustomText>
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
            <CustomText style={styles.sectionTitle}>اطلاعات تماس</CustomText>
            <View style={styles.contactField}>
              <Ionicons name="mail-outline" size={20} color="#007AFF" />
              <CustomText style={styles.contactText}>
                {email || "ایمیل ثبت نشده"}
              </CustomText>
            </View>
            <View style={styles.contactField}>
              <Ionicons name="call-outline" size={20} color="#007AFF" />
              <CustomText style={styles.contactText}>
                {user?.phone || "شماره ثبت نشده"}
              </CustomText>
            </View>
          </View>
        </View>

        <View style={styles.cards}>
          <CustomText style={styles.sectionTitle}>آواتارها</CustomText>
          <CustomText>Avatar List</CustomText>
        </View>

        <View style={styles.cards}>
          <CustomText style={styles.sectionTitle}>آدرس‌ها</CustomText>
          <CustomText>Address List</CustomText>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  content: {
    width: "100%",
    maxWidth: 950,
    alignSelf: "center",
    gap: 16,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 16,
    minHeight: 230,
  },
  columnContainer: {
    flexDirection: "column",
    gap: 16,
  },
  cards: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  doubleSize: {
    flex: 2,
  },
  normalSize: {
    flex: 1,
    justifyContent: "flex-end",
  },
  fullWidth: {
    width: "100%",
  },
  avatar: {
    alignItems: "center",
    marginHorizontal: 25,
  },
  infoCardForm: {
    flex: 1,
    gap: 16,
    justifyContent: "flex-end",
  },
  formFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  fieldIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f0f7ff",
    alignItems: "center",
    justifyContent: "center",
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 11,
    color: "#999",
    marginBottom: 4,
  },
  fieldInput: {
    fontSize: 15,
    color: "#333",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
    textAlign: "right",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  contactField: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  contactText: {
    flex: 1,
    fontSize: 15,
    color: "#555",
    textAlign: "right",
  },
  buttonContainer: {
    gap: 12,
    marginTop: 16,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "flex-end",
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 30,
  },
});
