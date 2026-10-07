import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Foot from "@/components/Foot";
import Ld from "@/components/Ld";
import { colors, site } from "@/data/site";
import { NOINDEX, SITE_URL } from "@/lib/config";
import { org } from "@/lib/schema";
import { TITLE_SUFFIX } from "@/lib/seo";

// 숫자·영문 라벨은 Space Grotesk, 한글은 Pretendard(자체 호스팅, globals.css)
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...(NOINDEX && { robots: { index: false, follow: false } }),
  title: { default: `${site.nameKo} | ${site.tagline}`, template: `%s | ${TITLE_SUFFIX}` },
  description: site.description,
  applicationName: site.nameKo,
  openGraph: { siteName: site.nameKo, locale: "ko_KR", type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: colors.bg, colorScheme: "dark" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={grotesk.variable}>
      <body>
        <a className="skip" href="#main">본문 바로가기</a>
        <div className="demo">{site.demoNotice}</div>
        <TopBar />
        <main id="main">{children}</main>
        <Foot />
        <Ld data={org()} />
      </body>
    </html>
  );
}
