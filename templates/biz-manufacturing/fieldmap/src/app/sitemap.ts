import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/config";
import { applications, products } from "@/data/catalog";

export const dynamic = "force-static"; // 정적 export 용

// 페이지를 추가하면 여기에도 추가하세요. 제품·분야 상세는 catalog.ts 에서 자동으로 들어옵니다.
const pages = ["/", "/products", "/applications", "/capability", "/company", "/quote"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...pages.map((p, i) => ({ url: absoluteUrl(p), lastModified: now, priority: i === 0 ? 1 : 0.8 })),
    ...applications.map((a) => ({ url: absoluteUrl(`/applications/${a.id}`), lastModified: now, priority: 0.7 })),
    ...products.map((p) => ({ url: absoluteUrl(`/products/${p.id}`), lastModified: now, priority: 0.7 })),
  ];
}
