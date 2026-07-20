import { View, ScrollView } from "react-native";
import CustomText from "@/components/common/CustomText";
import { useResponsive } from "@/hooks/useResponsive";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import CommentsListItem from "./CommentsListItem";

interface Comment {
  id: string | number;
  userName: string;
  comment: string;
  rating?: number;
  date?: string;
}

interface commentListProps {
  newComments?: Comment[];
}

export default function CommentList({ newComments }: commentListProps) {
  const { isMobile } = useResponsive();
  const [comments, setComments] = useState<Comment[]>([]);

  

  // اگر newComments تغییر کرد، نظرات را به‌روز کن
  useEffect(() => {
    if (newComments && newComments.length > 0) {
      setComments((prev) => [...newComments, ...prev]);
    }
  }, [newComments]);

  return (
    <ScrollView
      style={{
        paddingHorizontal: 8,
        width: isMobile ? "100%" : "60%",
        maxHeight: 350,
      }}
    >
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <CommentsListItem
            key={comment.id || index}
            userName={comment.userName}
            userComments={comment.comment}
            rating={comment.rating}

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
          <Ionicons name="chatbox-ellipses-outline" size={32} color="#007AFF" />
          <CustomText variant="h4" style={{ marginHorizontal: 8 }}>
            هنوز نظری ثبت نشده
          </CustomText>
        </View>
      )}
    </ScrollView>
  );
}