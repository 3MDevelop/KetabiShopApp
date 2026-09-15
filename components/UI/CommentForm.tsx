import { View, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "@/components/common/CustomText";
import Toast from "react-native-toast-message";
import { useAuth } from "@/hooks/useAuth";
import { useResponsive } from "@/hooks/useResponsive";
import { useRouter } from "expo-router";

import { API } from "@/constants/api";

interface Comment {
  id: string | number;
  userID?: string | number;
  userName: string;
  comment: string;
  rating?: number;
}

interface CommentFormProps {
  onCommentSubmitted?: (comment: Comment) => void | Promise<void>;
  productId?: string;
}

function isApiSuccess(result: { status?: unknown } | null | undefined) {
  const status = result?.status;
  return status === true || status === "true" || status === 1 || status === "1";
}

async function readApiResult(response: Response) {
  const text = (await response.text()).replace(/^\uFEFF/, "").trim();
  if (!text) {
    return { status: response.ok, msg: "" };
  }

  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(text.slice(start, end + 1));
      } catch {
        /* fall through */
      }
    }
    return { status: response.ok, msg: "" };
  }
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

    if (!isLoggedIn || user?.ID == null) {
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

    if (!productId) {
      Toast.show({
        type: "error",
        text1: "خطا",
        text2: "شناسه کتاب نامعتبر است",
        position: "top",
        topOffset: 20,
        visibilityTime: 2000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const body = [
        `userID=${encodeURIComponent(String(user.ID))}`,
        `productID=${encodeURIComponent(productId)}`,
        `star=${encodeURIComponent(String(commentRating))}`,
        `comment=${encodeURIComponent(newComment.trim())}`,
      ].join("&");

      const response = await fetch(API.setComment, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      const result = await readApiResult(response);

      if (!isApiSuccess(result)) {
        Toast.show({
          type: "error",
          text1: "خطا",
          text2: result?.msg || "مشکل در ثبت نظر",
          position: "top",
          topOffset: 20,
          visibilityTime: 2000,
        });
        return;
      }

      const commentText = newComment.trim();
      const postedComment: Comment = {
        id: `local-${Date.now()}`,
        userID: user.ID,
        userName: user.nName || user.name || "کاربر",
        comment: commentText,
        rating: commentRating,
      };

      setNewComment("");
      setCommentRating(0);
      await onCommentSubmitted?.(postedComment);

      Toast.show({
        type: "success",
        text1: "موفق",
        text2: result?.msg || "نظر شما با موفقیت ثبت شد",
        position: "top",
        topOffset: 20,
        visibilityTime: 2000,
      });
    } catch (error) {
      console.info(error);
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
        height: 350,
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
          flex: 1,
          textAlignVertical: "top",
          textAlign: "right",
          writingDirection: "rtl",
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
          backgroundColor:
            newComment.trim() && !isSubmitting ? "#007AFF" : "#ccc",
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