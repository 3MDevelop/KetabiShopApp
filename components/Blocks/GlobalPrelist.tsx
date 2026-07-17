import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";
import CustomText from "@/components/common/CustomText";
/* import BookThumb from "@/components/UI/BookThumb"; */
import { useResponsive } from "@/hooks/useResponsive";
import { useRouter } from "expo-router";

interface BookPreListProps {
  label?: string;
  discription?: string;
  itemWidth?: number;
  itemHeight?: number;
  itemList?: any;
  moreUrl?: string;
  moreID?: number;
  backColor?: string;
  itemGap?: number;
  listView?: boolean;
  itemDefBackColor?: string;
  itemBoarderRadius?: number;
}

export default function GlobalPreList({
  label,
  discription,
  itemWidth = 10,
  itemHeight,
  backColor,
  itemList,
  moreUrl,
  moreID,
  itemGap = 10,
  listView,
  itemDefBackColor,
  itemBoarderRadius,
}: BookPreListProps) {
  const scrollX = useRef(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [showLeftButton, setShowLeftButton] = useState(true);
  const [showRightButton, setShowRightButton] = useState(false);
  const [lessItem, setLessItem] = useState(false);
  const scrollStep = 150;
  const contentWidth = useRef(0);
  const containerWidth = useRef(0);
  const { isMobile } = useResponsive();
  const router = useRouter();

  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    setItems(itemList);
  }, [itemList]);

  const displayList = items;

  const updateScrollButtonsVisibility = () => {
    const hasOverflow = contentWidth.current > containerWidth.current;

    if (!hasOverflow) {
      setShowLeftButton(false);
      setShowRightButton(false);
      setLessItem(true);
      return;
    }

    const maxScroll = contentWidth.current - containerWidth.current;
    setShowRightButton(scrollX.current * -1 > 5);
    setShowLeftButton(scrollX.current * -1 < maxScroll - 5);
  };

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

  if (displayList.length === 0) {
    return (
      <View
        style={[
          styles.categoryCard,
          {
            backgroundColor: "lightgray",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <CustomText>List notFound</CustomText>
      </View>
    );
  }

  return (
    <View style={{ width: "100%" }}>
      <View style={[styles.categoryCard]}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={{marginStart:"auto"}}>
              {label && (
                <CustomText bold variant="h4" style={styles.categoryName}>
                  {label}
                </CustomText>
              )}

              {discription && (
                <CustomText bold variant="discription" style={{marginEnd:25,marginTop:8}}>
                  {discription}
                </CustomText>
              )}
            </View>
            {moreUrl && (
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: moreUrl as any,
                    params: moreID ? { id: String(moreID) } : {},
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
            overflow: "hidden",
          }}
        >
          <View style={[styles.container, { backgroundColor: backColor }]}>
            {showLeftButton && !isMobile && (
              <View style={[styles.navButton, { left: 0 }]}>
                <TouchableOpacity
                  style={{
                    height: 42,
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "center",
                    borderBottomEndRadius: 8,
                    borderTopEndRadius: 8,
                  }}
                  onPress={scrollLeft}
                >
                  <Ionicons
                    name="chevron-back-sharp"
                    size={24}
                    color="#696969"
                  />
                </TouchableOpacity>
              </View>
            )}

            <ScrollView
              ref={scrollViewRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onContentSizeChange={(width) => {
                contentWidth.current = width;
                updateScrollButtonsVisibility();
              }}
              onLayout={(e) => {
                containerWidth.current = e.nativeEvent.layout.width;
                updateScrollButtonsVisibility();
              }}
              onScroll={(e) => {
                scrollX.current = e.nativeEvent.contentOffset.x;
                updateScrollButtonsVisibility();
              }}
              contentContainerStyle={[
                styles.scrollContent,
                {
                  gap: itemGap,
                  alignItems: "stretch",
                },
                lessItem
                  ? {
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }
                  : null,
                !listView
                  ? {
                      width: "100%",
                      flexWrap: "wrap",
                    }
                  : null,
              ]}
            >
              {displayList.map((data, index) => (
                <TouchableOpacity
                  key={`${data.id}-${index}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: data.backColor || itemDefBackColor,
                    borderRadius: itemBoarderRadius,
                    overflow: "hidden",
                  }}
                  onPress={() => {
                    router.push({
                      pathname: data.url as any,
                      params: data.id ? { id: String(data.id) } : {},
                    });
                  }}
                >
                  <Image
                    style={{ width: itemWidth, height: itemHeight }}
                    resizeMode="cover"
                    source={{ uri: data.image }}
                  />
                  <CustomText
                    variant="text"
                    center
                    style={{ width: itemWidth, padding: 8 }}
                  >
                    {data.lable}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {showRightButton && !isMobile && (
              <View style={[styles.navButton, { right: 0 }]}>
                <TouchableOpacity
                  style={{
                    height: 42,
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "center",
                    borderBottomStartRadius: 8,
                    borderTopStartRadius: 8,
                  }}
                  onPress={scrollRight}
                >
                  <Ionicons name="chevron-forward" size={24} color="#696969" />
                </TouchableOpacity>
              </View>
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
    padding: 8,
    alignItems: "center",
  },

  navButton: {
    position: "absolute",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    elevation: 20,
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
