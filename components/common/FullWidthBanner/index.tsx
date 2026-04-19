import { ImageBackground, View, TouchableOpacity, Linking } from "react-native";
import { router } from "expo-router";
import styles from "./styles";

interface FullWidthBannerProps {
  urlIsInner?: boolean;
  url: string;
  imageSource?: any;
}

export default function FullWidthBanner({ 
  urlIsInner = false, 
  url, 
  imageSource 
}: FullWidthBannerProps) {
  const handlePress = () => {
    if (!url) {
      console.error("URL is required");
      return;
    }
    if (urlIsInner) {
      router.push(url as any);
    } else {
      let validUrl = url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        validUrl = 'https://' + url;
      }
      
      Linking.openURL(validUrl).catch((err) => {
        console.error("Failed to open URL:", err);
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={imageSource || require("@/assets/images/fullWidthBanner.jpg")}
          style={styles.imageBackground}
          resizeMode="cover"
          imageStyle={styles.imageStyle}
        />
      </TouchableOpacity>
    </View>
  );
}