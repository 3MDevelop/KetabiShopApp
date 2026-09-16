import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import CustomText from "@/components/common/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";

interface CommentBoxProps {
  userName?: string;
  userComments?: string;
  rating?: number;
  isOwn?: boolean;
  isBusy?: boolean;
  onDelete?: () => void | Promise<void>;
  onApply?: (next: {
    comment: string;
    rating: number;
  }) => void | Promise<boolean | void>;
}

export default function CommentsListItem({
  userName,
  userComments = "",
  rating = 0,
  isOwn = false,
  isBusy = false,
  onDelete,
  onApply,
}: CommentBoxProps) {
  const originalRating = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
  const originalComment = String(userComments || "");
  const [isEditing, setIsEditing] = useState(false);
  const [draftComment, setDraftComment] = useState(originalComment);
  const [draftRating, setDraftRating] = useState(originalRating);

  useEffect(() => {
    if (!isEditing) {
      setDraftComment(originalComment);
      setDraftRating(originalRating);
    }
  }, [isEditing, originalComment, originalRating]);

  const hasChanges = useMemo(
    () =>
      draftComment.trim() !== originalComment.trim() ||
      draftRating !== originalRating,
    [draftComment, draftRating, originalComment, originalRating],
  );
  const canApply = isOwn && isEditing && hasChanges && !isBusy && !!draftComment.trim();
  const displayRating = isEditing ? draftRating : originalRating;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons
          name="person-circle"
          color="#afafaf"
          size={32}
          style={styles.avatar}
        />
        <CustomText variant="discription" style={styles.name}>
          {userName}
        </CustomText>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => {
                if (isEditing && !isBusy) {
                  setDraftRating(star);
                }
              }}
              disabled={!isEditing || isBusy}
              activeOpacity={isEditing ? 0.7 : 1}
            >
              <Ionicons
                name={star <= displayRating ? "star" : "star-outline"}
                color={star <= displayRating ? "#FFD700" : "#ddd"}
                size={12}
                style={{ marginHorizontal: 1 }}
              />
            </TouchableOpacity>
          ))}
        </View>
        {isOwn ? (
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => {
                if (isBusy) return;
                setIsEditing((prev) => {
                  if (prev) {
                    setDraftComment(originalComment);
                    setDraftRating(originalRating);
                    return false;
                  }
                  setDraftComment(originalComment);
                  setDraftRating(originalRating);
                  return true;
                });
              }}
              disabled={isBusy}
              accessibilityLabel="ویرایش نظر"
              style={styles.actionBtn}
            >
              <Ionicons
                name="create-outline"
                size={18}
                color={isEditing ? "#e7651a" : "#666"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (!isBusy) {
                  void onDelete?.();
                }
              }}
              disabled={isBusy}
              accessibilityLabel="حذف نظر"
              style={styles.actionBtn}
            >
              <Ionicons name="trash-outline" size={18} color="#FF3B30" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                if (!canApply) return;
                const ok = await onApply?.({
                  comment: draftComment.trim(),
                  rating: draftRating,
                });
                if (ok !== false) {
                  setIsEditing(false);
                }
              }}
              disabled={!canApply}
              accessibilityLabel="تأیید تغییرات"
              style={styles.actionBtn}
            >
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={canApply ? "#28a745" : "#ccc"}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      {isEditing ? (
        <TextInput
          style={styles.commentInput}
          value={draftComment}
          onChangeText={setDraftComment}
          multiline
          textAlign="right"
          editable={!isBusy}
        />
      ) : (
        <CustomText variant="body" style={styles.comment}>
          {userComments}
        </CustomText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    padding: 12,
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    marginHorizontal: 4,
  },
  name: {
    paddingTop: 4,
    marginHorizontal: 4,
    color: "#333",
    fontSize: 14,
    flexShrink: 1,
  },
  stars: {
    marginHorizontal: 8,
    flexDirection: "row",
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flexShrink: 0,
  },
  actionBtn: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  comment: {
    textAlign: "justify",
    color: "#444",
    lineHeight: 24,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    minHeight: 72,
    textAlignVertical: "top",
    textAlign: "right",
    writingDirection: "rtl",
    color: "#444",
    lineHeight: 24,
    fontSize: 14,
    backgroundColor: "#fff",
  },
});
