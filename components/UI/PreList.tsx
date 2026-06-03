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
  listId?: string;
}

export default function PreList({
  label,
  fImage,
  listHeight = 250,
  listItemRatio = 0.64,
  hasMore = true,
  bgColor = "#fff",
  listId = "1",
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

  const api = "https://ketabishop.com/api/getlist/";
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookListFromAPI = async (listIdParam: string = "1") => {
    setLoading(true);
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `list_id=${encodeURIComponent(listIdParam)}`,
      });

      const result = await response.json();

      if (result.status === true && result.list) {
        const formattedBooks = result.list
          .slice(0, 15)
          .map((book: any, index: number) => ({
            id: book.id,
            name: book.book_title,
            color: `hsl(${(index * 30) % 360}, 70%, 60%)`,
            image: book.full_icon_address,
            author: book.author_info,
            price: book.main_price,
          }));
        setBooks(formattedBooks);
      } else {
        console.error("خطا در دریافت لیست:", result);
        setBooks([]);
      }
    } catch (error) {
      console.error("خطا در ارتباط با سرور:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookListFromAPI(listId);
  }, [listId]);

  const displayBooks = books;

  useEffect(() => {
    if (fImage?.width && fImage?.height) {
      setAspectRatio(fImage.width / fImage.height);
    }
  }, [fImage]);

  const handleBookPress = (bookName: string) => {
    Alert.alert("کلیک شد", `کتاب ${bookName} انتخاب شد`);
  };

  const scrollRight = () => {
    const newX = scrollX.current + scrollStep;
    scrollViewRef.current?.scrollTo({
      x: newX,
      animated: true,
    });
  };

  const scrollLeft = () => {
    const newX = scrollX.current - scrollStep;
    scrollViewRef.current?.scrollTo({
      x: newX,
      animated: true,
    });
  };

  if (loading) {
    return (
      <View
        style={[
          styles.categoryCard,
          {
            backgroundColor: bgColor,
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
    return null;
  }

  return (
    <View style={{ width: "100%" }}>
      <View style={[styles.categoryCard, { backgroundColor: bgColor }]}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            {label && (
              <CustomText bold variant="h4" style={styles.categoryName}>
                {label}
              </CustomText>
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
                const maxScroll = contentWidth.current - containerWidth.current;
                setShowLeftButton(x > 10);
                setShowRightButton(x < maxScroll - 10);
              }}
              contentContainerStyle={styles.scrollContent}
            >
              {displayBooks.map((book, index) => (
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
    marginEnd: 16,
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
