import { ImageResponse } from "next/og";
import { brandColors as c, site } from "@/data/site";

// 링크 공유 이미지 (1200×630) → /og.png. 빌드 때 한 번 생성된다.
// 한글 폰트를 넣으려면 폰트 파일을 불러와야 하므로 영문 표기로 지면처럼 구성했다.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: c.bg, padding: "56px 72px", color: c.ink }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: c.inkSoft, borderBottom: `2px solid ${c.ink}`, paddingBottom: 16 }}>
          <span>{site.regionEn}</span>
          <span>TAX ALMANAC</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
          <div style={{ display: "flex", fontSize: 128, letterSpacing: -4, fontWeight: 700 }}>{site.nameEn}</div>
          <div style={{ display: "flex", fontSize: 44, color: c.accent, marginTop: 12 }}>{site.tagline}</div>
        </div>
        <div style={{ display: "flex", borderTop: `4px solid ${c.ink}`, paddingTop: 16, fontSize: 24, color: c.inkSoft }}>{site.logoSub}</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
