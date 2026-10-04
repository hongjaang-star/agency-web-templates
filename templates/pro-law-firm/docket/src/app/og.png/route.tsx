import { ImageResponse } from "next/og";
import { brandColors as c, site } from "@/data/site";

// 링크 공유 이미지 (1200×630) → /og.png. 한글 폰트 파일 없이 만들기 위해 영문 표기로 구성.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: c.bg, padding: "64px 80px", color: c.ink }}>
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: c.accent }}>{site.regionEn}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 140, letterSpacing: -4 }}>{site.nameEn}</div>
          <div style={{ display: "flex", fontSize: 40, color: c.inkSoft, marginTop: 8 }}>{site.tagline}</div>
        </div>
        <div style={{ display: "flex", background: c.ink, color: c.bg, padding: "16px 24px", fontSize: 26 }}>{site.logoSub}</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
