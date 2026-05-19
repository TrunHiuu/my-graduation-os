"use client";

import { useEffect, useRef, useState } from "react";

const MUSIC_EVENT_NAME = "background-music:set-playing";
const MUSIC_STATUS_EVENT_NAME = "background-music:status";
const MUSIC_STATUS_REQUEST_EVENT_NAME = "background-music:request-status";

export function setBackgroundMusicPlaying(isPlaying: boolean) {
  window.dispatchEvent(
    new CustomEvent(MUSIC_EVENT_NAME, {
      detail: isPlaying,
    }),
  );
}

export function requestBackgroundMusicStatus() {
  window.dispatchEvent(new Event(MUSIC_STATUS_REQUEST_EVENT_NAME));
}

export function useBackgroundMusicControl() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    const handleStatusChange = (event: Event) => {
      const statusEvent = event as CustomEvent<boolean>;
      setIsMusicPlaying(statusEvent.detail);
    };

    window.addEventListener(MUSIC_STATUS_EVENT_NAME, handleStatusChange);
    requestBackgroundMusicStatus();

    return () => {
      window.removeEventListener(MUSIC_STATUS_EVENT_NAME, handleStatusChange);
    };
  }, []);

  const setPlaying = (nextIsMusicPlaying: boolean) => {
    setIsMusicPlaying(nextIsMusicPlaying);
    setBackgroundMusicPlaying(nextIsMusicPlaying);
  };

  const toggle = () => {
    setPlaying(!isMusicPlaying);
  };

  return {
    isMusicPlaying,
    setPlaying,
    toggle,
  };
}

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleMusicChange = (event: Event) => {
      const musicEvent = event as CustomEvent<boolean>;
      setIsPlaying(musicEvent.detail);
    };

    window.addEventListener(MUSIC_EVENT_NAME, handleMusicChange);

    return () => {
      window.removeEventListener(MUSIC_EVENT_NAME, handleMusicChange);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.volume = 0.7;

    if (!isPlaying) {
      audioRef.current.pause();
      return;
    }

    audioRef.current.muted = false;
    audioRef.current.play().catch(() => {
      // Ignore autoplay errors.
    });
  }, [isPlaying]);

  useEffect(() => {
    const dispatchStatus = () => {
      window.dispatchEvent(
        new CustomEvent(MUSIC_STATUS_EVENT_NAME, {
          detail: isPlaying,
        }),
      );
    };

    dispatchStatus();
    window.addEventListener(MUSIC_STATUS_REQUEST_EVENT_NAME, dispatchStatus);

    return () => {
      window.removeEventListener(MUSIC_STATUS_REQUEST_EVENT_NAME, dispatchStatus);
    };
  }, [isPlaying]);

  return (
    <audio
      ref={audioRef}
      src="/Background_music.mp4"
      loop
      style={{ display: "none" }}
    />
  );
}
