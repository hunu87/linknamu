import { NextResponse } from "next/server";
import { profile } from "@/data/profile";
import { getClickCounts, incrementClick } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const validIds = new Set(profile.links.map((link) => link.id));

export async function GET() {
  return NextResponse.json(await getClickCounts());
}

export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 등록된 링크 id만 집계해 임의의 값이 DB에 쌓이지 않도록 합니다.
  if (typeof id !== "string" || !validIds.has(id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const saved = await incrementClick(id);
    if (!saved) {
      return NextResponse.json({ error: "DB가 설정되지 않았습니다." }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return NextResponse.json({ error: "저장에 실패했습니다." }, { status: 500 });
  }
}
