import type { Metadata } from "next";
import { homeSections, site } from "@/data/site";
import { blocks, type BlockKey } from "@/components/blocks";
import { absoluteUrl } from "@/lib/config";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: site.seoTitle,
    description: site.description,
    url: absoluteUrl("/"),
    siteName: site.nameKo,
    locale: "ko_KR",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seoTitle,
    description: site.description,
    images: [OG_IMAGE.url],
  },
};

// 섹션 구성·순서는 src/data/site.ts 의 homeSections 에서 바꿉니다.
const sections: readonly BlockKey[] = homeSections;

export default function Home() {
  return sections.map((key) => {
    const Block = blocks[key];
    return <Block key={key} />;
  });
}
