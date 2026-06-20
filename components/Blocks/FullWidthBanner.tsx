import {
  ImageBackground,
  View,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import CustomText from "../common/CustomText";

interface FullWidthBannerProps {
  isInner?: boolean;
  url: string;
  imageSource?: any;
  height?: number;
  text?: string;
  textColor?: string;
  fontSize?: number;
  backImage?: any; // تغییر به any برای accept کردن require
}

export default function FullWidthBanner({
  isInner,
  url,
  imageSource,
  text = "Sample Text",
  textColor = "#fff",
  height = 250,
  fontSize,
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

  // تصویر پیش‌فرض ثابت
  const defaultImage = require("@/assets/images/fullWidthBanner.jpg");

  return (
    <View style={[styles.container, { height }]}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={{ flex: 1 }}
      >
        <View
          style={{
            zIndex: 99,
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        >
          <CustomText
            variant="h1"
            style={{margin:"auto", color: textColor, fontSize: fontSize }}
            bold
            center
          >
            {text}
          </CustomText>
        </View>
        <ImageBackground
          source={imageSource || defaultImage}
          style={styles.imageBackground}
          resizeMode="cover"
          imageStyle={styles.imageStyle}
        />
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
});