/* @/components/ui/CommentsCard */

import { View, StyleSheet, ActivityIndicator } from "react-native";
import { shadow } from "@/utils/shadow";
import CustomText from "../common/CustomText";
import React, { useCallback, useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { useResponsive } from "@/hooks/useResponsive";
import { API } from "@/constants/api";
import { useAuth } from "@/hooks/useAuth";
import { useTranslate } from "@/hooks/useTranslation";

export interface Comment {
  id: string | number;
  userID?: string | number;
  userName: string;
  comment: string;
  rating?: number;
  date?: string;
}

interface CommentsCardProps {
  productID?: string | number;
  onHasCommentedChange?: (hasCommented: boolean) => void;
}

function commentDisplayName(
  row: Record<string, unknown>,
  currentUser?: { ID?: number; nName?: string; name?: string } | null,
) {
  if (
    currentUser?.ID != null &&
    row.userID != null &&
    String(row.userID) === String(currentUser.ID)
  ) {
    return (
      String(currentUser.nName || currentUser.name || "").trim() || "کاربر"
    );
  }

  const raw = row.user;
  if (raw && typeof raw === "object") {
    const user = raw as Record<string, unknown>;
    const nick = String(user.nName || user.userName || user.name || "").trim();
    if (nick) return nick;
  }

  return (
    String(raw || row.nName || row.userName || row.user_name || row.name || "").trim() ||
    "کاربر"
  );
}

function parseComments(
  raw: unknown,
  currentUser?: { ID?: number; nName?: string; name?: string } | null,
): Comment[] {
  let data = raw;
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((item, index) => {
    const row = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
    const rating = Number(row.star ?? row.rating);
    return {
      id: (row.commentID as string | number) ?? (row.id as string | number) ?? `${row.userID ?? "c"}-${index}`,
      userID: row.userID as string | number | undefined,
      userName: commentDisplayName(row, currentUser),
      comment: String(row.comment || row.text || row.message || "").trim(),
      rating: Number.isFinite(rating) ? rating : 0,
      date: row.regTime ? String(row.regTime) : row.date ? String(row.date) : undefined,
    };
  });
}

export default function CommentsCard({
  productID,
  onHasCommentedChange,
}: CommentsCardProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const { user } = useAuth();
  const { t } = useTranslate();
  const { isMobile } = useResponsive();

  const fetchComments = useCallback(async (silent = false) => {
    if (!productID) {
      setComments([]);
      setCommentsLoading(false);
      return;
    }

    if (!silent) {
      setCommentsLoading(true);
    }
    try {
      const body = [
        `userID=${encodeURIComponent(user?.ID != null ? String(user.ID) : "0")}`,
        `productID=${encodeURIComponent(String(productID))}`,
      ].join("&");

      const response = await fetch(API.getComments, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      const result = await response.json();
      if (result?.status === true) {
        const next = parseComments(result.data, user);
        if (!silent || next.length > 0) {
          setComments(next);
        }
      } else if (!silent) {
        setComments([]);
      }
    } catch (error) {
      console.error(error);
      if (!silent) {
        setComments([]);
      }
    } finally {
      if (!silent) {
        setCommentsLoading(false);
      }
    }
  }, [productID, user]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  useEffect(() => {
    const uid = user?.ID;
    onHasCommentedChange?.(
      uid != null &&
        comments.some(
          (item) => item.userID != null && String(item.userID) === String(uid),
        ),
    );
  }, [comments, user?.ID, onHasCommentedChange]);

  const handleCommentSubmitted = async (comment: Comment) => {
    setComments((prev) => [comment, ...prev]);
    await new Promise((resolve) => setTimeout(resolve, 600));
    await fetchComments(true);
  };

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
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#007AFF" />
          <CustomText>{t("common.common.loading")}</CustomText>
        </View>
      ) : (
        <>
          <CommentForm
            productId={productID != null ? String(productID) : undefined}
            onCommentSubmitted={handleCommentSubmitted}
          />
          <CommentList comments={comments} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  commentsCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 24,
   
    ...shadow("#000", { width: 0, height: 2 }, 0.07, 8, 3),
    width: "100%",
    flexWrap: "wrap",
  },
  loadingWrap: {
    padding: 20,
    alignItems: "center",
    width: "100%",
    gap: 8,
  },
});
