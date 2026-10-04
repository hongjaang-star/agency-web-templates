import type { Metadata } from "next";
import { absoluteUrl } from "./config";
import { site } from "@/data/site";

/** 공유 이미지 (app/og.png/route.tsx 가 빌드 때 생성) */
export const OG_IMAGE = {
  url: absoluteUrl("/og.png"),
  width: 1200,
  height: 630,
  alt: `${site.brandFull} — ${site.area} ${site.nameShort}`,
};

/** 브랜드 + 지역 키워드. 모든 페이지 제목 뒤에 붙습니다. */
export const SITE_TITLE_SUFFIX = `${site.area} ${site.nameShort}`;

/**
 * 페이지별 메타데이터 (title, description, canonical, Open Graph, Twitter)
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE_TITLE_SUFFIX}`;
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      siteName: site.nameKo,
      locale: "ko_KR",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [OG_IMAGE.url] },
  };
}

/** 문장 단위로 끊어서 검색 결과용 설명(약 70~120자)을 만듭니다. */
export function toDescription(parts: string[], max = 120) {
  let out = "";
  for (const part of parts) {
    const sentences = part.split(/(?<=[.!?。])\s+/);
    for (const s of sentences) {
      const next = out ? `${out} ${s}` : s;
      if (next.length > max) return out || s.slice(0, max);
      out = next;
    }
  }
  return out;
}
