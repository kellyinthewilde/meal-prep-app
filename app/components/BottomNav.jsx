"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/hq", label: "HQ", icon: "📋" },
  { href: "/meals", label: "Meals", icon: "🍽️" },
  { href: "/guide", label: "Guide", icon: "📖" },
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
        background: "#FFFFFF",
        borderTop: "1px solid #E5E7EB",
        display: "flex",
        justifyContent: "space-around",
        padding: "6px 0 env(safe-area-inset-bottom, 8px)",
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
              gap: 2,
              padding: "4px 16px",
              textDecoration: "none",
              fontSize: 10,
              fontWeight: 600,
              color: active ? "#E11D48" : "#9CA3AF",
              letterSpacing: "0.03em",
              transition: "color 0.15s",
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
