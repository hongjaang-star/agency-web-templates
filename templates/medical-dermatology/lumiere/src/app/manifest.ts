import type { MetadataRoute } from "next";

export const dynamic = "force-static"; // 정적 export 용
import { BASE_PATH } from "@/lib/config";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.nameKo,
    short_name: site.nameShort,
    description: site.description,
    start_url: `${BASE_PATH}/`,
    display: "browser",
    background_color: "#faf8f5",
    theme_color: "#faf8f5",
    icons: [{ src: `${BASE_PATH}/icon.svg`, sizes: "any", type: "image/svg+xml" }],
  };
}
