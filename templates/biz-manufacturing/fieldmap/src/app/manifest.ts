import type { MetadataRoute } from "next";
import { BASE_PATH } from "@/lib/config";
import { brandColors, site } from "@/data/site";

export const dynamic = "force-static"; // 정적 export 용

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.nameKo,
    short_name: site.nameKo,
    description: site.description,
    start_url: `${BASE_PATH}/`,
    display: "browser",
    background_color: brandColors.paper,
    theme_color: brandColors.ink,
    icons: [{ src: `${BASE_PATH}/icon.svg`, sizes: "any", type: "image/svg+xml" }],
  };
}
