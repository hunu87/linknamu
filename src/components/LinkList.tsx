"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Props = {
  links: LinkItem[];
};

export default function LinkList({ links }: Props) {
  // 데이터를 받기 전에는 0회로 보여 주고, 받은 뒤 실제 값으로 갱신합니다.
  const [counts, setCounts] = useState<Record<string, number>>({});
  // 조회 응답이 오기 전에 누른 클릭이 덮어써지지 않도록 따로 셉니다.
  const [pending, setPending] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/clicks", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Record<string, number> | null) => {
        if (cancelled || !data) return;
        setCounts(data);
        setPending({});
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const handleClick = (id: string) => {
    setPending((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <ul className="mt-12 flex flex-col gap-3.5">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            link={link}
            count={(counts[link.id] ?? 0) + (pending[link.id] ?? 0)}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
