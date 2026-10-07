// ─────────────────────────────────────────────
// 사이트 주소 설정 (next.config.ts 와 앱 코드가 함께 사용)
// ─────────────────────────────────────────────

/**
 * 주소 접두어. 환경변수 NEXT_PUBLIC_BASE_PATH 로 지정합니다 (.env.example 참고).
 * 로컬 데모: /project/biz-manufacturing · 데모 서버: /agency-web-templates/biz-manufacturing/fieldmap · 실제 도메인: 비움
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/** 사이트 도메인 (canonical, sitemap, OG 절대주소). 경로 없이 도메인만. 예) https://www.example.co.kr */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

/** "/about" → "https://도메인{BASE_PATH}/about" */
export function absoluteUrl(path = "/") {
  const p = path === "/" ? "" : path;
  return `${SITE_URL}${BASE_PATH}${p}`;
}

/** 데모 배포(NEXT_PUBLIC_NOINDEX=1)에서는 검색 노출을 막는다. 실제 납품 시 비워 둔다. */
export const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === "1";
