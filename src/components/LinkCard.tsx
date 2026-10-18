"use client";

import { useState } from "react";
import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  initialCount?: number;
};

export default function LinkCard({ link, initialCount }: Props) {
  const [count, setCount] = useState(initialCount);

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
    if (count !== undefined) setCount(count + 1);
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="flex w-full items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-white px-5 py-4 font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
    >
      <span className="truncate">{link.title}</span>
      {count !== undefined && (
        <span className="shrink-0 text-xs text-neutral-500 dark:text-neutral-400">
          {count.toLocaleString()}회
        </span>
      )}
    </a>
  );
}
