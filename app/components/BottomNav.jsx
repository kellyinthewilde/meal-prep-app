"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/today", label: "Quests", icon: "⚔️" },
  { href: "/meals", label: "Provisions", icon: "🍖" },
  { href: "/guide", label: "Codex", icon: "📜" },
  { href: "/plants", label: "Grove", icon: "🌿" },
  { href: "/calendar", label: "Map", icon: "🗺️" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#12121f",
        borderTop: "2px solid #2a2a4a",
        display: "flex",
        justifyContent: "space-around",
        padding: "8px 0 env(safe-area-inset-bottom, 10px)",
        zIndex: 50,
      }}
    >
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              padding: "4px 8px",
              textDecoration: "none",
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 7,
              fontWeight: 400,
              color: active ? "#ffd700" : "#5b5b7b",
              letterSpacing: "0.02em",
              transition: "color 0.15s",
              filter: active ? "drop-shadow(0 0 6px rgba(255, 215, 0, 0.4))" : "none",
            }}
          >
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
