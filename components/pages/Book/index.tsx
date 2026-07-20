// app/book.tsx
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslate } from "@/hooks/useTranslation";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { BookListData } from "./BookListData";
import Toast from "react-native-toast-message";
import styles from "./styles";
import CustomText from "@/components/common/CustomText";
import { useResponsive } from "@/hooks/useResponsive";
import { useAuth } from "@/hooks/useAuth";
import { LinearGradient } from "expo-linear-gradient";
import BookPreList from "@/components/Blocks/BookPreList";
import CommentsList from "@/components/UI/CommentsList";
import { API } from "@/constants/api";

import { isFavorite, toggleFavorite, FavoriteItem } from "@/utils/favorites";

interface Comment {
  id: string | number;
  userName: string;
  comment: string;
  rating?: number;
  date?: string;
}

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
}

const headerSection = [
  "توضیحات کتاب",
  "این انتشارات",
  "این نویسنده",
  "نظرات کاربران",
];

const stripHtmlTags = (html: string) => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

export default function Book() {
  const { isMobile } = useResponsive();
  const { isLoggedIn, user } = useAuth();
  const [showMore, setShowMore] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();
  const [book, setBook] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { t } = useTranslate();
  const { isRTL } = useLanguage();
  const [isLiked, setIsLiked] = useState(false);
  // Comment states
  const [commented /* setCommented */] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [commentRating, setCommentRating] = useState(0);


  /* fake comment catch */
  useEffect(() => {
    const fetchCommentData = async () => {
      try {
        const response = await fetch("https://ketabishop.com/api/getstatic/", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `name=getComments`,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status === true && result.data) {
          setComments(result.data);
        } else {
          console.warn(result);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setCommentsLoading(false);
      }
    };
    fetchCommentData();
  }, []);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (book) {
        const favStatus = await isFavorite(book.id);
        setIsLiked(favStatus);
      }
    };

    checkFavoriteStatus();
  }, [book]);

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
        /*         console.info(result.data);
         */
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
    console.info("goto Commnet Section");
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

  const RatingStars = ({
    rating,
    onRate,
  }: {
    rating: number;
    onRate: (value: number) => void;
  }) => {
    return (
      <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => onRate(star)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={star <= rating ? "star" : "star-outline"}
              size={16}
              color={star <= rating ? "#FFD700" : "#ccc"}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      Toast.show({
        type: "error",
        text1: "خطا",
        text2: "لطفاً متن نظر را وارد کنید",
      });
      return;
    }

    if (!isLoggedIn) {
      Toast.show({
        type: "error",
        text1: "نیاز به ورود",
        text2: "برای ثبت نظر وارد حساب خود شوید",
      });
      router.push("/login");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newCommentObj: Comment = {
        id: Date.now(),
        userName: user?.nName as string,
        comment: newComment,
        rating: commentRating,
        date: new Date().toLocaleDateString("fa-IR"),
      };

      setComments([newCommentObj, ...comments]);
      setNewComment("");
      setCommentRating(0);

      Toast.show({
        type: "success",
        text1: "موفق",
        text2: "نظر شما با موفقیت ثبت شد",
      });
    } catch {
      Toast.show({
        type: "error",
        text1: "خطا",
        text2: "مشکل در ثبت نظر",
      });
    } finally {
    }
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

  console.info(book.providers[0]);

  return (
    <View style={styles.container}>
      {/* page header */}
      <View style={[styles.headerContainer]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name={isRTL ? "arrow-forward" : "arrow-back"}
              size={24}
              color="#333"
            />
          </TouchableOpacity>
          <CustomText
            bold
            variant="h4"
            style={styles.bookTitle}
            numberOfLines={1}
          >
            {book.title}
          </CustomText>
          <View style={{ width: 40 }} />
        </View>
      </View>

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
                    style={[styles.infoValue, , { fontSize: 18 }]}
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
                    style={[styles.infoValue, , { fontSize: 18 }]}
                  >
                    {book.publisher || t("common.common.unknown")}
                  </CustomText>
                </View>
              </View>
            </View>

            {/* action botton */}
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
                    <Ionicons
                      name="headset"
                      size={28}
                      color="white" /* "#FF6B35" */
                    />
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
                      {book.providers[0].book_size}
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

          {book.des_fa && (
            <View
              style={[
                styles.descriptionCard,
                {
                  height: !showMore ? 200 : "auto",
                  overflow: "hidden",
                  paddingBottom: !showMore ? 30 : "auto",
                },
              ]}
            >
              <CustomText style={styles.cardTitle}>
                📖 {t("pages.Book.description")}
              </CustomText>
              <CustomText style={styles.descriptionText}>
                {stripHtmlTags(book.des_fa)}
              </CustomText>
              <TouchableOpacity
                onPress={() => setShowMore(!showMore)}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "100%",
                }}
              >
                <LinearGradient
                  colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 50,
                    pointerEvents: "none",
                  }}
                />
                <Ionicons
                  name="chevron-down"
                  size={24}
                  color="#505050"
                  style={{
                    alignSelf: "center",
                    transform: [{ rotate: showMore ? "180deg" : "0deg" }],
                  }}
                />
              </TouchableOpacity>
            </View>
          )}


          {/* from this publisher */}
          <View style={{ marginTop: 20, width: "100%" }}>
            <BookPreList
              label={"از همین انتشارات"}
              listId={"listID"}
              listHeight={350}
              fImage="https://ketabishop.com/static/app/images/publisher/384.png"
              listItemRatio={0.6}
              noMore={false}
              backColor={""}
              noBack={false}
              bookList={BookListData}
            />
          </View>

          {/* from this auther */}
          <View style={{ marginTop: 20, width: "100%" }}>
            <BookPreList
              label={"از همین نویسنده"}
              listId={"listID"}
              listHeight={350}
              fImage="https://ketabishop.com/static/app/images/auther/453.png"
              listItemRatio={0.6}
              noMore={false}
              backColor={""}
              noBack={false}
              bookList={BookListData}
            />
          </View>


          {/* copmments section */}
          <View
            style={[
              styles.commentsCard,
              {
                flexDirection: isMobile ? "column" : "row",
                backgroundColor: "#fcfcfc",
                padding: 16,
              },
            ]}
          >
            {commentsLoading ? (
              <View
                style={{ padding: 20, alignItems: "center", width: "100%" }}
              >
                <ActivityIndicator size="large" color="#007AFF" />
                <CustomText>در حال دریافت اطلاعات...</CustomText>
              </View>
            ) : (
              <>
                {/* فرم ثبت نظر */}
                <View
                  style={{
                    width: isMobile ? "100%" : "40%",
                    paddingHorizontal: 8,
                    marginBottom: isMobile ? 16 : 0,
                    justifyContent: "space-between",
                  }}
                >
                  <CustomText variant="h4" bold style={{ marginBottom: 12 }}>
                    ثبت نظر
                  </CustomText>

                  {/* ریتینگ */}
                  <View
                    style={{
                      marginBottom: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <CustomText
                      variant="caption"
                      style={{ marginBottom: 4, color: "#666", paddingTop: 8 }}
                    >
                      امتیاز شما
                    </CustomText>
                    <RatingStars
                      rating={commentRating}
                      onRate={setCommentRating}
                    />
                  </View>

                  {/* ورودی متن */}
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: "#ddd",
                      borderRadius: 8,
                      padding: 12,
                      minHeight: 100,
                      flexGrow: 1,
                      textAlignVertical: "top",
                      backgroundColor: "#fff",
                    }}
                    placeholder="نظر خود را بنویسید..."
                    placeholderTextColor="#999"
                    value={newComment}
                    onChangeText={setNewComment}
                    multiline
                    numberOfLines={4}
                  />

                  {/* دکمه ارسال */}
                  <TouchableOpacity
                    style={{
                      backgroundColor: newComment.trim() ? "#007AFF" : "#ccc",
                      paddingVertical: 12,
                      borderRadius: 8,
                      marginTop: 12,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: 8,
                    }}
                    onPress={handleSubmitComment}
                    disabled={!newComment.trim()}
                  >
                    {!isLoggedIn ? (
                      <CustomText variant="caption" style={{ color: "#fff" }}>
                        برای ثبت نظر وارد حساب خود شوید
                      </CustomText>
                    ) : (
                      <>
                        <Ionicons name="send-outline" size={20} color="#fff" />
                        <CustomText
                          style={{ color: "#fff", fontWeight: "bold" }}
                        >
                          ارسال نظر
                        </CustomText>
                      </>
                    )}
                  </TouchableOpacity>

                  {/* هشدار ورود */}
                </View>

                {/* لیست نظرات */}
                <ScrollView
                  style={{
                    paddingHorizontal: 8,
                    width: isMobile ? "100%" : "60%",
                    maxHeight: 350,
                  }}
                >
                  {comments.length > 0 ? (
                    comments.map((comment, index) => (
                      <CommentsList
                        key={comment.id || index}
                        userName={comment.userName}
                        userComments={comment.comment}
                        /* rating={comment.rating} */
                      />
                    ))
                  ) : (
                    <View
                      style={{
                        minHeight: 100,
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons
                        name="chatbox-ellipses-outline"
                        size={32}
                        color="#007AFF"
                      />
                      <CustomText variant="h4" style={{ marginHorizontal: 8 }}>
                        هنوز نظری ثبت نشده
                      </CustomText>
                    </View>
                  )}
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
