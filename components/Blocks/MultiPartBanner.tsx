import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { router } from "expo-router";

interface SectionProps {
  imageSource?: string;
  url?: string;
}

interface MultiPartBannerProps {
  height?: number;
  gap?: number;
  curve?: number;
  width?: string;
  extendable?: boolean;
  sections?: SectionProps[];
}

export default function MultiPartBanner({
  height,
  gap,
  curve,
  width,
  sections = [],
}: MultiPartBannerProps) {

  if (sections.length === 0) {
    return null;
  }

  console.info("MultiPartBanner sections:", sections);

  const handlePress = (section: SectionProps) => {
    if (
      !section.url?.startsWith("http://") &&
      !section.url?.startsWith("https://")
    ) {
      Linking.openURL(section.url as any).catch((err) => {
        console.error("Failed to open URL:", err);
      });
    } else{
      router.push(section.url as any);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          height,
          width: width as any,
          gap,
        },
      ]}
    >
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.section, { borderRadius: curve }]}
          onPress={() => handlePress(section)}
          activeOpacity={0.7}
        >
          <ImageBackground
            source={{
              uri:
                section.imageSource ||
                "https://via.placeholder.com/400x400/cccccc/ffffff?text=No+Image",
            }}
            resizeMode="cover"
            style={styles.image}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "center",
  },
  section: {
    flex: 1,
    height: "100%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
