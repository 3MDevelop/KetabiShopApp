// components/UI/BookThumb.tsx

import { TouchableOpacity, View, Image } from "react-native";
import CustomText from "@/components/common/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
interface BookThumbProps {
  bookID?: number;
  bookName?: string;
  author?: string;
  price?: number;
  imageUrl?: string;
  ratio?: number;
  percent?: number;
  discount?: number;
  color?: string;
}

export default function BookThumb({
  bookID,
  bookName,
  price,
  imageUrl,
  ratio,
  percent,
  discount,
}: BookThumbProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/book",
          params: { id: bookID },
        })
      }
      activeOpacity={0.7}
      style={{
        backgroundColor: "#e9e9e9",
        height: "100%",
        padding: 10,
        minWidth: 100,
        flex: 1,
        alignSelf: "center",
        aspectRatio: ratio,
      }}
    >
      {percent && (
        <View
          style={{
            position: "absolute",
            top: -3,
            left: 0,
            flexDirection: "row-reverse",
            justifyContent: "flex-start",
            alignItems: "center",
            zIndex: 99,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Ionicons name="bookmark-sharp" color={"red"} size={46} />
            <CustomText
              variant="discription"
              bold
              style={{
                color: "white",
                position: "absolute",
                alignSelf: "center",
              }}
            >
              {percent + "%"}
            </CustomText>
          </View>
        </View>
      )}

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        {imageUrl ? (
          <Image
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
            source={{ uri: imageUrl }}
          />
        ) : (
          <CustomText>notFound</CustomText>
        )}
      </View>

      <View
        style={{
          marginTop: 12,
          height: "22%",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CustomText
          bold
          variant="caption"
          style={{ fontSize: 15, marginBottom: 8 }}
          center
        >
          {bookName}
        </CustomText>
        
        {percent && (
          <View
            style={{
              marginTop: 5,
              flexDirection: "row-reverse",
              gap: 8,
              alignItems: "center",
            }}
          >
            <CustomText
              variant="caption"
              style={{ textDecorationLine: "line-through", color: "#999" }}
            >
              {price}
            </CustomText>
            <CustomText
              variant="caption"
              style={{ color: "#4CAF50", fontWeight: "bold" }}
            >
              {discount}
            </CustomText>
            <CustomText
              variant="caption"
              style={{ color: "#4CAF50", fontWeight: "bold" }}
            >
              تومان
            </CustomText>
          </View>
        )}
        {!percent && <CustomText variant="caption">{price} تومان</CustomText>}
        {!percent && <CustomText variant="caption">{price}</CustomText>}
      </View>
    </TouchableOpacity>
  );
}

/* const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingBottom: 40,
    height: "100%",
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  label: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  bookImage: {
    backgroundColor: "#f0f0f0",
  },
});
 */
