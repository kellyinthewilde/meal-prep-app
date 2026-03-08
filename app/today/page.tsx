"use client";
import PostpartumHQ from "../hq/PostpartumHQ";
import BottomNav from "../components/BottomNav";

export default function TodayPage() {
  return (
    <>
      <PostpartumHQ defaultTab="today" />
      <BottomNav />
    </>
  );
}
