import type { NextConfig } from "next";
import { BASE_PATH } from "./src/lib/config";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: BASE_PATH || undefined,
  images: { unoptimized: true },
  turbopack: { root: process.cwd() },
};
export default nextConfig;
