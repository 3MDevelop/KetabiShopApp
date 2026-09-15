import { useCallback, useEffect, useState } from "react";
import {
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BookImageGalleryProps {
  visible: boolean;
  images: string[];
  onClose: () => void;
}

export default function BookImageGallery({
  visible,
  images,
  onClose,
}: BookImageGalleryProps) {
  const [index, setIndex] = useState(0);
  const [gridMode, setGridMode] = useState(false);
  const [natural, setNatural] = useState({ width: 2, height: 3 });
  const canNav = images.length > 1;
  const { width, height } = useWindowDimensions();
  const maxHeight = height * 0.9;
  const maxWidth = width * 0.9;
  const aspect = natural.width / natural.height || 2 / 3;
  let imageHeight = maxHeight;
  let imageWidth = imageHeight * aspect;
  if (imageWidth > maxWidth) {
    imageWidth = maxWidth;
    imageHeight = imageWidth / aspect;
  }

  useEffect(() => {
    if (!visible) return;
    setIndex(0);
    setGridMode(false);
  }, [visible]);

  const goPrev = useCallback(() => {
    if (images.length < 2) return;
    setIndex((current) => (current - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    if (images.length < 2) return;
    setIndex((current) => (current + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (Platform.OS !== "web" || !visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [visible, onClose, goPrev, goNext]);

  const current = images[index];
  if (!current) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <Pressable
          style={styles.closeBtn}
          onPress={onClose}
          hitSlop={12}
          {...(Platform.OS === "web" ? { tabIndex: 0 } : {})}
        >
          <Ionicons name="close" size={28} color="#fff" />
        </Pressable>

        {gridMode ? (
          <ScrollView
            style={styles.gridWrap}
            contentContainerStyle={styles.gridContent}
            showsVerticalScrollIndicator={false}
          >
            {images.map((src, i) => (
              <Pressable
                key={`${src}-${i}`}
                style={styles.gridItem}
                onPress={() => {
                  setIndex(i);
                  setGridMode(false);
                }}
              >
                <Image
                  source={{ uri: src }}
                  style={styles.gridImage}
                  resizeMode="contain"
                />
              </Pressable>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.stage} pointerEvents="box-none">
            {canNav && (
              <Pressable style={[styles.arrow, styles.arrowLeft]} onPress={goPrev}>
                <Ionicons name="chevron-back" size={28} color="#fff" />
              </Pressable>
            )}

            <View
              style={[
                styles.mainFrame,
                { width: imageWidth, height: imageHeight },
              ]}
            >
              <Image
                source={{ uri: current }}
                style={styles.mainImage}
                resizeMode="contain"
                onLoad={(event) => {
                  const source = event.nativeEvent.source;
                  if (source?.width && source?.height) {
                    setNatural({
                      width: source.width,
                      height: source.height,
                    });
                  }
                }}
              />
            </View>

            {canNav && (
              <Pressable style={[styles.arrow, styles.arrowRight]} onPress={goNext}>
                <Ionicons name="chevron-forward" size={28} color="#fff" />
              </Pressable>
            )}
          </View>
        )}

        {canNav && (
          <View style={styles.bottomBar} pointerEvents="box-none">
            {!gridMode && (
              <View style={styles.thumbsBar}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.thumbsContent}
                >
                  {images.map((src, i) => (
                    <Pressable
                      key={`${src}-thumb-${i}`}
                      onPress={() => setIndex(i)}
                      style={[
                        styles.thumb,
                        i === index && styles.thumbActive,
                      ]}
                    >
                      <Image
                        source={{ uri: src }}
                        style={styles.thumbImage}
                        resizeMode="contain"
                      />
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}

            <Pressable
              style={styles.gridBtn}
              onPress={() => setGridMode((open) => !open)}
            >
              <Ionicons name="grid" size={22} color="#fff" />
            </Pressable>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 3,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  stage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 56,
  },
  mainFrame: {
    overflow: "hidden",
    maxWidth: "100%",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    marginTop: -22,
    zIndex: 2,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowLeft: {
    left: 16,
  },
  arrowRight: {
    right: 16,
  },
  bottomBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 12,
  },
  thumbsBar: {
    flex: 1,
    maxWidth: 720,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  thumbsContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  thumb: {
    width: 56,
    height: 72,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "transparent",
  },
  thumbActive: {
    borderColor: "#fff",
  },
  thumbImage: {
    width: "100%",
    height: "100%",
  },
  gridBtn: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  gridWrap: {
    flex: 1,
    marginTop: 56,
    marginBottom: 80,
  },
  gridContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  gridItem: {
    width: 140,
    height: 180,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  gridImage: {
    width: "100%",
    height: "100%",
  },
});
