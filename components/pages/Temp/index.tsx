import { View, StyleSheet, Text, TextInput, ScrollView } from "react-native";
import UserAvatar from "@/components/UI/userAvatar";
import { useResponsive } from "@/hooks/useResponsive";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import UpdateUserDataBtn from "@/components/UI/UpdateUserDataBtn";
import LogoutBtn from "@/components/UI/LogoutBtn";
import LoginBtn from "@/components/UI/LoginBtn";

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
        avatar: user?.avatar?.toString() || ""
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
  }, [nickname, firstName, lastName, email, avatar, initialNickname, initialFirstName, initialLastName, initialEmail, initialAvatar]);

  const handleUpdateProfile = async () => {
    if (!hasChanges) return;
    setIsUpdating(true);
    // Update logic here
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
        {/* ردیف اول: اطلاعات اصلی + اطلاعات تماس */}
        <View style={isDesktop ? styles.rowContainer : styles.columnContainer}>
          <View style={[styles.cards, isDesktop ? styles.doubleSize : styles.fullWidth]}>
            <View style={isDesktop ? styles.rowContainer : styles.columnContainer}>
              <View style={[styles.avatar, isDesktop && { paddingEnd: 10 }]}>
                <UserAvatar iconWidth={isDesktop ? 150 : 100} />
                <Text style={styles.phoneText}>{user?.phone}</Text>
              </View>
              <View style={styles.infoCardForm}>
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

          <View style={[styles.cards, isDesktop ? styles.normalSize : styles.fullWidth]}>
            <Text style={styles.sectionTitle}>اطلاعات تماس</Text>
            <View style={styles.contactField}>
              <Ionicons name="mail-outline" size={20} color="#007AFF" />
              <Text style={styles.contactText}>{email || "ایمیل ثبت نشده"}</Text>
            </View>
            <View style={styles.contactField}>
              <Ionicons name="call-outline" size={20} color="#007AFF" />
              <Text style={styles.contactText}>{user?.phone || "شماره ثبت نشده"}</Text>
            </View>
          </View>
        </View>

        {/* ردیف دوم: آواتار لیست */}
        <View style={styles.cards}>
          <Text style={styles.sectionTitle}>آواتارها</Text>
          <Text>Avatar List</Text>
        </View>

        {/* ردیف سوم: آدرس لیست */}
        <View style={styles.cards}>
          <Text style={styles.sectionTitle}>آدرس‌ها</Text>
          <Text>Address List</Text>
        </View>

        {/* دکمه‌ها */}
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
  },
  fullWidth: {
    width: "100%",
  },
  avatar: {
    alignItems: "center",
  },
  phoneText: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 25,
  },
  infoCardForm: {
    flex: 1,
    gap: 16,
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