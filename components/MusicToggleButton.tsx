"use client";

import { useBackgroundMusicControl } from "@/components/BackgroundMusic";

export default function MusicToggleButton() {
  const { isMusicPlaying, toggle: toggleMusic } = useBackgroundMusicControl();

  return (
    <button
      onClick={toggleMusic}
      aria-label={isMusicPlaying ? "Mute background music" : "Unmute background music"}
      title={isMusicPlaying ? "Mute music" : "Unmute music"}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 50,
        minWidth: "48px",
        backgroundColor: "#1e5aa8",
        border: "2px solid",
        borderColor: "#4a8ace #0a2a6a #0a2a6a #4a8ace",
        padding: "8px 12px",
        fontFamily: "Arial Black, monospace",
        fontSize: "18px",
        fontWeight: "900",
        color: "#ffffff",
        cursor: "pointer",
        textAlign: "center",
        textShadow: "1px 1px 0 #000000",
        outline: "none",
        boxShadow: "inset 1px 1px 0 #6aadee, inset -1px -1px 0 #000000",
        borderRadius: "2px",
        lineHeight: "1",
        textDecoration: isMusicPlaying ? "none" : "line-through",
        opacity: isMusicPlaying ? 1 : 0.68,
      }}
    >
      {"\u{1F3B5}"}
    </button>
  );
}
