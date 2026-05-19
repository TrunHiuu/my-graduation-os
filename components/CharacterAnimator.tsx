"use client";

import React, { useState, useEffect } from "react";

interface CharacterAnimatorProps {
  animation?: "idle" | "walk" | "float";
  scale?: number;
}

function CharacterAnimator({ animation = "idle", scale = 8 }: CharacterAnimatorProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const speeds = { idle: 300, walk: 150, float: 500 };
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 6);
    }, speeds[animation] || 300);
    return () => clearInterval(interval);
  }, [animation]);

  // Frame positions: varies arm positions for animation
  const getArmPositions = () => {
    const positions = [
      { left: 11, right: 11 },  // frame 0: both down
      { left: 9, right: 11 },   // frame 1: left arm up
      { left: 11, right: 9 },   // frame 2: right arm up
      { left: 9, right: 9 },    // frame 3: both arms up
      { left: 11, right: 9 },   // frame 4: right arm up
      { left: 9, right: 11 }    // frame 5: left arm up
    ];
    return positions[frame % positions.length];
  };

  const arms = getArmPositions();

  const animStyle = {
    animation: animation === "idle" ? "bob 1.8s ease-in-out infinite" 
             : animation === "walk" ? "walk 0.8s ease-in-out infinite"
             : "float 2s ease-in-out infinite",
  };

  return (
    <>
      <style>{`
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes walk {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(4px) translateY(-2px); }
          50% { transform: translateX(0) translateY(0); }
          75% { transform: translateX(-4px) translateY(-2px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotateZ(0deg); }
          50% { transform: translateY(-10px) rotateZ(3deg); }
        }
        .char { image-rendering: pixelated; transform: scale(${scale}); position: relative; width: 20px; height: 28px; }
        .px { position: absolute; width: 1px; height: 1px; }
        .skin { background: #d4a574; }
        .hair1 { background: #5d3a1a; }
        .hair2 { background: #7a4d2a; }
        .hat1 { background: #0a1929; }
        .hat2 { background: #1a3a52; }
        .robe1 { background: #1e3a5f; }
        .robe2 { background: #2d5a8c; }
        .robe3 { background: #1a2f4a; }
        .white { background: #fff; }
        .black { background: #000; }
        .gold { background: #ffd700; }
        .paper { background: #f4e8d0; }
        .red { background: #cc5533; }
        .shadow { background: rgba(0,0,0,0.3); }
      `}</style>
      <div className="char" style={animStyle}>
        {/* GRADUATION CAP */}
        <div className="px hat1" style={{ left: 7, top: 1, width: 6 }} />
        <div className="px hat1" style={{ left: 6, top: 2, width: 8 }} />
        <div className="px hat1" style={{ left: 5, top: 3, width: 10 }} />
        
        {/* HAT DETAIL */}
        <div className="px hat2" style={{ left: 6, top: 2, width: 2 }} />
        <div className="px hat2" style={{ left: 12, top: 2, width: 2 }} />
        
        {/* GOLD TASSEL */}
        <div className="px gold" style={{ left: 14, top: 2 }} />
        <div className="px gold" style={{ left: 15, top: 3 }} />
        <div className="px gold" style={{ left: 14, top: 4 }} />
        
        {/* HAIR - WAVY/CURLY BROWN */}
        <div className="px hair1" style={{ left: 4, top: 4, width: 2 }} />
        <div className="px hair2" style={{ left: 5, top: 4, width: 2 }} />
        <div className="px hair1" style={{ left: 7, top: 4, width: 6 }} />
        <div className="px hair2" style={{ left: 13, top: 4, width: 2 }} />
        <div className="px hair1" style={{ left: 14, top: 4, width: 2 }} />
        
        <div className="px hair2" style={{ left: 3, top: 5, width: 3 }} />
        <div className="px hair1" style={{ left: 6, top: 5, width: 8 }} />
        <div className="px hair2" style={{ left: 14, top: 5, width: 2 }} />
        
        <div className="px hair2" style={{ left: 3, top: 6, width: 2 }} />
        <div className="px hair1" style={{ left: 5, top: 6, width: 10 }} />
        <div className="px hair2" style={{ left: 15, top: 6, width: 1 }} />
        
        {/* FACE */}
        <div className="px skin" style={{ left: 6, top: 7, width: 8, height: 6 }} />
        
        {/* EYES */}
        <div className="px black" style={{ left: 7, top: 8 }} />
        <div className="px black" style={{ left: 12, top: 8 }} />
        <div className="px white" style={{ left: 8, top: 8 }} />
        <div className="px white" style={{ left: 13, top: 8 }} />
        
        {/* MOUTH - SMILE */}
        <div className="px red" style={{ left: 9, top: 11, width: 2 }} />
        
        {/* NECK */}
        <div className="px skin" style={{ left: 9, top: 13, width: 2 }} />
        
        {/* GRADUATION ROBE - NAVY BLUE */}
        <div className="px robe2" style={{ left: 4, top: 14, width: 12, height: 9 }} />
        
        {/* ROBE DETAILS - DARKER EDGES */}
        <div className="px robe1" style={{ left: 5, top: 14, width: 2 }} />
        <div className="px robe1" style={{ left: 13, top: 14, width: 2 }} />
        
        {/* GOLD TRIM ON ROBE */}
        <div className="px gold" style={{ left: 7, top: 15, width: 6 }} />
        <div className="px gold" style={{ left: 7, top: 16 }} />
        <div className="px gold" style={{ left: 13, top: 16 }} />
        
        {/* WHITE SHIRT UNDERNEATH */}
        <div className="px white" style={{ left: 9, top: 17, width: 2 }} />
        
        {/* ARMS - DYNAMIC POSITION */}
        {/* Left arm */}
        <div className="px robe1" style={{ left: 2, top: arms.left, width: 2, height: 6 }} />
        <div className="px skin" style={{ left: 2, top: arms.left + 6, width: 2 }} />
        
        {/* Right arm */}
        <div className="px robe1" style={{ left: 16, top: arms.right, width: 2, height: 6 }} />
        <div className="px skin" style={{ left: 16, top: arms.right + 6, width: 2 }} />
        
        {/* DIPLOMA/SCROLL - HELD IN LEFT HAND */}
        <div className="px paper" style={{ left: 0, top: 12, width: 2, height: 4 }} />
        <div className="px paper" style={{ left: 1, top: 11, width: 2, height: 6 }} />
        <div className="px red" style={{ left: 1, top: 13, width: 2 }} />
        
        {/* LEGS */}
        <div className="px robe3" style={{ left: 7, top: 23, width: 2, height: 4 }} />
        <div className="px robe3" style={{ left: 11, top: 23, width: 2, height: 4 }} />
        
        {/* SHOES */}
        <div className="px black" style={{ left: 6, top: 27, width: 3 }} />
        <div className="px black" style={{ left: 11, top: 27, width: 3 }} />
        
        {/* SHADOW */}
        <div className="px shadow" style={{ left: 4, top: 28, width: 12 }} />
      </div>
    </>
  );
}

export default CharacterAnimator;
