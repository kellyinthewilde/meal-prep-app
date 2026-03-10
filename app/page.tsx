"use client";
import { useState, useEffect } from "react";
import { HeartIcon } from "./components/PixelIcons";

const pixelFont = "'Press Start 2P', monospace";
const bodyFont = "'Consolas', 'Monaco', 'Courier New', monospace";

export default function Home() {
  const [day1Timestamp, setDay1Timestamp] = useState<number | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [heartsVisible, setHeartsVisible] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("postpartum_day1");
    if (saved) {
      setDay1Timestamp(parseInt(saved, 10));
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded && day1Timestamp) {
      window.location.href = "/today";
    }
  }, [hasLoaded, day1Timestamp]);

  useEffect(() => {
    if (hasLoaded && !day1Timestamp) {
      const t1 = setTimeout(() => setHeartsVisible(1), 400);
      const t2 = setTimeout(() => setHeartsVisible(2), 700);
      const t3 = setTimeout(() => setHeartsVisible(3), 1000);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [hasLoaded, day1Timestamp]);

  function startDay1() {
    const now = Date.now();
    localStorage.setItem("postpartum_day1", now.toString());
    window.location.href = "/today";
  }

  if (!hasLoaded || day1Timestamp) {
    return <div style={{ minHeight: "100vh", background: "#1a1a2e" }} />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0f0c29 0%, #1a1a2e 40%, #24243e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Stars */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-gold {
          0%, 100% { box-shadow: 0 4px 24px rgba(255, 215, 0, 0.3); }
          50% { box-shadow: 0 4px 40px rgba(255, 215, 0, 0.6); }
        }
        @keyframes heart-pop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.3); }
          100% { transform: scale(1); opacity: 1; }
        }
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #ffd700;
          border-radius: 50%;
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            width: Math.random() > 0.7 ? 3 : 2,
            height: Math.random() > 0.7 ? 3 : 2,
          }}
        />
      ))}

      {/* Hearts */}
      <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              animation: heartsVisible > i ? "heart-pop 0.4s ease-out forwards" : "none",
              opacity: heartsVisible > i ? 1 : 0,
              filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))",
            }}
          >
            <HeartIcon size={32} color="#ef4444" />
          </span>
        ))}
      </div>

      {/* Title */}
      <h1
        style={{
          fontFamily: pixelFont,
          fontSize: 16,
          fontWeight: 400,
          color: "#ffd700",
          marginBottom: 8,
          letterSpacing: "0.05em",
          lineHeight: 1.8,
          textShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
        }}
      >
        THE FOURTH
        <br />
        TRIMESTER
      </h1>

      <p
        style={{
          fontFamily: bodyFont,
          fontSize: 14,
          color: "#8b8da3",
          marginBottom: 8,
          letterSpacing: "0.1em",
        }}
      >
        A 40-Day Quest
      </p>

      <div
        style={{
          width: 60,
          height: 2,
          background: "linear-gradient(90deg, transparent, #ffd700, transparent)",
          marginBottom: 32,
        }}
      />

      <p
        style={{
          fontFamily: bodyFont,
          fontSize: 13,
          color: "#9ca3af",
          marginBottom: 48,
          maxWidth: 300,
          lineHeight: 1.8,
        }}
      >
        Meals, daily quests, and everything you need
        for the adventure of a lifetime.
      </p>

      {/* CTA */}
      <button
        onClick={startDay1}
        style={{
          fontFamily: pixelFont,
          background: "linear-gradient(180deg, #ffd700 0%, #f59e0b 100%)",
          color: "#1a1a2e",
          border: "3px solid #fbbf24",
          padding: "18px 32px",
          fontSize: 11,
          cursor: "pointer",
          animation: "pulse-gold 2s ease-in-out infinite",
          transition: "transform 0.15s",
          letterSpacing: "0.02em",
          imageRendering: "pixelated",
        }}
        onMouseDown={(e) => {
          (e.target as HTMLElement).style.transform = "scale(0.95)";
        }}
        onMouseUp={(e) => {
          (e.target as HTMLElement).style.transform = "scale(1)";
        }}
      >
        BEGIN ADVENTURE
      </button>

      <a
        href="/today"
        style={{
          fontFamily: bodyFont,
          fontSize: 12,
          color: "#6b7280",
          textDecoration: "none",
          marginTop: 24,
          letterSpacing: "0.05em",
          borderBottom: "1px solid #374151",
          paddingBottom: 2,
        }}
      >
        preview the map →
      </a>
    </div>
  );
}
