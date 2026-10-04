import { ImageResponse } from "next/og";
import { site } from "@/data/site";

// 카카오톡·페이스북 등에 링크를 공유할 때 보이는 이미지 (1200×630) → /og.png
// 빌드 때 한 번 생성됩니다. 모든 페이지의 og:image 는 src/lib/seo.ts 의 OG_IMAGE 가 이 주소를 가리킵니다.
// (opengraph-image 파일 규칙은 basePath 를 주소에 반영하지 않아 일반 경로로 만들었습니다.)
// 한글 폰트를 넣으려면 폰트 파일을 불러와야 하므로, 브랜드 영문 표기로 구성했습니다.
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#faf8f5",
          padding: 64,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid #b8976a",
            padding: "56px 64px",
          }}
        >
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 8, color: "#7f6434" }}>
            {site.regionEn}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 120, letterSpacing: 24, color: "#1c1917" }}>{site.nameEn}</div>
            <div style={{ display: "flex", fontSize: 26, letterSpacing: 14, color: "#7f6434", marginTop: 8 }}>
              {site.logoSub}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 30, fontStyle: "italic", color: "#57534e" }}>
            {site.tagline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
