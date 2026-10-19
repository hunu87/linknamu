export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  image: string;
  links: LinkItem[];
};

// 프로필과 링크 목록은 이 파일에서 수정합니다.
export const profile: Profile = {
  name: "이현우",
  bio: "풀스택 개발자 | 요즘에는 AI 개발에 관심이 많아요",
  // 화면 표시 크기(최대 144px)의 2배로 받아 고해상도 화면에서도 선명하게 보이도록 합니다.
  image: "https://placehold.co/288x288/orange/white",
  links: [
    { id: "github", title: "🐙 깃허브", url: "https://github.com/hunu87" },
    { id: "notion", title: "📝 노션", url: "https://app.notion.com/p/4db2a45d239d4e92be1c0f07491275ae" },
    { id: "email", title: "📫 이메일", url: "mailto:hunu87@naver.com" },
  ],
};
