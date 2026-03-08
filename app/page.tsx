"use client";
import { useState, useEffect } from "react";
import BottomNav from "./components/BottomNav";

export default function Home() {
  const [day1Timestamp, setDay1Timestamp] = useState<number | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

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

  function startDay1() {
    const now = Date.now();
    localStorage.setItem("postpartum_day1", now.toString());
    window.location.href = "/today";
  }

  if (!hasLoaded || day1Timestamp) {
    return <div style={{ minHeight: "100vh", background: "#FAFAF5" }} />;
  }

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #FAFAF5 0%, #FFF1F2 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
          textAlign: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 16 }}>🌸</div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#1C1917",
            marginBottom: 4,
          }}
        >
          Postpartum HQ
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "#78716C",
            marginBottom: 40,
            maxWidth: 300,
            lineHeight: 1.6,
          }}
        >
          Your 30-day guide to meals, daily tasks, and everything you need for the
          fourth trimester. Tap below when she&apos;s arrives.
        </p>
        <button
          onClick={startDay1}
          style={{
            background: "#E11D48",
            color: "#FFFFFF",
            border: "none",
            padding: "18px 40px",
            borderRadius: 20,
            fontSize: 17,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 24px rgba(225, 29, 72, 0.3)",
            transition: "transform 0.15s, box-shadow 0.15s",
            marginBottom: 16,
          }}
          onMouseDown={(e) => {
            (e.target as HTMLElement).style.transform = "scale(0.97)";
          }}
          onMouseUp={(e) => {
            (e.target as HTMLElement).style.transform = "scale(1)";
          }}
        >
          She&apos;s here — Start Day 1 🎉
        </button>
        <a
          href="/today"
          style={{
            fontSize: 13,
            color: "#A8A29E",
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          Preview the app
        </a>
      </div>
      <BottomNav />
    </>
  );
}
