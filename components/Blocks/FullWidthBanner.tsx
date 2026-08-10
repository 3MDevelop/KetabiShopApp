// components/Blocks/FullWidthBanner.tsx
import {
  ImageBackground,
  View,
  TouchableOpacity,
  Linking,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { router } from "expo-router";
import { useState, useEffect, useRef, useCallback } from "react";
import CustomText from "../common/CustomText";

interface SlidesProps {
  url?: string;
  isInner?: boolean;
  imageSource?: string;
  textColor?: string;
  text?: string;
  fontSize?: number;
}

interface FullWidthBannerProps {
  height?: number;
  hasBtn?: boolean;
  delay?: number;
  bannerWidth?: string;
  slides?: SlidesProps[];
}

// تصویر پیش‌فرض از اینترنت
const DEFAULT_IMAGE = {
  uri: "https://via.placeholder.com/800x400/cccccc/ffffff?text=No+Image",
};

export default function FullWidthBanner({
  height = 250,
  hasBtn = true,
  delay = 3000,
  bannerWidth ,
  slides = [],
}: FullWidthBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<any>(null);
  const progressIntervalRef = useRef<any>(null);

  const currentSlide = slides[currentIndex] || null;

  const clearAllIntervals = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const goToNextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const goToPrevSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;

    clearAllIntervals();

    const safeDelay = delay || 3000;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (safeDelay / 50);
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 50);

    intervalRef.current = setInterval(() => {
      goToNextSlide();
    }, safeDelay);

    return () => clearAllIntervals();
  }, [slides.length, delay, goToNextSlide, clearAllIntervals]);

  if (slides.length === 0 || !currentSlide) {
    return null;
  }

  const { imageSource } = currentSlide;

  const handlePress = () => {
    if (!currentSlide?.url) {
      console.error("URL is required");
      return;
    }

    const url = currentSlide.url;

    if (currentSlide.isInner) {
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

  const imageSourceFinal: ImageSourcePropType = imageSource
    ? { uri: imageSource }
    : DEFAULT_IMAGE;

  return (
    <View style={[styles.container, { height, width: bannerWidth as any }]}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={{ flex: 1 }}
        disabled={!hasBtn}
      >
        <ImageBackground
          source={imageSourceFinal}
          style={styles.imageBackground}
          resizeMode="cover"
          imageStyle={styles.imageStyle}
        />
      </TouchableOpacity>

      {slides.length > 1 && (
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.dot, currentIndex === index && styles.dotActive]}
              onPress={() => {
                setCurrentIndex(index);
                setProgress(0);
              }}
            />
          ))}
        </View>
      )}

      {slides.length > 1 && (
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
      )}

      {slides.length > 1 && (
        <>
          <TouchableOpacity
            style={[styles.navButton, styles.prevButton]}
            onPress={goToPrevSlide}
          >
            <CustomText style={styles.navButtonText}>‹</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={goToNextSlide}
          >
            <CustomText style={styles.navButtonText}>›</CustomText>
          </TouchableOpacity>
        </>
      )}
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
    position: "relative",
    alignSelf: "center",
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
  dotsContainer: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  dotActive: {
    backgroundColor: "#fff",
    width: 20,
    borderRadius: 4,
  },
  progressContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
    zIndex: 100,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  navButton: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  prevButton: {
    left: 8,
  },
  nextButton: {
    right: 8,
  },
  navButtonText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
});
