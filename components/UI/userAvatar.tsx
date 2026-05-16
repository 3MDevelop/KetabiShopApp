import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { useMemo } from "react";

interface UserAvatarProps {
  iconWidth?: number;
  squared?: boolean;
  inText?: string;
}

export default function UserAvatar({
  iconWidth = 40,
  squared = false,
  inText ,
}: UserAvatarProps) {
  const { isLoggedIn, user } = useAuth();

  const fontSize = useMemo(() => iconWidth * 0.6, [iconWidth]);
  const fontPadding = useMemo(() => iconWidth * 0.1, [iconWidth]);
  const iconSize = useMemo(() => iconWidth * 0.7, [iconWidth]);
  const iconPadding = useMemo(() => iconWidth * 0.04, [iconWidth]);


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
          <Text style={[Styles.userIconText, { paddingBottom: iconPadding }]}>
            <Ionicons name="people" size={iconSize} color="white" />
          </Text>
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
