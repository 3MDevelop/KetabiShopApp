import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, ScrollView, View } from "react-native";

import FullWidthBanner from "@/components/Blocks/FullWidthBanner";
import CustomText from "@/components/common/CustomText";
import BackToTop from "@/components/UI/BackToTop";
import BookThumb from "@/components/UI/BookThumb";

import { API } from "@/constants/api";

import styles from "./styles";

interface Book {
  id: number;
  name: string;
  author: string;
  price: number;
  image: string;
  percent?: number;
  discount?: number;
}

export default function List() {
  const params = useLocalSearchParams();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const listID = params["id"];

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const capitalizeFirstLetter = (str: string): string => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      if (!listID) {
        setError("شناسه لیست مشخص نشده است");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API.GET_LIST, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `list_id=${encodeURIComponent(listID as string)}`,
        });

        const result = await response.json();

        if (result.status === true && result.list) {
          const formattedBooks = result.list.map((book: any) => ({
            id: book.id,
            name: book.book_title,
            author: book.author_info,
            price: book.main_price,
            image: book.full_icon_address,
            percent: book.percentFa,
            discount: book.discountFa,
          }));
          setBooks(formattedBooks);
        } else {
          setError("خطا در دریافت اطلاعات از سرور");
          setBooks([]);
        }
      } catch (err) {
        setError("مشکل در ارتباط با سرور");
        setBooks([]);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [listID]);

  const displayText = listID ? capitalizeFirstLetter(listID as string) : "";
  const listItemRatio = 0.64;

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollViewRef as any}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={true}
        indicatorStyle="black"
        persistentScrollbar={true}
      >
        <View style={styles.content}>
          {listID && (
            <FullWidthBanner
              height={100}
              fontSize={35}
              text={displayText}
              textColor="#06443a"
              isInner
              url="about"
              imageSource={require("@/assets/images/fullWidthBanner.jpg")}
            />
          )}

          {/* بارگذاری */}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#06443a" />
              <CustomText center style={{ marginTop: 10 }}>
                در حال بارگذاری...
              </CustomText>
            </View>
          )}

          {/* خطا */}
          {error && !loading && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle-outline" size={48} color="#f44336" />
              <CustomText center style={styles.errorText}>
                {error}
              </CustomText>
            </View>
          )}

          {/* لیست کتاب‌ها - نمایش عمودی و چند سطری */}
          {!loading && !error && books.length > 0 && (
            <View style={styles.booksGrid}>
              {books.map((book, index) => (
                <View
                  key={`${book.id}-${index}`}
                  style={[styles.bookItem, { height: 300 }]}
                >
                  <BookThumb
                    bookID={book.id}
                    bookName={book.name}
                    author={book.author}
                    price={book.price}
                    imageUrl={book.image}
                    ratio={listItemRatio}
                    percent={book.percent}
                    discount={book.discount}
                  />
                </View>
              ))}
            </View>
          )}

          {/* خالی */}
          {!loading && !error && books.length === 0 && (
            <View style={styles.emptyContainer}>
              <Ionicons name="book-outline" size={64} color="#ccc" />
              <CustomText center style={styles.emptyText}>
                هیچ کتابی در این لیست وجود ندارد
              </CustomText>
            </View>
          )}
        </View>
      </Animated.ScrollView>
      <BackToTop scrollY={scrollY} onPress={scrollToTop} />
    </View>
  );
}
