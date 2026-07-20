import { View, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "@/components/common/CustomText";
import Toast from "react-native-toast-message";
import { useAuth } from "@/hooks/useAuth";
import { useResponsive } from "@/hooks/useResponsive";
import { useRouter } from "expo-router";

interface Comment {
  id: string | number;
  userName: string;
  comment: string;
  rating?: number;
  date?: string;
}

interface CommentFormProps {
  onCommentSubmitted?: (comment: Comment) => void;
  productId?: string;
}

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

export default function CommentForm({ onCommentSubmitted, productId }: CommentFormProps) {
  const { isMobile } = useResponsive();
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const [newComment, setNewComment] = useState("");
  const [commentRating, setCommentRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      Toast.show({
        type: "error",
        text1: "خطا",
        text2: "لطفاً متن نظر را وارد کنید",
        position: "top",
        topOffset: 20,
        visibilityTime: 2000,
      });
      return;
    }

    if (!isLoggedIn) {
      Toast.show({
        type: "error",
        text1: "نیاز به ورود",
        text2: "برای ثبت نظر وارد حساب خود شوید",
        position: "top",
        topOffset: 20,
        visibilityTime: 2000,
      });
      router.push("/login");
      return;
    }

    setIsSubmitting(true);

    try {
      // شبیه‌سازی ارسال به سرور
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newCommentObj: Comment = {
        id: Date.now(),
        userName: user?.nName || user?.name || "کاربر",
        comment: newComment,
        rating: commentRating,
        date: new Date().toLocaleDateString("fa-IR"),
      };

      // ارسال نظر به کامپوننت والد
      if (onCommentSubmitted) {
        onCommentSubmitted(newCommentObj);
      }

      // پاک کردن فرم
      setNewComment("");
      setCommentRating(0);

      Toast.show({
        type: "success",
        text1: "موفق",
        text2: "نظر شما با موفقیت ثبت شد",
        position: "top",
        topOffset: 20,
        visibilityTime: 2000,
      });
    } catch (error) {
      console.info(error)
      Toast.show({
        type: "error",
        text1: "خطا",
        text2: "مشکل در ثبت نظر",
        position: "top",
        topOffset: 20,
        visibilityTime: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
        <RatingStars rating={commentRating} onRate={setCommentRating} />
      </View>

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
        editable={!isSubmitting}
      />

      <TouchableOpacity
        style={{
          backgroundColor: newComment.trim() && !isSubmitting ? "#007AFF" : "#ccc",
          paddingVertical: 12,
          borderRadius: 8,
          marginTop: 12,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          gap: 8,
        }}
        onPress={handleSubmitComment}
        disabled={!newComment.trim() || isSubmitting}
      >
        {!isLoggedIn ? (
          <CustomText variant="caption" style={{ color: "#fff" }}>
            برای ثبت نظر وارد حساب خود شوید
          </CustomText>
        ) : isSubmitting ? (
          <CustomText style={{ color: "#fff", fontWeight: "bold" }}>
            در حال ارسال...
          </CustomText>
        ) : (
          <>
            <Ionicons name="send-outline" size={20} color="#fff" />
            <CustomText style={{ color: "#fff", fontWeight: "bold" }}>
              ارسال نظر
            </CustomText>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}