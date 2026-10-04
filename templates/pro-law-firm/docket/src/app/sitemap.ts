import type { MetadataRoute } from "next";

export const dynamic = "force-static"; // 정적 export 용
import { absoluteUrl } from "@/lib/config";
import { areas } from "@/data/areas";

// 페이지를 추가하면 여기에도 추가하세요. 업무분야 상세는 areas.ts 에서 자동으로 들어옵니다.
const staticPages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/areas", priority: 0.9, changeFrequency: "monthly" },
  { path: "/flow", priority: 0.8, changeFrequency: "monthly" },
  { path: "/attorneys", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cases", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...staticPages.map((p) => ({ url: absoluteUrl(p.path), lastModified: now, changeFrequency: p.changeFrequency, priority: p.priority })),
    ...areas.map((a) => ({ url: absoluteUrl(`/areas/${a.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
