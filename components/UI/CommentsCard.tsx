/* @/components/ui/CommentsCard */

import { View, StyleSheet, ActivityIndicator } from "react-native";
import CustomText from "../common/CustomText";
import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { useResponsive } from "@/hooks/useResponsive";

interface Comment {
  id: string | number;
  userName: string;
  comment: string;
  rating?: number;
  date?: string;
}

interface CommentsCardProps {
  prodID?: number;
}

export default function CommentsCard({ prodID }: CommentsCardProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);

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

  const handleNewComment = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  const { isMobile } = useResponsive();
  return (
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
          <CommentForm
            onCommentSubmitted={handleNewComment}
          />

          <CommentList newComments={comments} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    width: "100%",
    flexWrap: "wrap",
  },
  commentsCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 24,
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    width: "100%",
    flexWrap: "wrap",
  },
});
