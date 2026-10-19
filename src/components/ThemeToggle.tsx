"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setIsDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="fixed right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/45 text-base shadow-[0_4px_14px_-6px_rgba(160,90,40,0.3)] backdrop-blur-xl transition duration-300 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/10"
    >
      {/* 마운트 전에는 테마를 알 수 없으므로 아이콘을 비워 깜빡임을 막습니다. */}
      {isDark === null ? null : isDark ? "☀️" : "🌙"}
    </button>
  );
}
