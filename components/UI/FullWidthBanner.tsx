import { ImageBackground, View, TouchableOpacity, Linking ,StyleSheet } from "react-native";
import { router } from "expo-router";

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    height: 250,
    borderRadius: 8,
    padding: 0,
    overflow: "hidden",
    marginBottom:16
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    borderRadius: 8,
  },
})