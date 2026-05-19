"use client";

export default function GraduationCharacter() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <style>{`
        .pixel-art {
          image-rendering: pixelated;
          image-rendering: crisp-edges;
          transform: scale(8);
          transform-origin: center;
        }

        .character {
          position: relative;
          width: 16px;
          height: 24px;
        }

        .pixel {
          position: absolute;
          width: 1px;
          height: 1px;
        }

        /* COLORS */
        .skin { background: #f2c7a5; }
        .hair1 { background: #4a2b1f; }
        .hair2 { background: #5b3426; }
        .hat1 { background: #111c3d; }
        .hat2 { background: #1f2f66; }
        .robe1 { background: #102750; }
        .robe2 { background: #1d3d78; }
        .robe3 { background: #274f99; }
        .white { background: #ffffff; }
        .black { background: #000000; }
        .gold { background: #e0b84e; }
        .paper { background: #f5e4c8; }
        .red { background: #d23c3c; }
        .shadow { background: rgba(0,0,0,0.2); }
      `}</style>

      <div className="pixel-art">
        <div className="character">
          {/* HAT */}
          <div className="pixel hat1" style={{ left: "4px", top: "0px", width: "8px" }}></div>
          <div className="pixel hat2" style={{ left: "3px", top: "1px", width: "10px" }}></div>
          <div className="pixel hat1" style={{ left: "5px", top: "2px", width: "6px" }}></div>

          {/* TASSEL */}
          <div className="pixel gold" style={{ left: "12px", top: "2px" }}></div>
          <div className="pixel gold" style={{ left: "12px", top: "3px" }}></div>
          <div className="pixel gold" style={{ left: "12px", top: "4px" }}></div>

          {/* HAIR */}
          <div className="pixel hair1" style={{ left: "4px", top: "3px", width: "8px" }}></div>
          <div className="pixel hair2" style={{ left: "3px", top: "4px", width: "10px" }}></div>
          <div className="pixel hair1" style={{ left: "3px", top: "5px", width: "2px" }}></div>
          <div className="pixel hair1" style={{ left: "11px", top: "5px", width: "2px" }}></div>

          {/* FACE */}
          <div className="pixel skin" style={{ left: "5px", top: "5px", width: "6px", height: "5px" }}></div>

          {/* EYES */}
          <div className="pixel black" style={{ left: "6px", top: "7px" }}></div>
          <div className="pixel black" style={{ left: "9px", top: "7px" }}></div>

          {/* MOUTH */}
          <div className="pixel red" style={{ left: "7px", top: "9px", width: "2px" }}></div>

          {/* BODY */}
          <div className="pixel robe2" style={{ left: "4px", top: "10px", width: "8px", height: "8px" }}></div>

          {/* SHIRT */}
          <div className="pixel white" style={{ left: "7px", top: "10px", width: "2px", height: "3px" }}></div>

          {/* TIE */}
          <div className="pixel black" style={{ left: "8px", top: "11px" }}></div>

          {/* LEFT ARM */}
          <div className="pixel robe1" style={{ left: "2px", top: "11px", width: "2px", height: "5px" }}></div>

          {/* RIGHT ARM */}
          <div className="pixel robe1" style={{ left: "12px", top: "11px", width: "2px", height: "5px" }}></div>

          {/* DIPLOMA */}
          <div className="pixel paper" style={{ left: "0px", top: "13px", width: "3px", height: "2px" }}></div>
          <div className="pixel red" style={{ left: "1px", top: "13px" }}></div>

          {/* LEGS */}
          <div className="pixel robe3" style={{ left: "5px", top: "18px", width: "2px", height: "4px" }}></div>
          <div className="pixel robe3" style={{ left: "9px", top: "18px", width: "2px", height: "4px" }}></div>

          {/* SHOES */}
          <div className="pixel black" style={{ left: "5px", top: "22px", width: "2px" }}></div>
          <div className="pixel black" style={{ left: "9px", top: "22px", width: "2px" }}></div>

          {/* SHADOW */}
          <div className="pixel shadow" style={{ left: "4px", top: "23px", width: "8px" }}></div>
        </div>
      </div>
    </div>
  );
}
