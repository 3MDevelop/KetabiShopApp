// context/PlayerContext.tsx
import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
import { Audio } from 'expo-av';

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
  playAudio: (track: Track) => Promise<void>;
  pauseAudio: () => Promise<void>;
  resumeAudio: () => Promise<void>;
  closePlayer: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  const playAudio = async (track: Track) => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      setIsLoading(true);
      setCurrentTrack(track);
      setShowMiniPlayer(true);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      const { sound } = await Audio.Sound.createAsync(
        { uri: track.audioUrl },
        { shouldPlay: true }
      );

      soundRef.current = sound;
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
        }
      });

    } catch (error) {
      console.error('Error playing audio:', error);
      setShowMiniPlayer(false);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const pauseAudio = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  const resumeAudio = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const closePlayer = async () => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
    setIsPlaying(false);
    setShowMiniPlayer(false);
    setCurrentTrack(null);
  };

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        currentTrack,
        showMiniPlayer,
        isLoading,
        playAudio,
        pauseAudio,
        resumeAudio,
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
    throw new Error('usePlayer must be used within PlayerProvider');
  }
  return context;
};