import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef,useEffect } from "react";
import CustomText from "@/components/common/CustomText";
import AutherThumb from "@/components/UI/AutherThumb";
import { useResponsive } from "@/hooks/useResponsive";
import { useRouter } from "expo-router";

interface AutherPreListProps {
  label?: string;
  listHeight?: number;
  listItemRatio?: number;
  noMore?: boolean;
  backColor?: string;
  listId?: any;
  noBack?: boolean;
  autherList?: any;
}

export default function AutherPreList({
  label,
  listHeight = 300,
  listItemRatio = 0.64,
  noMore,
  backColor = "#fff",
  listId,
  noBack = false,
  autherList,
}: AutherPreListProps) {
  const scrollX = useRef(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [showLeftButton, setShowLeftButton] = useState(true);
  const [showRightButton, setShowRightButton] = useState(false);
  const scrollStep = 150;
  const contentWidth = useRef(0);
  const containerWidth = useRef(0);
  const { isMobile } = useResponsive();
  const router = useRouter();

  const [authers, setAuthers] = useState<any[]>([]);

  useEffect(() => {
    setAuthers(autherList);  
  }, [autherList]);

  const displayAuther = authers;

  const scrollRight = () => {
    const newX = scrollX.current + scrollStep;
    scrollViewRef.current?.scrollTo({
      x: newX,
      animated: true,
    });
  };

  const scrollLeft = () => {
    scrollViewRef.current?.scrollTo({
      x: scrollX.current - scrollStep,
      animated: true,
    });
  };

  if (displayAuther.length === 0) {
    return (
      <View
        style={[
          styles.categoryCard,
          {
            height: listHeight,
            backgroundColor: backColor,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <CustomText>هیچ کتابی یافت نشد</CustomText>
      </View>
    );
  }

  return (
    <View style={{ width: "100%" }}>
      <View
        style={[styles.categoryCard, !noBack && { backgroundColor: backColor }]}
      >
        <View style={styles.header}>
          <View style={styles.headerRow}>
            {label && (
              <CustomText bold variant="h4" style={styles.categoryName}>
                {label}
              </CustomText>
            )}
            {!noMore && (
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: "/auther",
                    params: { id: listId },
                  });
                }}
              >
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
          <View style={styles.container}>
            {showLeftButton && !isMobile && (
              <TouchableOpacity
                style={[styles.navButton, styles.prevButton]}
                onPress={scrollLeft}
              >
                <Ionicons name="chevron-back-sharp" size={36} color="#fa1414" />
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
                scrollX.current = e.nativeEvent.contentOffset.x;
                const maxScroll = contentWidth.current - containerWidth.current;
                setShowRightButton(scrollX.current * -1 > 5);
                setShowLeftButton(scrollX.current * -1 < maxScroll - 5);
              }}
              contentContainerStyle={styles.scrollContent}
            >
              {displayAuther.map((auther, index) =>{ 
                return(
                <AutherThumb
                  key={`${auther.id}-${index}`}
                  autherID={auther.autherID}
                  autherName={auther.name}
                  imageUrl={auther.image}
                  ratio={listItemRatio}
                />
              )})}
            </ScrollView>

            {showRightButton && !isMobile && (
              <TouchableOpacity
                style={[styles.navButton, styles.nextButton]}
                onPress={scrollRight}
              >
                <Ionicons name="chevron-forward" size={36} color="#fa1414" />
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
    padding: 8,
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
    marginEnd: 16,
  },

  container: {
    flex: 1,
    position: "relative",
    height: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },

  scrollContent: {
    alignItems: "center",
    gap: 5,
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

  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  errorText: {
    color: "#f44336",
    fontSize: 14,
    marginTop: 12,
    textAlign: "center",
  },

  retryButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },

  retryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
