import { View, StyleSheet } from "react-native";
import CustomText from "@/components/common/CustomText";
import { Ionicons } from "@expo/vector-icons";

interface CommentBoxProps {
  userName?: string;
  userComments?: string;
  rating?: number;
}

export default function CommentsList({
  userName,
  userComments,
  rating,
}: CommentBoxProps) {
  const starCount = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));

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
            <Ionicons
              key={star}
              name={star <= starCount ? "star" : "star-outline"}
              color={star <= starCount ? "#FFD700" : "#ddd"}
              size={12}
              style={{ marginHorizontal: 1 }}
            />
          ))}
        </View>
      </View>
      <CustomText variant="body" style={styles.comment}>
        {userComments}
      </CustomText>
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
  },
  stars: {
    marginHorizontal: 8,
    flexDirection: "row",
    flex: 1,
  },
  comment: {
    textAlign: "justify",
    color: "#444",
    lineHeight: 24,
  },
});
