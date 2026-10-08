import { ImageResponse } from "next/og";
import { brandColors as c, site } from "@/data/site";

// 링크 공유 이미지 (1200×630) → /og.png. 한글 폰트 파일 없이 만들기 위해 영문으로 구성.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: c.paper, padding: "64px 80px", color: c.ink, borderTop: `16px solid ${c.hot}` }}>
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 6 }}>ALUMINUM EXTRUSION · CNC</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, letterSpacing: -3, fontWeight: 700 }}>{site.nameEn}</div>
          <div style={{ display: "flex", fontSize: 38, marginTop: 12 }}>Find parts by where they are used.</div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 24 }}>
          {["EV BATTERY", "SEMICONDUCTOR", "LED", "ROBOTICS", "TELECOM", "MEDICAL"].map((t) => (
            <div key={t} style={{ display: "flex", border: `2px solid ${c.ink}`, padding: "8px 14px" }}>{t}</div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
