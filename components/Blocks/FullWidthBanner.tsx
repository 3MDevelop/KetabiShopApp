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
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
  bannerWidth="100%" ,
  slides = [],
}: FullWidthBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedAtRef = useRef(Date.now());

  const currentSlide = slides[currentIndex] || null;
  const slideCount = slides.length;
  const safeDelay = Math.max(Number(delay) || 3000, 300);

  const restartTimer = useCallback(() => {
    startedAtRef.current = Date.now();
    setProgress(0);
  }, []);

  const goToNextSlide = useCallback(() => {
    if (slideCount === 0) return;
    setCurrentIndex((prev) => (prev + 1) % slideCount);
    restartTimer();
  }, [slideCount, restartTimer]);

  const goToPrevSlide = useCallback(() => {
    if (slideCount === 0) return;
    setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount);
    restartTimer();
  }, [slideCount, restartTimer]);

  useEffect(() => {
    if (slideCount <= 1) return;

    restartTimer();

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startedAtRef.current;
      setProgress(Math.min(100, (elapsed / safeDelay) * 100));

      if (elapsed >= safeDelay) {
        startedAtRef.current = Date.now();
        setProgress(0);
        setCurrentIndex((prev) => (prev + 1) % slideCount);
      }
    }, 50);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [slideCount, safeDelay, restartTimer]);

  const imageSource = currentSlide?.imageSource;
  const imageSourceFinal: ImageSourcePropType = useMemo(
    () => (imageSource ? { uri: imageSource } : DEFAULT_IMAGE),
    [imageSource]
  );

  if (slides.length === 0 || !currentSlide) {
    return null;
  }

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
                restartTimer();
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
