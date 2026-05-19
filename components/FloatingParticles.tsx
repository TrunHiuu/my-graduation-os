"use client";

import React from "react";
import { useSyncExternalStore } from "react";

interface Particle {
  id: number;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
  isTopZone: boolean;
}

function seededValue(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;

  return value - Math.floor(value);
}

const particles: Particle[] = Array.from({ length: 200 }).map((_, i) => {
  const initialY = seededValue(i + 2) * 100;
  const isTopZone = initialY < 33.33;

  return {
    id: i,
    initialX: seededValue(i + 1) * 100,
    initialY,
    duration: 4 + seededValue(i + 3) * 6,
    delay: seededValue(i + 4) * 3,
    isTopZone,
  };
});

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export default function FloatingParticles() {
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
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="floating-particle absolute rounded-full"
          style={{
            width: particle.isTopZone ? "4px" : "3px",
            height: particle.isTopZone ? "4px" : "3px",
            backgroundColor: particle.isTopZone ? "#00ffff" : "#ff99cc",
            boxShadow: particle.isTopZone ? "0 0 8px #00ffff, 0 0 16px #0099ff" : "0 0 6px #ff99cc",
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
            "--particle-rise": `-${Math.min(40, particle.initialY + 12)}vh`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
