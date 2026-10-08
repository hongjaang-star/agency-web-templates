import { ImageResponse } from "next/og";
import { colors as c, site } from "@/data/site";

// 링크 공유 이미지 (1200×630) → /og.png. 한글 폰트 없이 만들기 위해 영문과 선으로 구성.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: c.bg, color: c.text, padding: "64px 80px", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: c.lime }}>ALUMINUM PARTS, DRAWN FIRST</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 84, fontWeight: 700, letterSpacing: -3 }}>{site.nameEn}</div>
            <div style={{ display: "flex", fontSize: 34, marginTop: 10 }}>Heat sinks · Profiles · Housings · Brackets</div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: c.lime }}>±0.02 mm · 6,000 mm · 8 drawings</div>
        </div>
        <svg width="300" height="300" viewBox="0 0 200 190">
          <g fill="none" stroke={c.lime} strokeWidth="2">
            <path d="M30 80 L100 52 L170 80 L100 108 Z" />
            <path d="M30 80 v54 L100 162 L170 134 v-54 M100 108 v54" />
            <path d="M30 60 L100 32 L170 60" strokeDasharray="5 6" />
          </g>
        </svg>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
