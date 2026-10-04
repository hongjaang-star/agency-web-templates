import type { MetadataRoute } from "next";

export const dynamic = "force-static"; // 정적 export 용
import { BASE_PATH } from "@/lib/config";
import { brandColors, site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.nameKo,
    short_name: site.nameShort,
    description: site.description,
    start_url: `${BASE_PATH}/`,
    display: "browser",
    background_color: brandColors.bg,
    theme_color: brandColors.bg,
    icons: [{ src: `${BASE_PATH}/icon.svg`, sizes: "any", type: "image/svg+xml" }],
  };
}
