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
import CommentBox from "@/components/UI/CommentBox";


interface Comment {
  id: string | number;
  userName: string;
  comment: string;
  rating?: number;
  date?: string;
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
  exist: string;
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
      const response = await fetch("https://ketabishop.com/api/getproduct/", {
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

  const toggleWishlist = () => {
    setIsLiked(!isLiked);
    Toast.show({
      type: "success",
      text1: isLiked ? t("common.cart.removed") : t("common.cart.added"),
      text2: isLiked
        ? `${book?.title} ${t("pages.Book.removedFromWishlist")}`
        : `${book?.title} ${t("pages.Book.addedToWishlist")}`,
      position: "top",
      topOffset: 20,
      visibilityTime: 2000,
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

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
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
          <CustomText bold variant="h4" style={styles.bookTitle}>
            {book.title}
          </CustomText>
          <View style={{ width: 40 }} />
        </View>
      </View>

      <View style={styles.content}>
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

        <View
          style={{
            width: isMobile ? "100%" : "60%",
            flexDirection: !isMobile ? "column-reverse" : "column",
          }}
        >
          <View style={styles.priceSection}>
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

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[
                  styles.cartButton,
                  !isAvailable && styles.disabledButton,
                ]}
                onPress={addToCart}
                disabled={!isAvailable}
              >
                <Ionicons name="cart-outline" size={22} color="#fff" />
                <CustomText style={styles.cartButtonText}>
                  {isAvailable
                    ? t("pages.Book.addToCart")
                    : t("pages.Book.outOfStock")}
                </CustomText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.wishlistButton,
                  isLiked && styles.wishlistActive,
                ]}
                onPress={toggleWishlist}
              >
                <Ionicons
                  name={isLiked ? "heart" : "heart-outline"}
                  size={24}
                  color={isLiked ? "#f44336" : "#666"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.wishlistButton,
                  true && styles.commentlistActive,
                ]}
                onPress={showCommentSection}
              >
                <Ionicons
                  name={true ? "chatbubbles" : "chatbubbles-outline"}
                  size={24}
                  color="#189deb"
                />
              </TouchableOpacity>

              {true && (
                <TouchableOpacity
                  style={[styles.audioButton]}
                  onPress={playAudio}
                >
                  <Ionicons name="headset" size={24} color="#9C27B0" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.infoCard}>
            <CustomText style={styles.cardTitle}>
              {t("pages.Book.specifications")}
            </CustomText>

            <View style={styles.infoGrid}>
              <View
                style={[styles.infoItem, { width: isMobile ? "100%" : "45%" }]}
              >
                <View style={styles.infoIcon}>
                  <Ionicons name="book-outline" size={20} color="#4CAF50" />
                </View>
                <View style={styles.infoText}>
                  <CustomText style={styles.infoLabel}>
                    {t("pages.Book.publisher")}
                  </CustomText>
                  <CustomText style={styles.infoValue}>
                    {book.publisher || t("common.common.unknown")}
                  </CustomText>
                </View>
              </View>

              <View
                style={[styles.infoItem, { width: isMobile ? "100%" : "45%" }]}
              >
                <View style={styles.infoIcon}>
                  <Ionicons name="person-outline" size={20} color="#4CAF50" />
                </View>
                <View style={styles.infoText}>
                  <CustomText style={styles.infoLabel}>
                    {t("pages.Book.auther")}
                  </CustomText>
                  <CustomText style={styles.infoValue}>
                    {book.author || t("pages.Book.unknownAuthor")}
                  </CustomText>
                </View>
              </View>

              <View
                style={[styles.infoItem, { width: isMobile ? "100%" : "45%" }]}
              >
                <View style={styles.infoIcon}>
                  <Ionicons name="barcode-outline" size={20} color="#4CAF50" />
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
                style={[styles.infoItem, { width: isMobile ? "100%" : "45%" }]}
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
                style={[styles.infoItem, { width: isMobile ? "100%" : "45%" }]}
              >
                <View style={styles.infoIcon}>
                  <Ionicons name="calendar-outline" size={20} color="#4CAF50" />
                </View>
                <View style={styles.infoText}>
                  <CustomText style={styles.infoLabel}>
                    {t("pages.Book.year")}
                  </CustomText>
                  <CustomText style={styles.infoValue}>
                    {book.publish_year || t("common.common.unknown")}
                  </CustomText>
                </View>
              </View>

              <View
                style={[styles.infoItem, { width: isMobile ? "100%" : "45%" }]}
              >
                <View style={styles.infoIcon}>
                  <Ionicons name="layers-outline" size={20} color="#4CAF50" />
                </View>
                <View style={styles.infoText}>
                  <CustomText style={styles.infoLabel}>
                    {t("pages.Book.category")}
                  </CustomText>
                  <CustomText style={styles.infoValue}>
                    {book.main_category}{" "}
                    {book.sub_category ? `- ${book.sub_category}` : ""}
                  </CustomText>
                </View>
              </View>

              <View
                style={[styles.infoItem, { width: isMobile ? "100%" : "45%" }]}
              >
                <View style={styles.infoIcon}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={20}
                    color={isAvailable ? "#4CAF50" : "#f44336"}
                  />
                </View>
                <View style={styles.infoText}>
                  <CustomText style={styles.infoLabel}>
                    {t("pages.Book.stock")}
                  </CustomText>
                  <CustomText
                    style={[
                      styles.infoValue,
                      isAvailable ? styles.inStock : styles.outOfStock,
                    ]}
                  >
                    {isAvailable
                      ? t("pages.Book.inStock")
                      : t("pages.Book.outOfStock")}
                  </CustomText>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.sectionNavbar}>
          {headerSection.map((title, index) => (
            <View key={index} style={styles.sectionNavbarItems}>
              <CustomText variant="discription" style={{ paddingVertical: 12 }}>
                {title}
              </CustomText>
            </View>
          ))}
        </View>

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
            <View style={{ padding: 20, alignItems: "center", width: "100%" }}>
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
                  {isLoggedIn ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>
                      <Ionicons name="send-outline" size={20} color="#fff" />
                      <CustomText style={{ color: "#fff", fontWeight: "bold" }}>
                        ارسال نظر
                      </CustomText>
                    </>
                  )}
                </TouchableOpacity>

                {/* هشدار ورود */}
                {!isLoggedIn && (
                  <TouchableOpacity
                    style={{ marginTop: 8, alignItems: "center" }}
                    onPress={() => router.push("/login")}
                  >
                    <CustomText variant="caption" style={{ color: "#007AFF" }}>
                      برای ثبت نظر وارد حساب خود شوید
                    </CustomText>
                  </TouchableOpacity>
                )}
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
                    <CommentBox
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
  );
}
