"use client";

// Pixel-art SVG icons for the adventure theme
// Each icon is a small inline SVG with crisp pixel styling

export function SwordIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ imageRendering: "pixelated" }}>
      <rect x="12" y="1" width="2" height="2" fill={color} />
      <rect x="10" y="3" width="2" height="2" fill={color} />
      <rect x="8" y="5" width="2" height="2" fill={color} />
      <rect x="6" y="7" width="2" height="2" fill={color} />
      <rect x="4" y="9" width="2" height="2" fill={color} />
      <rect x="2" y="11" width="2" height="2" fill={color} />
      <rect x="0" y="13" width="2" height="2" fill={color} />
      <rect x="3" y="9" width="2" height="2" fill={color} opacity="0.5" />
      <rect x="5" y="11" width="2" height="2" fill={color} opacity="0.5" />
    </svg>
  );
}

export function MeatIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ imageRendering: "pixelated" }}>
      <rect x="2" y="4" width="2" height="2" fill={color} />
      <rect x="4" y="2" width="2" height="2" fill={color} />
      <rect x="6" y="2" width="4" height="2" fill={color} />
      <rect x="10" y="4" width="2" height="2" fill={color} />
      <rect x="12" y="6" width="2" height="4" fill={color} />
      <rect x="10" y="10" width="2" height="2" fill={color} />
      <rect x="4" y="10" width="6" height="2" fill={color} />
      <rect x="2" y="6" width="2" height="4" fill={color} />
      <rect x="4" y="4" width="8" height="6" fill={color} opacity="0.6" />
      <rect x="0" y="12" width="2" height="4" fill={color} opacity="0.8" />
    </svg>
  );
}

export function ScrollIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ imageRendering: "pixelated" }}>
      <rect x="4" y="0" width="8" height="2" fill={color} />
      <rect x="2" y="2" width="2" height="2" fill={color} />
      <rect x="12" y="2" width="2" height="2" fill={color} />
      <rect x="4" y="2" width="8" height="12" fill={color} opacity="0.3" />
      <rect x="2" y="4" width="2" height="8" fill={color} opacity="0.5" />
      <rect x="12" y="4" width="2" height="8" fill={color} opacity="0.5" />
      <rect x="4" y="14" width="8" height="2" fill={color} />
      <rect x="2" y="12" width="2" height="2" fill={color} />
      <rect x="12" y="12" width="2" height="2" fill={color} />
      <rect x="6" y="5" width="4" height="1" fill={color} opacity="0.7" />
      <rect x="6" y="7" width="4" height="1" fill={color} opacity="0.7" />
      <rect x="6" y="9" width="3" height="1" fill={color} opacity="0.7" />
    </svg>
  );
}

export function LeafIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ imageRendering: "pixelated" }}>
      <rect x="10" y="0" width="2" height="2" fill={color} />
      <rect x="8" y="2" width="4" height="2" fill={color} />
      <rect x="6" y="4" width="6" height="2" fill={color} opacity="0.8" />
      <rect x="4" y="6" width="6" height="2" fill={color} opacity="0.6" />
      <rect x="2" y="8" width="6" height="2" fill={color} opacity="0.4" />
      <rect x="6" y="10" width="2" height="2" fill={color} opacity="0.5" />
      <rect x="4" y="12" width="2" height="2" fill={color} opacity="0.4" />
      <rect x="2" y="14" width="2" height="2" fill={color} opacity="0.3" />
    </svg>
  );
}

export function MapIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ imageRendering: "pixelated" }}>
      <rect x="0" y="2" width="16" height="2" fill={color} />
      <rect x="0" y="2" width="2" height="12" fill={color} opacity="0.5" />
      <rect x="14" y="2" width="2" height="12" fill={color} opacity="0.5" />
      <rect x="0" y="12" width="16" height="2" fill={color} />
      <rect x="5" y="4" width="2" height="2" fill={color} opacity="0.7" />
      <rect x="9" y="6" width="2" height="2" fill={color} opacity="0.7" />
      <rect x="3" y="8" width="2" height="2" fill={color} opacity="0.7" />
      <rect x="7" y="10" width="4" height="1" fill={color} opacity="0.5" />
      <rect x="11" y="8" width="2" height="2" fill={color} opacity="0.4" />
    </svg>
  );
}

