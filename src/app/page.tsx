import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";
import { getClickCounts } from "@/lib/mongodb";

// 클릭 수를 매 요청마다 최신으로 보여주기 위해 동적 렌더링합니다.
export const dynamic = "force-dynamic";

// wireframe.png 레이아웃: 상단 원형 프로필 사진 → 이름 → 한 줄 소개 → 세로 링크 카드 목록
export default async function Home() {
  const counts = await getClickCounts();
  const hasDb = Boolean(process.env.MONGODB_URI);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-16 sm:py-20">
      <ThemeToggle />

      <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />

      <ul className="mt-10 flex flex-col gap-4">
        {profile.links.map((link) => (
          <li key={link.id}>
            <LinkCard link={link} initialCount={hasDb ? (counts[link.id] ?? 0) : undefined} />
          </li>
        ))}
      </ul>
    </main>
  );
}
