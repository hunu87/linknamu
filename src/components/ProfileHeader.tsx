import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image: string;
};

export default function ProfileHeader({ name, bio, image }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 흰 테두리 + 따뜻한 그림자 + 위쪽 하이라이트로 살짝 떠 있는 입체감을 줍니다. */}
      <div className="rounded-full bg-white/70 p-1.5 shadow-[0_18px_40px_-12px_rgba(194,104,52,0.45),0_4px_12px_-4px_rgba(120,60,20,0.15)] ring-1 ring-white/80 backdrop-blur dark:bg-white/10 dark:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] dark:ring-white/10">
        <Image
          src={image}
          alt={`${name} 프로필 사진`}
          width={144}
          height={144}
          priority
          unoptimized
          className="h-28 w-28 rounded-full object-cover shadow-[inset_0_2px_6px_rgba(0,0,0,0.12)] sm:h-32 sm:w-32"
        />
      </div>
      <h1 className="mt-6 text-[1.375rem] font-bold tracking-tight sm:text-2xl">{name}</h1>
      <p className="mt-2 max-w-xs text-[0.9375rem] leading-relaxed text-stone-600 text-balance dark:text-stone-400">
        {bio}
      </p>
    </header>
  );
}
