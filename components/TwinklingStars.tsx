"use client";

import React from "react";
import { useSyncExternalStore } from "react";

interface TwinklingStar {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  size: number;
  brightness: number;
}

function seededValue(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;

  return value - Math.floor(value);
}

const stars: TwinklingStar[] = Array.from({ length: 120 }).map((_, i) => ({
  id: i,
  x: seededValue(i + 1) * 100,
  y: seededValue(i + 2) * 100,
  duration: 1.5 + seededValue(i + 3) * 2,
  delay: seededValue(i + 4) * 4,
  size: 1 + seededValue(i + 5) * 2,
  brightness: 0.5 + seededValue(i + 6) * 0.5,
}));

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export default function TwinklingStars() {
  const isHydrated = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="twinkling-star absolute rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: "#ffffff",
            left: `${star.x}%`,
            top: `${star.y}%`,
            filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.8))",
            "--star-brightness": star.brightness,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