export function ShieldIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ imageRendering: "pixelated" }}>
      <rect x="4" y="0" width="8" height="2" fill={color} />
      <rect x="2" y="2" width="2" height="2" fill={color} />
      <rect x="12" y="2" width="2" height="2" fill={color} />
      <rect x="2" y="4" width="12" height="2" fill={color} opacity="0.5" />
      <rect x="2" y="6" width="12" height="2" fill={color} opacity="0.4" />
      <rect x="4" y="8" width="8" height="2" fill={color} opacity="0.3" />
      <rect x="6" y="10" width="4" height="2" fill={color} opacity="0.3" />
      <rect x="7" y="12" width="2" height="2" fill={color} opacity="0.2" />
      <rect x="7" y="4" width="2" height="6" fill={color} opacity="0.6" />
      <rect x="5" y="6" width="6" height="2" fill={color} opacity="0.6" />
    </svg>
  );
}

export function LockIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="2" fill={color} />
      <rect x="3" y="2" width="2" height="4" fill={color} />
      <rect x="11" y="2" width="2" height="4" fill={color} />
      <rect x="2" y="6" width="12" height="2" fill={color} />
      <rect x="2" y="8" width="12" height="6" fill={color} opacity="0.6" />
      <rect x="2" y="14" width="12" height="2" fill={color} />
      <rect x="7" y="9" width="2" height="3" fill={color} />
    </svg>
  );
}

export function UnlockIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="2" fill={color} />
      <rect x="3" y="2" width="2" height="2" fill={color} />
      <rect x="11" y="2" width="2" height="4" fill={color} />
      <rect x="2" y="6" width="12" height="2" fill={color} />
      <rect x="2" y="8" width="12" height="6" fill={color} opacity="0.6" />
      <rect x="2" y="14" width="12" height="2" fill={color} />
      <rect x="7" y="9" width="2" height="3" fill={color} />
    </svg>
  );
}

export function FairyIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ imageRendering: "pixelated" }}>
      <rect x="7" y="0" width="2" height="2" fill={color} />
      <rect x="5" y="2" width="6" height="2" fill={color} opacity="0.8" />
      <rect x="6" y="4" width="4" height="4" fill={color} />
      <rect x="3" y="3" width="2" height="4" fill={color} opacity="0.4" />
      <rect x="11" y="3" width="2" height="4" fill={color} opacity="0.4" />
      <rect x="7" y="8" width="2" height="2" fill={color} opacity="0.6" />
      <rect x="6" y="10" width="4" height="2" fill={color} opacity="0.3" />
      <rect x="1" y="5" width="2" height="2" fill={color} opacity="0.2" />
      <rect x="13" y="5" width="2" height="2" fill={color} opacity="0.2" />
    </svg>
  );
}

export function HeartIcon({ size = 20, color = "#ef4444" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ imageRendering: "pixelated" }}>
      <rect x="2" y="2" width="4" height="2" fill={color} />
      <rect x="10" y="2" width="4" height="2" fill={color} />
      <rect x="1" y="4" width="6" height="2" fill={color} />
      <rect x="9" y="4" width="6" height="2" fill={color} />
      <rect x="1" y="6" width="14" height="2" fill={color} />
      <rect x="2" y="8" width="12" height="2" fill={color} />
      <rect x="3" y="10" width="10" height="2" fill={color} />
      <rect x="5" y="12" width="6" height="2" fill={color} />
      <rect x="7" y="14" width="2" height="2" fill={color} />
    </svg>
  );
}

export function PotionIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ imageRendering: "pixelated" }}>
      <rect x="6" y="0" width="4" height="2" fill={color} />
      <rect x="5" y="2" width="6" height="2" fill={color} opacity="0.6" />
      <rect x="6" y="4" width="4" height="2" fill={color} opacity="0.4" />
      <rect x="4" y="6" width="8" height="2" fill={color} />
      <rect x="3" y="8" width="10" height="4" fill={color} opacity="0.7" />
      <rect x="4" y="12" width="8" height="2" fill={color} />
      <rect x="5" y="14" width="6" height="2" fill={color} opacity="0.5" />
    </svg>
  );
}

export function StarIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ imageRendering: "pixelated" }}>
      <rect x="7" y="0" width="2" height="2" fill={color} />
      <rect x="6" y="2" width="4" height="2" fill={color} />
      <rect x="0" y="4" width="16" height="2" fill={color} opacity="0.8" />
      <rect x="2" y="6" width="12" height="2" fill={color} />
      <rect x="3" y="8" width="4" height="2" fill={color} />
      <rect x="9" y="8" width="4" height="2" fill={color} />
      <rect x="2" y="10" width="4" height="2" fill={color} opacity="0.8" />
      <rect x="10" y="10" width="4" height="2" fill={color} opacity="0.8" />
      <rect x="1" y="12" width="2" height="2" fill={color} opacity="0.6" />
      <rect x="13" y="12" width="2" height="2" fill={color} opacity="0.6" />
    </svg>
  );
}
