// ─────────────────────────────────────────────
// 사이트 주소 설정 (next.config.ts 와 앱 코드가 함께 사용)
// ─────────────────────────────────────────────

/**
 * 주소 접두어. 환경변수 NEXT_PUBLIC_BASE_PATH 로 지정합니다 (.env.local 참고).
 * 로컬 데모: /project/medical-dermatology · 데모 서버: /pro-tax-office/trust · 실제 도메인: 비움
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/**
 * 사이트 도메인 (canonical, sitemap, OG 절대주소에 사용).
 * 배포 시 환경변수 NEXT_PUBLIC_SITE_URL 에 실제 도메인을 넣으세요. 예) https://www.lumiere-derm.co.kr
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

/** "/about" → "https://도메인{BASE_PATH}/about" */
export function absoluteUrl(path = "/") {
  const p = path === "/" ? "" : path;
  return `${SITE_URL}${BASE_PATH}${p}`;
}

/** public/ 파일 경로에 basePath 를 붙임 (next/image 의 로컬 src 에 사용) */
export function assetPath(path: string) {
  return `${BASE_PATH}${path}`;
}

/** 데모 배포(NEXT_PUBLIC_NOINDEX=1)에서는 검색 노출을 막는다. 실제 납품 시 비워 둔다. */
export const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === "1";
