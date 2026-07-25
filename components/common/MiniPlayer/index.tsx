// components/common/MiniPlayer.tsx
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "@/components/common/CustomText";
import { usePlayer } from "@/context/PlayerContext";
import { useTheme } from "@/context/ThemeContext";
import styles from "./styles";
export default function MiniPlayer() {
  const {
    isPlaying,
    currentTrack,
    isLoading,
    pauseAudio,
    resumeAudio,
    closePlayer,
  } = usePlayer();
  const { theme } = useTheme();

  if (!currentTrack) return null;

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      resumeAudio();
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.surface || "#fff" },
      ]}
    >
      <View style={styles.content}>
        {/* تصویر */}
        <Image source={{ uri: currentTrack.image }} style={styles.image} />

        {/* اطلاعات */}
        <View style={styles.info}>
          <CustomText bold numberOfLines={1} style={styles.title}>
            {currentTrack.title}
          </CustomText>
          <CustomText variant="caption" numberOfLines={1} style={styles.author}>
            {currentTrack.author}
          </CustomText>
        </View>

        {/* دکمه‌های کنترل */}
        <View style={styles.controls}>
          {isLoading ? (
            <ActivityIndicator
              size="small"
              color={theme.colors.primary || "#007AFF"}
            />
          ) : (
            <TouchableOpacity
              onPress={handlePlayPause}
              style={styles.controlButton}
            >
              <Ionicons
                name={isPlaying ? "pause-circle" : "play-circle"}
                size={36}
                color={theme.colors.primary || "#007AFF"}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={closePlayer} style={styles.controlButton}>
            <Ionicons name="close" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

