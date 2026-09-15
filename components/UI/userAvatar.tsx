import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import CustomText from "@/components/common/CustomText";
import { getAvatarUri } from "@/constants/avatarImages";

interface UserAvatarProps {
  iconWidth?: number;
  squared?: boolean;
  inText?: string;
  useInitials?: boolean;
}

export default function UserAvatar({
  iconWidth = 40,
  squared = false,
  inText,
  useInitials = false,
}: UserAvatarProps) {
  const { isLoggedIn, user } = useAuth();

  const fontSize = useMemo(() => iconWidth * 0.5, [iconWidth]);
  const fontPadding = useMemo(() => iconWidth * 0.1, [iconWidth]);
  const iconSize = useMemo(() => iconWidth * 0.7, [iconWidth]);
  const iconPaddingU = useMemo(() => iconWidth * 0.15, [iconWidth]);
  const avatarUri = useInitials ? undefined : getAvatarUri(user?.avatar);

  const getFirstChar = () => {
    if (inText) {
      return inText.charAt(0).toUpperCase();
    }
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return "?";
  };

  const shape = {
    width: iconWidth,
    height: iconWidth,
    borderRadius: squared ? 0 : 999,
  };

  return (
    <View style={{ alignSelf: "center" }}>
      {isLoggedIn ? (
        <View style={[Styles.userIconContainer, shape]}>
          {avatarUri ? (
            <Image
              source={{ uri: avatarUri }}
              style={[Styles.userIconImage, shape]}
              resizeMode="cover"
            />
          ) : (
            <Text
              selectable={false}
              style={[
                Styles.userIconText,
                { fontSize, paddingBottom: fontPadding },
              ]}
            >
              {getFirstChar()}
            </Text>
          )}
        </View>
      ) : (
        <View style={[Styles.userIconContainer, shape]}>
          <CustomText
            style={[Styles.userIconText, { paddingTop: iconPaddingU }]}
          >
            <Ionicons name="people" size={iconSize * 0.8} color="white" />
          </CustomText>
        </View>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  userIconContainer: {
    backgroundColor: "#007AFF",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  userIconImage: {
    width: "100%",
    height: "100%",
  },
  userIconText: {
    color: "white",
    fontWeight: "bold",
  },
});
