// app/book.tsx
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { useTranslate } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { API } from "@/constants/api";
import { useResponsive } from "@/hooks/useResponsive";
import CustomText from "@/components/common/CustomText";
import BookPreList from "@/components/Blocks/BookPreList";
import PageHeader from "@/components/UI/PageHeader";
import styles from "./styles";
import { isFavorite, toggleFavorite, FavoriteItem } from "@/utils/favorites";
import BookDiscription from "@/components/UI/BookDiscription";
import CommentsCard from "@/components/UI/CommentsCard";


interface ProvidersData {
  book_size: string;
}

interface BookData {
  id: string;
  title: string;
  author: string;
  publisher: string;
  price: string;
  discountFa: string;
  percentFa: string;
  pic: string;
  isbn: string;
  number_pages: string;
  edition_number: string;
  des_fa: string;
  main_category: string;
  sub_category: string;
  publish_year: string;
  publish_year_fa: string;
  exist: string;
  size: string;
  providers: ProvidersData[];
  publisherbooklist:BookData[];
  authorbooklist:BookData[];
  relatedbooklist:BookData[];
}

const headerSection = [
  "توضیحات کتاب",
  "این انتشارات",
  "این نویسنده",
  "نظرات کاربران",
];

export default function Book() {
  const { isMobile } = useResponsive();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [book, setBook] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { t } = useTranslate();
  const { isRTL } = useLanguage();
  const [isLiked, setIsLiked] = useState(false);
  const [commented /* setCommented */] = useState(false);

  // بررسی وضعیت علاقه‌مندی
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (book) {
        const favStatus = await isFavorite(book.id);
        setIsLiked(favStatus);
      }
    };
    checkFavoriteStatus();
  }, [book]);

  // دریافت اطلاعات کتاب
  const fetchBookDetails = useCallback(async () => {
    if (!id) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: t("common.common.error"),
        text2: t("pages.Book.invalidCode"),
        position: "top",
        topOffset: 20,
        visibilityTime: 2000,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API.GET_PRODUCT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `productid=${encodeURIComponent(id)}`,
      });

      const result = await response.json();

      if (result.status === true && result.data) {
        setBook(result.data);
      }
      
    } catch (error) {
      console.error("Error fetching book details:", error);
      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: t("common.connectionError"),
        position: "top",
        topOffset: 20,
        visibilityTime: 2000,
      });
      router.back();
    } finally {
      setLoading(false);
    }
  }, [id, router, t]);

  useEffect(() => {
    fetchBookDetails();
  }, [fetchBookDetails]);


  const addToCart = () => {
    Toast.show({
      type: "success",
      text1: t("common.cart.added"),
      text2: `${book?.title} ${t("common.cart.addedToCart")}`,
      position: "top",
      topOffset: 20,
      visibilityTime: 2000,
    });
  };

  const playAudio = () => {
    console.info("play Sound");
  };

  const showCommentSection = () => {
    console.info("goto Comment Section");
  };

  const toggleWishlist = async () => {
    if (!book) return;

    const favoriteItem: FavoriteItem = {
      id: book.id,
      book_title: book.title,
      full_icon_address: book.pic,
      price: Number(book.price.replace(/,/g, "")),
      discount: Number(book.discountFa?.replace(/,/g, "")) || 0,
      percent: Number(book.percentFa) || 0,
    };

    const newStatus = await toggleFavorite(favoriteItem);
    setIsLiked(newStatus);

    Toast.show({
      type: "success",
      text1: newStatus ? t("common.cart.added") : t("common.cart.removed"),
      text2: newStatus
        ? `${book.title} ${t("pages.Book.addedToWishlist")}`
        : `${book.title} ${t("pages.Book.removedFromWishlist")}`,
      position: "top",
      topOffset: 20,
      visibilityTime: 2000,
    });
  };

  const shareAction = () => {
    Toast.show({
      type: "success",
      text1: t("pages.Book.shareSuccessMassage"),
      position: "top",
      topOffset: 20,
      visibilityTime: 2000,
      text1Style: { textAlign: "center" },
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <CustomText style={styles.loadingText}>
          {t("pages.BookFinder.loadingBook")}
        </CustomText>
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorIcon}>
          <Ionicons name="book-outline" size={80} color="#ccc" />
        </View>
        <CustomText style={styles.errorTitle}>
          {t("pages.Book.notFound")}
        </CustomText>
        <CustomText style={styles.errorText}>
          {t("pages.Book.notFoundDesc")}
        </CustomText>
        <TouchableOpacity
          style={styles.errorBackButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name={isRTL ? "arrow-forward" : "arrow-back"}
            size={20}
            color="#fff"
          />
          <CustomText style={styles.errorBackText}>
            {t("common.back")}
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  }

  const hasDiscount = book.discountFa;
  const isAvailable = book.exist === "1";

  return (
    <View style={styles.container}>
      <PageHeader title={book.title} />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          {/* book image section */}
          <View
            style={[styles.imageSection, { width: isMobile ? "100%" : "38%" }]}
          >
            {book.pic ? (
              <Image
                source={{ uri: book.pic }}
                style={styles.detailImage}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.detailImage, styles.noImage]}>
                <Ionicons name="book-outline" size={80} color="#ccc" />
              </View>
            )}
            {hasDiscount && (
              <View style={styles.discountBadge}>
                <CustomText style={styles.discountBadgeText}>
                  {book.percentFa}%
                </CustomText>
              </View>
            )}
          </View>

          {/* book info cards */}
          <View
            style={{
              width: isMobile ? "100%" : "60%",
              flexDirection: "column",
            }}
          >
            {/* author card */}
            <View style={[{ marginTop: 32, marginBottom: 50, marginEnd: 8 }]}>
              <View style={[styles.infoItem, { marginBottom: 16 }]}>
                <View style={styles.autherInfoIcon}>
                  <Ionicons name="person-outline" size={20} color="#fff" />
                </View>
                <View style={styles.infoText}>
                  <CustomText
                    variant="discription"
                    bold
                    style={[styles.infoLabel, { fontSize: 16 }]}
                  >
                    {t("pages.Book.auther")}
                  </CustomText>
                  <CustomText
                    variant="discription"
                    bold
                    style={[styles.infoValue, { fontSize: 18 }]}
                  >
                    {book.author || t("pages.Book.unknownAuthor")}
                  </CustomText>
                </View>
              </View>
              <View style={[styles.infoItem]}>
                <View style={styles.autherInfoIcon}>
                  <Ionicons name="book-outline" size={20} color="#fff" />
                </View>
                <View style={styles.infoText}>
                  <CustomText
                    variant="discription"
                    bold
                    style={[styles.infoLabel, { fontSize: 16 }]}
                  >
                    {t("pages.Book.publisher")}
                  </CustomText>
                  <CustomText
                    variant="discription"
                    bold
                    style={[styles.infoValue, { fontSize: 18 }]}
                  >
                    {book.publisher || t("common.common.unknown")}
                  </CustomText>
                </View>
              </View>
            </View>

            {/* action buttons */}
            <View
              style={{
                flexDirection: "row",
                gap: 12,
                justifyContent: "flex-end",
                marginBottom: 16,
              }}
            >
              <TouchableOpacity
                style={[styles.actionButton, isLiked && styles.wishlistActive]}
                onPress={toggleWishlist}
              >
                <Ionicons
                  name={isLiked ? "heart" : "heart-outline"}
                  size={24}
                  color={isLiked ? "#f44336" : "#666"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, true && styles.commentlistActive]}
                onPress={showCommentSection}
              >
                <Ionicons
                  name={commented ? "chatbubbles" : "chatbubbles-outline"}
                  size={24}
                  color="#929292"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton]}
                onPress={shareAction}
              >
                <Ionicons name="share-social" size={24} color="#929292" />
              </TouchableOpacity>
            </View>

            {/* price card */}
            <View
              style={[
                styles.priceSection,
                { flexDirection: "row-reverse", alignItems: "flex-end" },
              ]}
            >
              <View style={{ flex: 1 }}>
                <View style={styles.priceWrapper}>
                  {hasDiscount ? (
                    <>
                      <CustomText style={styles.oldPrice}>
                        {book.price} {t("common.cart.currency")}
                      </CustomText>
                      <CustomText style={styles.finalPrice}>
                        {book.discountFa} {t("common.cart.currency")}
                      </CustomText>
                    </>
                  ) : (
                    <CustomText style={styles.singlePrice}>
                      {Number(book.price).toLocaleString()}{" "}
                      {t("common.cart.currency")}
                    </CustomText>
                  )}
                </View>

                <View style={{ flexDirection: "row", gap: 12 }}>
                  <TouchableOpacity
                    style={[
                      styles.cartButton,
                      !isAvailable && styles.disabledButton,
                    ]}
                    onPress={addToCart}
                    disabled={!isAvailable}
                  >
                    <Ionicons name="book" size={22} color="#fff" />
                    <CustomText style={styles.cartButtonText}>
                      {isAvailable
                        ? t("pages.Book.addToCart")
                        : t("pages.Book.outOfStock")}
                    </CustomText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.eButton]}
                    onPress={playAudio}
                  >
                    <Ionicons name="reader-outline" size={28} color="white" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.audioButton]}
                    onPress={playAudio}
                  >
                    <Ionicons name="headset" size={28} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* book detail card */}
            <View style={styles.infoCard}>
              <View style={styles.infoGrid}>
                <View
                  style={[
                    styles.infoItem,
                    { width: isMobile ? "100%" : "45%" },
                  ]}
                >
                  <View style={styles.infoIcon}>
                    <Ionicons
                      name="barcode-outline"
                      size={20}
                      color="#4CAF50"
                    />
                  </View>
                  <View style={styles.infoText}>
                    <CustomText style={styles.infoLabel}>
                      {t("pages.Book.isbn")}
                    </CustomText>
                    <CustomText style={styles.infoValue}>
                      {book.isbn || t("common.common.unknown")}
                    </CustomText>
                  </View>
                </View>

                <View
                  style={[
                    styles.infoItem,
                    { width: isMobile ? "100%" : "45%" },
                  ]}
                >
                  <View style={styles.infoIcon}>
                    <Ionicons
                      name="document-text-outline"
                      size={20}
                      color="#4CAF50"
                    />
                  </View>
                  <View style={styles.infoText}>
                    <CustomText style={styles.infoLabel}>
                      {t("pages.Book.pages")}
                    </CustomText>
                    <CustomText style={styles.infoValue}>
                      {book.number_pages || t("common.unknown")}{" "}
                      {t("pages.Book.pagesUnit")}
                    </CustomText>
                  </View>
                </View>

                <View
                  style={[
                    styles.infoItem,
                    { width: isMobile ? "100%" : "45%" },
                  ]}
                >
                  <View style={styles.infoIcon}>
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color="#4CAF50"
                    />
                  </View>
                  <View style={styles.infoText}>
                    <CustomText style={styles.infoLabel}>
                      {t("pages.Book.year")}
                    </CustomText>
                    <CustomText style={styles.infoValue}>
                      {!isRTL
                        ? book.publish_year
                        : book.publish_year_fa || t("common.common.unknown")}
                    </CustomText>
                  </View>
                </View>

                <View
                  style={[
                    styles.infoItem,
                    { width: isMobile ? "100%" : "45%" },
                  ]}
                >
                  <View style={styles.infoIcon}>
                    <Ionicons name="layers-outline" size={20} color="#4CAF50" />
                  </View>
                  <View style={styles.infoText}>
                    <CustomText style={styles.infoLabel}>
                      {t("pages.Book.size")}
                    </CustomText>
                    <CustomText style={styles.infoValue}>
                      {book.providers[0]?.book_size || t("common.unknown")}
                    </CustomText>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* book info navbar */}
          <View style={styles.sectionNavbar}>
            {headerSection.map((title, index) => (
              <View key={index} style={styles.sectionNavbarItems}>
                <CustomText
                  variant="discription"
                  style={{ paddingVertical: 12 }}
                >
                  {title}
                </CustomText>
              </View>
            ))}
          </View>

          {/* book description */}
          {book.des_fa && <BookDiscription desText={book.des_fa} />}

          {/* from this publisher */}
          <View style={{ marginTop: 20, width: "100%" }}>
            <BookPreList
              label={t("pages.Book.samePublisher")}
              listId={"listID"}
              listHeight={350}
              listItemRatio={0.6}
              noMore={false}
              backColor={""}
              noBack={false}
              bookList={book?.publisherbooklist}
            />
          </View>

          {/* from this auther */}
          <View style={{ marginTop: 20, width: "100%" }}>
            <BookPreList
              label={t("pages.Book.sameAuther")}
              listId={"listID"}
              listHeight={350}
              listItemRatio={0.6}
              noMore={false}
              backColor={""}
              noBack={false}
              bookList={book?.authorbooklist}
            />
          </View>

          {/* related book list */}
          <View style={{ marginTop: 20, width: "100%" }}>
            <BookPreList
             label={t("pages.Book.relatedBooks")}
              listId={"listID"}
              listHeight={350}
              listItemRatio={0.6}
              noMore={false}
              backColor={""}
              noBack={false}
              bookList={book?.relatedbooklist}
            />
          </View>

          {/* comments section */}
         <CommentsCard />
        </View>
      </ScrollView>
    </View>
  );
}