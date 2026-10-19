"use client";

import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  count: number;
  onClick: () => void;
};

export default function LinkCard({ link, count, onClick }: Props) {
  const handleClick = () => {
    // 새 탭으로 이동해도 요청이 끊기지 않도록 sendBeacon을 우선 사용합니다.
    const body = JSON.stringify({ id: link.id });
    const sent =
      typeof navigator.sendBeacon === "function" &&
      navigator.sendBeacon("/api/clicks", new Blob([body], { type: "application/json" }));
    if (!sent) {
      fetch("/api/clicks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
    onClick();
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="relative flex w-full items-center justify-center rounded-[1.25rem] border border-white/70 bg-white/45 px-14 py-[1.125rem] text-[0.9375rem] font-semibold shadow-[0_8px_24px_-12px_rgba(160,90,40,0.25)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/60 hover:shadow-[0_12px_28px_-12px_rgba(160,90,40,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 active:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)] dark:hover:bg-white/10"
    >
      <span className="truncate">{link.title}</span>
      <span className="absolute right-5 text-xs font-medium tabular-nums text-stone-500/80 dark:text-stone-400/80">
        {count.toLocaleString()}회
      </span>
    </a>
  );
}
