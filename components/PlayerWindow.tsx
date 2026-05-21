"use client";

import React from "react";
import PlayerStatsWindow from "@/components/PlayerStats";
import { StudentStats, User } from "@/types/invite";
import { Star } from 'phosphor-react';
type SimpleScore = { score: number; completed: boolean; completed_at?: string | null };
type Props = { stats: StudentStats; user: User; scores: Record<number, SimpleScore | undefined> };

export default function PlayerWindow({ stats, user, scores }: Props) {
  const completedCount = [1, 2, 3, 4].filter((missionId) => Boolean(scores[missionId]?.completed)).length;
  const fillPercent = (completedCount / 4) * 100;
  const fillHeight = `${fillPercent}%`;
  const starLevels = [4, 3, 2, 1];

  return (
    <PlayerStatsWindow
      stats={stats}
      title="Player.exe"
      titleBarColor="#FF69B4"
      outerBg="#ffffff"
      contentBg="#ffffff"
    >
      <div className="p-3 mt-2" style={{ fontFamily: 'var(--font-roboto)' }}>
        <div className="flex flex-col gap-1">
          <div>
            <div className="text-sm" style={{ color: '#6b7280', fontWeight: 800 }}>Player: <span style={{ color: '#d4a017' }}>{user.nickname || user.name}</span></div>
            <div className="text-sm" style={{ color: '#6b7280', fontWeight: 800 }}>Status: <span style={{ color: user.attendance_status?.code === 'confirmed' ? '#16a34a' : user.attendance_status?.code === 'declined' ? '#dc2626' : '#9ca3af', fontWeight: 700 }}>{user.attendance_status?.label ?? 'waiting'}</span></div>
          </div>

          <div className="mt-3 flex items-start gap-4">
            {/* Left: avatar */}
            <div className="w-28 h-28 rounded-md overflow-hidden border-2 border-gray-300 flex-shrink-0">
              {user.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatar_url} alt="avatar" width={112} height={112} className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center" style={{ color: '#4b5563', fontWeight: 800, fontSize: 36 }}>{(user.nickname||user.name||'')[0]}</div>
              )}
            </div>

            {/* Right: vertical progress + stars */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flex: 1 }}>
              <div style={{ position: 'relative', width: 34, height: 220, overflow: 'visible', flexShrink: 0 }}>
                <div style={{ position: 'absolute', inset: 0, background: '#e6e6e6', borderRadius: 10, padding: 3, boxSizing: 'border-box' }}>
                  <div style={{ position: 'relative', width: '100%', height: '100%', background: '#ddd', borderRadius: 6, overflow: 'hidden' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: fillHeight,
                      background: 'linear-gradient(to top, #ff57c8 0%, #8bf6ff 48%, #7cff9b 100%)',
                      transition: 'height 280ms ease-out',
                    }}
                  />
                  {fillPercent > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: '50%',
                        bottom: `calc(${fillHeight} - 14px)`,
                        transform: 'translateX(-50%)',
                        width: 38,
                        height: 38,
                        zIndex: 4,
                        pointerEvents: 'none',
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/degree-removebg-preview.png"
                        alt="meter cap"
                        className="object-contain w-full h-full"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </div>
                  )}
                  {[25, 50, 75].map((offset) => (
                    <div
                      key={offset}
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: `${offset}%`,
                        height: 1,
                        background: 'rgba(0,0,0,0.08)',
                      }}
                    />
                  ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 226, marginTop: -6 }}>
                {starLevels.map((missionId) => {
                  const s = scores[missionId];
                  const starColor = s?.score === 1 ? '#ffd54a' : '#9ca3af';
                  return (
                    <div key={missionId} className="flex items-center" style={{ height: 56 }}>
                      <Star size={20} weight="fill" color={starColor} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PlayerStatsWindow>
  );
}
 
