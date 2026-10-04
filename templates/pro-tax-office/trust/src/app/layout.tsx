import type { Metadata, Viewport } from "next";
import { Cormorant, Nanum_Myeongjo } from "next/font/google";
import "./globals.css";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import RevealObserver from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { brandColors, site } from "@/data/site";
import { SITE_URL, NOINDEX } from "@/lib/config";
import { SITE_TITLE_SUFFIX } from "@/lib/seo";
import { orgSchema } from "@/lib/schema";

// 가변 폰트(굵기 지정 없음) — 굵기별 파일을 따로 받지 않아 CSS·요청 수가 줄어듭니다.
const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const nanumMyeongjo = Nanum_Myeongjo({
  variable: "--font-nanum-myeongjo",
  subsets: ["latin"],
  // 사이트에서는 400 굵기만 사용합니다. 굵기를 추가하면 한글 글자 범위별 선언이 90여 개씩 늘어납니다.
  weight: "400",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...(NOINDEX && { robots: { index: false, follow: false } }),
  title: {
    default: site.seoTitle,
    template: `%s | ${SITE_TITLE_SUFFIX}`,
  },
  description: site.description,
  applicationName: site.nameKo,
  openGraph: {
    siteName: site.nameKo,
    locale: "ko_KR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  // 배포 후 발급받은 인증 코드를 넣으세요 (구글 서치 콘솔 / 네이버 서치어드바이저)
  // verification: { google: "...", other: { "naver-site-verification": "..." } },
};

export const viewport: Viewport = {
  themeColor: brandColors.bg,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${cormorant.variable} ${nanumMyeongjo.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Opt into scroll-reveal only when JS runs, so content never stays hidden */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-ivory"
        >
          본문 바로가기
        </a>
        <TopBanner />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingContact />
        <RevealObserver />
        <JsonLd data={orgSchema()} />
      </body>
    </html>
  );
}
