import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { brandColors, site } from "@/data/site";
import { NOINDEX, SITE_URL } from "@/lib/config";
import { orgSchema } from "@/lib/schema";
import { SITE_TITLE_SUFFIX } from "@/lib/seo";

// 본문은 IBM Plex Sans KR 하나로 굵기 대비, 품번·사양 숫자는 IBM Plex Mono.
const plex = IBM_Plex_Sans_KR({ variable: "--font-plex", weight: ["400", "600", "700"], display: "swap", preload: false });
const mono = IBM_Plex_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...(NOINDEX && { robots: { index: false, follow: false } }),
  title: { default: `${site.nameKo} | 적용 분야로 찾는 알루미늄 부품`, template: `%s | ${SITE_TITLE_SUFFIX}` },
  description: site.description,
  applicationName: site.nameKo,
  openGraph: { siteName: site.nameKo, locale: "ko_KR", type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: brandColors.ink };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${plex.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#main">본문 바로가기</a>
        <div className="demo">{site.demoNotice}</div>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={orgSchema()} />
      </body>
    </html>
  );
}
