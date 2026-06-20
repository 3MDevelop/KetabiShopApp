// components/Blocks/FullWidthBanner.tsx
import {
  ImageBackground,
  View,
  TouchableOpacity,
  Linking,
  StyleSheet,
  TextProps,
} from "react-native";
import { router } from "expo-router";
import CustomText from "../common/CustomText";

export interface CustomTextProps extends TextProps {
  bold?: boolean;
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "caption" | "discription";
  center?: boolean;
  marginB?: number;
  singleLine?: boolean;
  color?: string;
  children?: React.ReactNode;
}

interface FullWidthBannerProps {
  isInner?: boolean;
  url: string;
  imageSource?: string;
  height?: number;
  textColor?: string;
  text?: string;
  fontSize?: number;
  backImage?: string;
}

export default function FullWidthBanner({
  isInner = false,
  url,
  imageSource,
  height = 250,
  textColor = "#fff",
  text,
  fontSize = 24,
}: FullWidthBannerProps) {
  const handlePress = () => {
    if (!url) {
      console.error("URL is required");
      return;
    }
    if (isInner) {
      router.push(url as any);
    } else {
      let validUrl = url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        validUrl = "https://" + url;
      }
      Linking.openURL(validUrl).catch((err) => {
        console.error("Failed to open URL:", err);
      });
    }
  };

  // تعیین منبع تصویر
  const imageSourceFinal = imageSource ? { uri: imageSource } : null;

  if (!imageSourceFinal) {
    return null;
  }

  return (
    <View style={[styles.container, { height }]}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={imageSourceFinal}
          style={styles.imageBackground}
          resizeMode="cover"
          imageStyle={styles.imageStyle}
        >
          <View style={styles.overlay}>
            {text && (
              <CustomText
                bold
                variant="h1"
                style={{ fontSize, color: textColor }}
              >
                {text}
              </CustomText>
            )}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    borderRadius: 8,
    padding: 0,
    overflow: "hidden",
    marginBottom: 16,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    borderRadius: 8,
  },
  overlay: {
    zIndex: 99,
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
