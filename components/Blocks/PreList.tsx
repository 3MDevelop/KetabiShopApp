import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useRef, useCallback } from "react";
import CustomText from "@/components/common/CustomText";
import BookThumb from "@/components/UI/BookThumb";
import { useResponsive } from "@/hooks/useResponsive";
import { useRouter } from "expo-router";

import { API } from "@/constants/api";

interface PreListProps {
  key?: any;
  label?: string;
  apiDetail?: string;
  listHeight?: number;
  fImage?: any;
  listItemRatio?: number;
  noMore?: boolean;
  backColor?: string;
  listId?: any;
  noBack?: boolean;
}

export default function PreList({
  label,
  fImage,
  listHeight = 300,
  listItemRatio = 0.64,
  noMore,
  backColor = "#fff",
  listId,
  noBack = false,
}: PreListProps) {
  const scrollX = useRef(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [showLeftButton, setShowLeftButton] = useState(true);
  const [showRightButton, setShowRightButton] = useState(false);
  const scrollStep = 150;
  const contentWidth = useRef(0);
  const containerWidth = useRef(0);
  const { isMobile } = useResponsive();
  const router = useRouter();

  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.info(listId)
  const apiUrl = API.GET_LIST;

  const fetchBookListFromAPI = useCallback(
    async (listIdParam: string = "1") => {
      if (!apiUrl) {
        setError("آدرس API مشخص نشده است");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `list_id=${encodeURIComponent(listIdParam)}`,
        });

        const result = await response.json();

        if (result.status === true && result.list) {
          const formattedBooks = result.list.map(
            (book: any, index: number) => ({
              id: book.id,
              name: book.book_title,
              color: `hsl(${(index * 30) % 360}, 70%, 60%)`,
              image: book.full_icon_address,
              author: book.author_info,
              price: book.main_price,
              percent: book.percentFa,
              discount: book.discountFa,
            }),
          );
          setBooks(formattedBooks);
        } else {
          setError("خطا در دریافت اطلاعات از سرور");
          setBooks([]);
        }
      } catch (err) {
        console.error("خطا در ارتباط با سرور:", err);
        setError("مشکل در ارتباط با سرور");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    },
    [apiUrl],
  );

  useEffect(() => {
    if (apiUrl) {
      fetchBookListFromAPI(listId);
    }
  }, [listId, apiUrl, fetchBookListFromAPI]);

  const displayBooks = books;

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

  if (error) {
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
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#f44336" />
          <CustomText style={styles.errorText}>{error}</CustomText>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => fetchBookListFromAPI(listId)}
          >
            <CustomText style={styles.retryText}>تلاش مجدد</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // حالت بارگذاری
  if (loading) {
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
        <CustomText>در حال بارگذاری...</CustomText>
      </View>
    );
  }

  if (displayBooks.length === 0) {
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
                    pathname: "/list",
                    params: { id:listId },
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
          {fImage && !isMobile && (
            <View
              style={{
                height: "100%",
                marginStart: 10,
                aspectRatio: listItemRatio,
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <Image
                source={fImage}
                resizeMode="cover"
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
            </View>
          )}

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
              {displayBooks.map((book, index) => (
                <BookThumb
                  key={`${book.id}-${index}`}
                  bookID={book.id}
                  bookName={book.name}
                  author={book.author}
                  price={book.price}
                  imageUrl={book.image}
                  ratio={listItemRatio}
                  percent={book.percent}
                  discount={book.discount}
                />
              ))}
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
