import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";
import CustomText from "@/components/common/CustomText";
import TagBox from "@/components/UI/TagBox";
import { useResponsive } from "@/hooks/useResponsive";

interface TagPreListProps {
  listHeight?: number;
  backColor?: string;
  tagTextColor?: string;
  itemsBackColor?: string;
  noBack?: boolean;
  tagList?: any;
}

export default function TagPreList({
  listHeight = 50,
  backColor = "green",
  tagTextColor = "white",
  itemsBackColor = "green",
  noBack = true,
  tagList,
}: TagPreListProps) {
  const scrollX = useRef(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [showLeftButton, setShowLeftButton] = useState(true);
  const [showRightButton, setShowRightButton] = useState(false);
  const scrollStep = 150;
  const contentWidth = useRef(0);
  const containerWidth = useRef(0);
  const { isMobile } = useResponsive();

  const [tags, setTags] = useState<any[]>([]);

  useEffect(() => {
    setTags(tagList);
  }, [tagList]);

  const displayTag = tags;

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

  if (displayTag.length === 0) {
    return (
      <View
        style={{
          width: "100%",
          paddingHorizontal: 8,
          height: listHeight,
          backgroundColor: backColor,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomText>noTag Found</CustomText>
      </View>
    );
  }

  return (
    <View style={{ width: "100%" }}>
      <View
        style={[
          
          !noBack && { backgroundColor: backColor },
        ]}
      >
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
              {displayTag.map((tag, index) => {
                console.info(tag.text);
                return (
                  <TagBox
                    key={`${tag.id}-${index}`}
                    /* backColor={itemsBackColor} */
                    height={listHeight}
                    tagText={tag.text}
                    /* textColor={tagTextColor} */
                    tagID={tag.tagID}
                  />
                );
              })}
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
    gap: 18,
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
