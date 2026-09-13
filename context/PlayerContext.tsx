import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";

interface Track {
  id: string;
  title: string;
  author: string;
  image: string;
  audioUrl: string;
}

interface PlayerContextType {
  isPlaying: boolean;
  currentTrack: Track | null;
  showMiniPlayer: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  playbackSpeed: number;
  playAudio: (track: Track) => Promise<void>;
  pauseAudio: () => Promise<void>;
  resumeAudio: () => Promise<void>;
  seekTo: (position: number) => Promise<void>;
  setPlaybackSpeed: (speed: number) => Promise<void>;
  closePlayer: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const player = useAudioPlayer(null, { updateInterval: 500 });
  const status = useAudioPlayerStatus(player);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playbackSpeed, setPlaybackSpeedState] = useState(1);

  useEffect(() => {
    if (status.didJustFinish) {
      setIsPlaying(false);
    }
  }, [status.didJustFinish]);

  const setPlaybackSpeed = async (speed: number) => {
    try {
      player.shouldCorrectPitch = true;
      player.setPlaybackRate(speed);
      setPlaybackSpeedState(speed);
    } catch (error) {
      console.error("Error setting playback speed:", error);
      setPlaybackSpeedState(speed);
    }
  };

  const playAudio = async (track: Track) => {
    try {
      setIsLoading(true);
      setCurrentTrack(track);
      setShowMiniPlayer(true);
      setPlaybackSpeedState(1);

      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: false,
        shouldPlayInBackground: false,
        shouldRouteThroughEarpiece: false,
        interruptionMode: "duckOthers",
      });

      player.replace({ uri: track.audioUrl });
      player.shouldCorrectPitch = true;
      player.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing audio:", error);
      setShowMiniPlayer(false);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const pauseAudio = async () => {
    player.pause();
    setIsPlaying(false);
  };

  const resumeAudio = async () => {
    player.play();
    setIsPlaying(true);
  };

  const seekTo = async (position: number) => {
    if (typeof position !== "number" || isNaN(position) || !isFinite(position)) {
      console.warn("Invalid seek position:", position);
      return;
    }

    try {
      const clampedPosition = Math.max(0, Math.min(position, status.duration || 0));
      await player.seekTo(clampedPosition);
    } catch (error) {
      console.error("Error during seek:", error);
    }
  };

  const closePlayer = () => {
    player.pause();
    void player.seekTo(0);
    setIsPlaying(false);
    setShowMiniPlayer(false);
    setCurrentTrack(null);
    setPlaybackSpeedState(1);
  };

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        currentTrack,
        showMiniPlayer,
        isLoading: isLoading || status.isBuffering,
        currentTime: status.currentTime,
        duration: status.duration,
        playbackSpeed,
        playAudio,
        pauseAudio,
        resumeAudio,
        seekTo,
        setPlaybackSpeed,
        closePlayer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within PlayerProvider");
  }
  return context;
};
