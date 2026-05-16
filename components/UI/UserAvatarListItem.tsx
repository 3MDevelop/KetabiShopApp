// UserAvatarListItem.tsx
import { Image, View, StyleSheet } from "react-native";

interface UserAvatarListItemProps {
  avatarInd?: number; 
  imageSource: any;
  squared?: boolean;
}

export default function UserAvatarListItem({ 
  imageSource, 
}: UserAvatarListItemProps) {
  return (
    <View style={[
      styles.container,
    ]}>
      <Image 
        source={imageSource} 
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 80,
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});