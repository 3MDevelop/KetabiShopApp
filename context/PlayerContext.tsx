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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeedState] = useState(1);
  const soundRef = useRef<Audio.Sound | null>(null);
  const intervalRef = useRef<any>(null);

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const updateTime = async () => {
    if (soundRef.current) {
      try {
        const status = await soundRef.current.getStatusAsync();
        if (status.isLoaded) {
          setCurrentTime(status.positionMillis / 1000);
          if (status.durationMillis) {
            setDuration(status.durationMillis / 1000);
          }
        }
      } catch (error) {
        console.error('Error updating time:', error);
      }
    }
  };

  const setPlaybackSpeed = async (speed: number) => {
    if (soundRef.current) {
      try {
        await soundRef.current.setRateAsync(speed, true);
        setPlaybackSpeedState(speed);
      } catch (error) {
        console.error('Error setting playback speed:', error);
      }
    } else {
      setPlaybackSpeedState(speed);
    }
  };

  const playAudio = async (track: Track) => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
        stopInterval();
      }

      setIsLoading(true);
      setCurrentTrack(track);
      setShowMiniPlayer(true);
      setCurrentTime(0);
      setDuration(0);
      setPlaybackSpeedState(1);

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

      if (playbackSpeed !== 1) {
        await sound.setRateAsync(playbackSpeed, true);
      }

      const status = await sound.getStatusAsync();
      if (status.isLoaded && status.durationMillis) {
        setDuration(status.durationMillis / 1000);
      }

      intervalRef.current = setInterval(updateTime, 500);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setCurrentTime(status.positionMillis / 1000);
          if (status.durationMillis) {
            setDuration(status.durationMillis / 1000);
          }
          if (status.didJustFinish) {
            setIsPlaying(false);
            stopInterval();
            setCurrentTime(0);
          }
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
      stopInterval();
    }
  };

  const resumeAudio = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync();
      setIsPlaying(true);
      if (!intervalRef.current) {
        intervalRef.current = setInterval(updateTime, 500);
      }
    }
  };

  const seekTo = async (position: number) => {
    if (typeof position !== 'number' || isNaN(position) || !isFinite(position)) {
      console.warn('Invalid seek position:', position);
      return;
    }

    if (!soundRef.current) {
      console.warn('No sound available for seeking');
      return;
    }

    try {
      const clampedPosition = Math.max(0, Math.min(position, duration || 0));
      const milliseconds = clampedPosition * 1000;
      
      if (!isFinite(milliseconds) || milliseconds < 0) {
        console.warn('Invalid milliseconds:', milliseconds);
        return;
      }

      await soundRef.current.setPositionAsync(milliseconds);
      setCurrentTime(clampedPosition);
    } catch (error) {
      console.error('Error during seek:', error);
    }
  };

  const closePlayer = async () => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
    stopInterval();
    setIsPlaying(false);
    setShowMiniPlayer(false);
    setCurrentTrack(null);
    setCurrentTime(0);
    setDuration(0);
    setPlaybackSpeedState(1);
  };

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        currentTrack,
        showMiniPlayer,
        isLoading,
        currentTime,
        duration,
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
    throw new Error('usePlayer must be used within PlayerProvider');
  }
  return context;
};