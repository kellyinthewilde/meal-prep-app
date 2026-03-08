"use client";
import PostpartumHQ from "../hq/PostpartumHQ";
import BottomNav from "../components/BottomNav";

export default function CalendarPage() {
  return (
    <>
      <PostpartumHQ defaultTab="calendar" />
      <BottomNav />
    </>
  );
}
