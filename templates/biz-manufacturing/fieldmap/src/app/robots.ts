import type { MetadataRoute } from "next";
import { absoluteUrl, NOINDEX } from "@/lib/config";

export const dynamic = "force-static"; // 정적 export 용

export default function robots(): MetadataRoute.Robots {
  return { rules: NOINDEX ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/" }, sitemap: absoluteUrl("/sitemap.xml") };
}
