import type { Metadata, Viewport } from "next";
import { Gothic_A1, Song_Myung } from "next/font/google";
import "./globals.css";
import Top from "@/components/Top";
import Foot from "@/components/Foot";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { brandColors, site } from "@/data/site";
import { NOINDEX, SITE_URL } from "@/lib/config";
import { orgSchema } from "@/lib/schema";
import { SITE_TITLE_SUFFIX } from "@/lib/seo";

// 제목 서체(단일 굵기)와 본문 서체. 한글 글자 범위별 선언이 굵기마다 늘어나므로 쓰는 굵기만 받는다.
const song = Song_Myung({ variable: "--font-song", weight: "400", display: "swap" });
const gothic = Gothic_A1({ variable: "--font-gothic", subsets: ["latin"], weight: ["400", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...(NOINDEX && { robots: { index: false, follow: false } }),
  title: { default: site.seoTitle, template: `%s | ${SITE_TITLE_SUFFIX}` },
  description: site.description,
  applicationName: site.nameKo,
  openGraph: { siteName: site.nameKo, locale: "ko_KR", type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: brandColors.bg };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${song.variable} ${gothic.variable}`} suppressHydrationWarning>
      <head>
        {/* 스크롤 연출은 JS 가 돌 때만 켠다 */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip" href="#main">본문 바로가기</a>
        <div className="demo">{site.demoNotice}</div>
        <Top />
        <main id="main">{children}</main>
        <Foot />
        <Reveal />
        <JsonLd data={orgSchema()} />
      </body>
    </html>
  );
}
