import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import CustomText from "@/components/common/CustomText";
import BookThumb from "@/components/UI/BookThumb";
import { useResponsive } from "@/hooks/useResponsive";

interface PreListProps {
  label?: string;
  apiDetail?: string;
  listHeight?: number;
  fImage?: any;
  listItemRatio?: number;
  hasMore?: boolean;
  bgColor?: any;
}

export default function PreList({
  label,
  fImage,
  listHeight = 250,
  listItemRatio = 0.64,
  hasMore = true,
  bgColor = "#fff",
  
}: PreListProps) {
  const [aspectRatio, setAspectRatio] = useState(1);
  const scrollX = useRef(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [showLeftButton, setShowLeftButton] = useState(true);
  const [showRightButton, setShowRightButton] = useState(false);
  const scrollStep = 150;
  const contentWidth = useRef(0);
  const containerWidth = useRef(0);
  const { isMobile } = useResponsive();



  const defaultBooks = [
    { id: "1", name: "کتاب 1", color: "#FF6B6B" },
    { id: "2", name: "کتاب 2", color: "#4ECDC4" },
    { id: "3", name: "کتاب 3", color: "#45B7D1" },
    { id: "4", name: "کتاب 4", color: "#96CEB4" },
    { id: "5", name: "کتاب 5", color: "#FFEAA7" },
    { id: "6", name: "کتاب 6", color: "#DDA0DD" },
    { id: "7", name: "کتاب 7", color: "#98D8C8" },
  ];

  useEffect(() => {
    if (fImage?.width && fImage?.height) {
      setAspectRatio(fImage.width / fImage.height);
    }
  }, [fImage]);

  const handleBookPress = (bookName: string) => {
    Alert.alert("کلیک شد", `کتاب ${bookName} انتخاب شد`);
  };

  const scrollRight = () => {
    scrollViewRef.current?.scrollTo({
      x: scrollX.current + scrollStep,
      animated: true,
    });
    console.info(scrollX.current);
  };

  const scrollLeft = () => {
    scrollViewRef.current?.scrollTo({
      x: scrollX.current - scrollStep,
      animated: true,
    });
  };

  return (
    <View style={{ width: "100%" }}>
      <View style={[styles.categoryCard, { backgroundColor: bgColor }]}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            {label && (
              <CustomText bold variant="h4" style={styles.categoryName}>{label}</CustomText>
            )}
            {hasMore && (
              <TouchableOpacity>
                <Ionicons name="arrow-back-sharp" size={22} color="gray" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: listHeight,
            overflow: "hidden",
          }}
        >
          {fImage && !isMobile && (
            <Image
              source={fImage}
              resizeMode="cover"
              style={{
                height: listHeight,
                width: aspectRatio * listHeight,
                backgroundColor: "#ddd",
                marginStart: 10,
                borderRadius: 8,
              }}
            />
          )}

          <View style={styles.container}>
            {showLeftButton && !isMobile && (
              <TouchableOpacity
                style={[styles.navButton, styles.prevButton]}
                onPress={scrollLeft}
              >
                <Ionicons name="chevron-back" size={24} color="#333" />
              </TouchableOpacity>
            )}

            <ScrollView
              ref={scrollViewRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onContentSizeChange={(width) => {
                contentWidth.current = width;
              }}
              onLayout={(e) => {
                containerWidth.current = e.nativeEvent.layout.width;
              }}
              onScroll={(e) => {
                const x = e.nativeEvent.contentOffset.x;

                scrollX.current = x;

                // RTL
                const maxScroll = contentWidth.current - containerWidth.current;

                setShowLeftButton(Math.abs(x) < maxScroll - 10);
                setShowRightButton(x < -10);
              }}
              contentContainerStyle={styles.scrollContent}
            >
              {defaultBooks.map((book, index) => (
                <BookThumb
                  key={`${book.id}-${index}`}
                  label={book.name}
                  backgroundColor={book.color}
                  onPress={() => handleBookPress(book.name)}
                  ratio={listItemRatio}
                />
              ))}
            </ScrollView>

            {showRightButton && !isMobile && (
              <TouchableOpacity
                style={[styles.navButton, styles.nextButton]}
                onPress={scrollRight}
              >
                <Ionicons name="chevron-forward" size={24} color="#000000" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: "100%",
  },

  header: {
    width: "100%",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 8,
  },

  categoryName: {
    color: "#333",
    marginStart: "auto",
    marginEnd:16
  },

  container: {
    flex: 1,
    position: "relative",
    height: "100%",
  },

  scrollContent: {
    alignItems: "center",
    gap: 10,
  },

  navButton: {
    backgroundColor: "rgba(236, 244, 255, 0.4)",
    position: "absolute",
    height: "100%",
    width: 36,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    elevation: 20,
  },

  prevButton: {
    left: 0,
    shadowColor: "#ffffff",
    shadowRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: { width: 8, height: 0 },
  },

  nextButton: {
    right: 0,
    shadowColor: "#ffffff",
    shadowRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: { width: -8, height: 0 },
  },
});
