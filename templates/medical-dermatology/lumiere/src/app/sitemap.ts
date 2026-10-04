import type { MetadataRoute } from "next";

export const dynamic = "force-static"; // 정적 export 용
import { absoluteUrl } from "@/lib/config";
import { treatments } from "@/data/treatments";

// 페이지를 추가하면 여기에도 추가하세요. 진료과목은 treatments.ts 에서 자동으로 들어옵니다.
const staticPages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/treatments", priority: 0.9, changeFrequency: "monthly" },
  { path: "/doctors", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/equipment", priority: 0.6, changeFrequency: "monthly" },
  { path: "/events", priority: 0.7, changeFrequency: "weekly" },
  { path: "/location", priority: 0.7, changeFrequency: "monthly" },
  { path: "/reservation", priority: 0.6, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...staticPages.map((p) => ({
      url: absoluteUrl(p.path),
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...treatments.map((t) => ({
      url: absoluteUrl(`/treatments/${t.slug}`),
      lastModified: new Date(t.reviewedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
