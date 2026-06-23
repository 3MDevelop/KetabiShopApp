import { View } from "react-native";
import CustomText from "@/components/common/CustomText";
import { Ionicons } from "@expo/vector-icons";

interface CommentBoxProps {
  userName?: string;
  userComments?: string;
  rating?: number;
}

export default function CommentBox({
  userName,
  userComments,
  rating = 0,
}: CommentBoxProps) {
 const randomRating = Math.floor(Math.random() * 6);
  return (
    <View
      style={{
        width: "100%",
        borderRadius: 4,
        backgroundColor: "white",
        padding: 8,
        marginBottom: 8,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
      >
        <Ionicons
          name="person-circle"
          color="#afafaf"
          size={32}
          style={{ marginHorizontal: 4 }}
        />
        <CustomText
          variant="discription"
          style={{ paddingTop: 4, marginHorizontal: 4 }}
        >
          {userName}
        </CustomText>
        <View style={{ marginHorizontal: 8, flexDirection: "row" }}>
          {Array(randomRating)
            .fill(0)
            .map((_, index) => (
              <Ionicons
                key={index}
                name="star"
                color="#FFD700"
                size={12}
                style={{ marginHorizontal: 2 }}
              />
            ))}
        </View>
      </View>
      <CustomText variant="text" style={{ textAlign: "justify" }}>
        {userComments}
      </CustomText>
    </View>
  );
}
