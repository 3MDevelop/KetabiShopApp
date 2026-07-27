// components/common/MiniPlayer/index.tsx
import {
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "@/components/common/CustomText";
import { usePlayer } from "@/context/PlayerContext";
import { useTheme } from "@/context/ThemeContext";
import styles from "./styles";
import { useState, useCallback, useRef } from "react";

export default function MiniPlayer() {
  const {
    isPlaying,
    currentTrack,
    isLoading,
    currentTime,
    duration,
    playbackSpeed,
    pauseAudio,
    resumeAudio,
    seekTo,
    setPlaybackSpeed,
    closePlayer,
  } = usePlayer();
  const { theme } = useTheme();

  const [mute, setMute] = useState(false);
  const progressRef = useRef<View>(null);

  const muteHandler = () => {
    setMute(!mute);
  };

  const timeHandler = useCallback(
    (value: number) => {
      if (!duration || isNaN(duration) || duration <= 0) return;

      const newTime = Math.max(0, Math.min(currentTime + value, duration));

      if (!isNaN(newTime) && isFinite(newTime)) {
        seekTo(newTime);
      }
    },
    [currentTime, duration, seekTo],
  );

  const speedHandler = useCallback(async () => {
    const speeds = [1, 1.25, 1.5, 1.75, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    const newSpeed = speeds[nextIndex];
    await setPlaybackSpeed(newSpeed);
  }, [playbackSpeed, setPlaybackSpeed]);

  const handleProgressPress = (event: any) => {
    const { target, pageX } = event.nativeEvent;

    if (!target || !duration || duration <= 0) {
      console.warn("Invalid target or duration");
      return;
    }

    // برای Web - استفاده از getBoundingClientRect
    if (Platform.OS === "web" && target.getBoundingClientRect) {
      const rect = target.getBoundingClientRect();
      const width = rect.width;
      const clickX = pageX - rect.left;

      if (width > 0 && clickX >= 0) {
        const progress = Math.max(0, Math.min(clickX / width, 1));
        const newTime = progress * duration;

        if (
          !isNaN(newTime) &&
          isFinite(newTime) &&
          newTime >= 0 &&
          newTime <= duration
        ) {
          seekTo(newTime);
        }
      }
    } else if (target.measure) {
      // برای موبایل - استفاده از measure
      target.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number,
        ) => {
          if (width > 0 && duration > 0) {
            const clickX = event.nativeEvent.pageX || pageX;
            const progress = Math.max(0, Math.min(clickX / width, 1));
            const newTime = progress * duration;

            if (
              !isNaN(newTime) &&
              isFinite(newTime) &&
              newTime >= 0 &&
              newTime <= duration
            ) {
              seekTo(newTime);
            }
          }
        },
      );
    }
  };

  if (!currentTrack) return null;

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      resumeAudio();
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds) || !isFinite(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.miniPlayerBack || "#fff" },
      ]}
    >
      <View style={[styles.content, { maxWidth: 1000, height: "100%" }]}>
        <Image source={{ uri: currentTrack.image }} style={styles.image} />

        <View style={{ marginStart: 32 }}>
          <CustomText bold numberOfLines={1} style={styles.title}>
            {currentTrack.title}
          </CustomText>
          <CustomText variant="caption" numberOfLines={1} style={styles.author}>
            {currentTrack.author}
          </CustomText>
        </View>

        <View style={[styles.controls, { flexGrow: 1 }]}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              height: "100%",
            }}
          >
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color={theme.colors.primary || "#007AFF"}
              />
            ) : (
              <View style={{ alignItems: "center", width: "100%" }}>
                <View
                  style={{ flexDirection: "row-reverse", alignItems: "center" }}
                >
                  <TouchableOpacity onPress={() => timeHandler(-10)}>
                    <Ionicons
                      name={"refresh-circle-outline"}
                      size={28}
                      color="#999"
                      style={{
                        transform: [{ scaleX: -1 }, { rotate: "90deg" }],
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handlePlayPause}
                    style={{ marginHorizontal: 12 }}
                  >
                    <Ionicons
                      name={isPlaying ? "pause-circle" : "play-circle"}
                      size={42}
                      color={theme.colors.primary || "#007AFF"}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => timeHandler(10)}>
                    <Ionicons
                      name={"refresh-circle-outline"}
                      size={28}
                      color="#999"
                      style={{
                        transform: [{ rotate: "90deg" }],
                      }}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: "row-reverse",
                    alignItems: "center",
                    width: "100%",
                    marginTop: 4,
                  }}
                >
                  <CustomText variant="caption" style={{ minWidth: 36 }}>
                    {formatTime(currentTime)}
                  </CustomText>

                  <TouchableOpacity
                    ref={progressRef}
                    style={{
                      flex: 1,
                      height: 4,
                      backgroundColor: "#e0e0e0",
                      borderRadius: 2,
                      marginHorizontal: 8,
                      position: "relative",
                    }}
                    onPress={handleProgressPress}
                    activeOpacity={1}
                  >
                    <View
                      style={{
                        position: "absolute",
                        left: 0,
                        width: `${progress}%`,
                        height: 4,
                        backgroundColor: theme.colors.primary || "#007AFF",
                        borderRadius: 2,
                      }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        left: `${progress}%`,
                        top: -4,
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: theme.colors.primary || "#007AFF",
                        marginLeft: -6,
                      }}
                    />
                  </TouchableOpacity>

                  <CustomText variant="caption" style={{ minWidth: 36 }}>
                    {formatTime(duration)}
                  </CustomText>

                  <TouchableOpacity
                    onPress={muteHandler}
                    style={{ marginStart: 12 }}
                  >
                    <Ionicons
                      name={mute ? "volume-mute" : "volume-high"}
                      size={18}
                      color="#999"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={speedHandler}
                    style={{ marginStart: 8 }}
                  >
                    <Ionicons
                      name={"speedometer-outline"}
                      size={18}
                      color="#999"
                    />
                  </TouchableOpacity>

                  <CustomText
                    variant="caption"
                    style={{ marginStart: 4, color: "#999", minWidth: 28 }}
                  >
                    {playbackSpeed}x
                  </CustomText>
                </View>
              </View>
            )}
          </View>

          <TouchableOpacity onPress={closePlayer} style={{ marginStart: 12 }}>
            <Ionicons name="close" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
