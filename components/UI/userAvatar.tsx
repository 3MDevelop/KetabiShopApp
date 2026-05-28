import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import CustomText from "@/components/common/CustomText";

interface UserAvatarProps {
  iconWidth?: number;
  squared?: boolean;
  inText?: string;
}

export default function UserAvatar({
  iconWidth = 40,
  squared = false,
  inText,
}: UserAvatarProps) {
  const { isLoggedIn, user } = useAuth();

  const fontSize = useMemo(() => iconWidth * 0.5, [iconWidth]);
  const fontPadding = useMemo(() => iconWidth * 0.1, [iconWidth]);
  const iconSize = useMemo(() => iconWidth * 0.7, [iconWidth]);
  const iconPaddingU = useMemo(() => iconWidth * 0.15, [iconWidth]);

  const getFirstChar = () => {
    if (inText) {
      return inText.charAt(0).toUpperCase();
    }
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return "?";
  };

  return (
    <View style={{ alignSelf: "center" }}>
      {isLoggedIn ? (
        <View
          style={[
            Styles.userIconContainer,
            {
              width: iconWidth,
              height: iconWidth,
              borderRadius: squared ? 0 : 999,
            },
          ]}
        >
          <Text
            style={[
              Styles.userIconText,
              { fontSize, paddingBottom: fontPadding },
            ]}
          >
            {getFirstChar()}
          </Text>
        </View>
      ) : (
        <View
          style={[
            Styles.userIconContainer,
            {
              width: iconWidth,
              height: iconWidth,
              borderRadius: squared ? 0 : 999,
            },
          ]}
        >
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
  },
  userIconText: {
    color: "white",
    fontWeight: "bold",
  },
});
