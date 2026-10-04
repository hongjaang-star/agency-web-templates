import type { Metadata, Viewport } from "next";
import { Hahmlet } from "next/font/google";
import "./globals.css";
import Masthead from "@/components/Masthead";
import Colophon from "@/components/Colophon";
import Motion from "@/components/Motion";
import JsonLd from "@/components/JsonLd";
import { brandColors, site } from "@/data/site";
import { NOINDEX, SITE_URL } from "@/lib/config";
import { orgSchema } from "@/lib/schema";
import { SITE_TITLE_SUFFIX } from "@/lib/seo";

// 제목 서체. 한글 글자 범위별 선언이 굵기마다 늘어나므로 지면에 쓰는 세 굵기만 받는다.
const hahmlet = Hahmlet({
  variable: "--font-hahmlet",
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  display: "swap",
});

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
    <html lang="ko" className={hahmlet.variable} suppressHydrationWarning>
      <head>
        {/* 스크롤 연출은 JS 가 돌 때만 켠다. JS 가 없으면 내용이 처음부터 보인다. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip" href="#main">본문 바로가기</a>
        <div className="demo">{site.demoNotice}</div>
        <Masthead />
        <main id="main">{children}</main>
        <Colophon />
        <Motion />
        <JsonLd data={orgSchema()} />
      </body>
    </html>
  );
}
