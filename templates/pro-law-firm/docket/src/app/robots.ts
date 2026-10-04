import type { MetadataRoute } from "next";

export const dynamic = "force-static"; // 정적 export 용
import { absoluteUrl, NOINDEX } from "@/lib/config";

// 주의: 검색엔진은 도메인 루트의 /robots.txt 만 읽습니다.
// basePath 를 쓰는 동안(로컬)에는 {basePath}/robots.txt 로 열리며, 운영 배포 시 basePath 를 비우면 루트로 이동합니다.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: NOINDEX ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
