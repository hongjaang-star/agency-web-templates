import type { Metadata } from "next";
import { absoluteUrl } from "./config";
import { site } from "@/data/site";

/** 공유 이미지 (app/og.png/route.tsx 가 빌드 때 생성) */
export const OG_IMAGE = { url: absoluteUrl("/og.png"), width: 1200, height: 630, alt: `${site.nameKo} — ${site.tagline}` };

/** 모든 페이지 제목 뒤에 붙는 브랜드 + 업종 키워드 */
export const SITE_TITLE_SUFFIX = `${site.nameKo} 알루미늄 부품`;

/** 페이지별 메타데이터 (title, description, canonical, Open Graph, Twitter) */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${title} | ${SITE_TITLE_SUFFIX}`;
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: { title: fullTitle, description, url: absoluteUrl(path), siteName: site.nameKo, locale: "ko_KR", type: "website", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [OG_IMAGE.url] },
  };
}
