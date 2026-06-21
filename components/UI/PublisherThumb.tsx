// components/UI/BookThumb.tsx

import { TouchableOpacity, View, Image } from "react-native";
import CustomText from "@/components/common/CustomText";
import { useRouter } from "expo-router";
interface PublisherThumbProps {
  publisherID?: number;
  publisherName?: string;
  imageUrl?: string;
  ratio?: number;
}

export default function PublisherThumb({
  publisherID,
  publisherName,
  imageUrl,
  ratio,
}: PublisherThumbProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        console.info(publisherID);
        router.push({
          pathname: "/publisher",
          params: { id: publisherID },
        });
      }}
      activeOpacity={0.7}
      style={{
        height: "100%",
        padding: 10,
        minWidth: 100,
        flex: 1,
        alignSelf: "center",
        aspectRatio: ratio,
      }}
    >
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
          {publisherName}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
}
