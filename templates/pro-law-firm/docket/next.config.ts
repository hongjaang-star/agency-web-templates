import type { NextConfig } from "next";
import { BASE_PATH } from "./src/lib/config";

// 정적 HTML 로 내보냅니다 (npm run build → out/). Node 서버 없이 어떤 호스팅에도 업로드 가능.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // /about → /about/index.html (일반 웹호스팅 호환)
  basePath: BASE_PATH || undefined,
  images: { unoptimized: true }, // 정적 export 에서는 이미지 서버 최적화 불가
  turbopack: { root: process.cwd() }, // 모노레포 루트의 lockfile 이 아니라 이 앱 폴더를 기준으로 빌드
};

export default nextConfig;
