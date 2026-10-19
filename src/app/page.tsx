import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

// wireframe.png 레이아웃: 상단 원형 프로필 사진 → 이름 → 한 줄 소개 → 세로 링크 카드 목록
// 클릭 수는 페이지가 열린 뒤 LinkList가 한 번에 가져오므로 페이지 자체는 정적으로 렌더링합니다.
export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[26rem] flex-col px-6 pb-16 pt-20 sm:pt-24">
      <ThemeToggle />

      <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />

      <LinkList links={profile.links} />
    </main>
  );
}
