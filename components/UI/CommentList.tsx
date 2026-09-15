import { View, ScrollView, StyleSheet } from "react-native";
import CustomText from "@/components/common/CustomText";
import { useResponsive } from "@/hooks/useResponsive";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import CommentsListItem from "./CommentsListItem";
import { useTranslate } from "@/hooks/useTranslation";

interface Comment {
  id: string | number;
  userName: string;
  comment: string;
  rating?: number;
}

interface commentListProps {
  comments?: Comment[];
}

export default function CommentList({ comments = [] }: commentListProps) {
  const { isMobile } = useResponsive();
  const { t } = useTranslate();

  return (
    <ScrollView
      style={{
        paddingHorizontal: 8,
        width: isMobile ? "100%" : "60%",
        height: 350,
      }}
      nestedScrollEnabled
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
        <View style={styles.emptyBox}>
          <Ionicons name="chatbox-ellipses-outline" size={36} color="#007AFF" />
          <CustomText variant="body" style={styles.emptyText}>
            {t("pages.Book.noComments")}
          </CustomText>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  emptyBox: {
    minHeight: 350,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  emptyText: {
    textAlign: "center",
    color: "#555",
    lineHeight: 26,
  },
});
