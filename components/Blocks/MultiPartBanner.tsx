import { View, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";
import { Route } from "expo-router";



interface SectionProps {
  imageSource?: string;
  url?: string;
  isInner?: boolean;
  text?: string;
}

interface MultiPartBannerProps {
  height?: number;
  gap?: number;
  width?: string;
  sections?: SectionProps[];
  onPress?: (url?: string, isInner?: boolean) => void;
}

export default function MultiPartBanner({
  height = 250,
  gap = 10,
  width = "100%",
  sections = [],
  onPress,
}: MultiPartBannerProps) {
  if (sections.length === 0) {
    return null;
  }

  const handlePress = (section: SectionProps) => {
    if (onPress) {
      onPress(section.url, section.isInner);
    } else {
      console.info("pressed !!", section);
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
          style={styles.section}
          onPress={() => handlePress(section)}
          activeOpacity={0.7}
        >
          <ImageBackground
            source={{ uri: section.imageSource || "https://via.placeholder.com/400x400/cccccc/ffffff?text=No+Image" }}
            resizeMode="cover"
            style={styles.image}
            imageStyle={styles.imageStyle}
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
  },
  section: {
    flex: 1,
    height: "100%",
    overflow: "hidden",
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    borderRadius: 8,
  },
});