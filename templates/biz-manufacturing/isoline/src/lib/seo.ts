import type { Metadata } from "next";
import { absoluteUrl } from "./config";
import { site } from "@/data/site";

export const OG_IMAGE = { url: absoluteUrl("/og.png"), width: 1200, height: 630, alt: `${site.nameKo} — ${site.tagline}` };
export const TITLE_SUFFIX = `${site.nameKo} 알루미늄 부품`;

/** 페이지별 메타데이터 (title, description, canonical, Open Graph, Twitter) */
export function meta(title: string, description: string, path: string): Metadata {
  const full = `${title} | ${TITLE_SUFFIX}`;
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: { title: full, description, url: absoluteUrl(path), siteName: site.nameKo, locale: "ko_KR", type: "website", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: full, description, images: [OG_IMAGE.url] },
  };
}
