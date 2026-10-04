import { site, videos } from "@/data/site";
import { preload } from "react-dom";
import { ButtonLink } from "@/components/ui";
import HeroVideo from "@/components/HeroVideo";
import { assetPath } from "@/lib/config";

/* ───────── Hero ───────── */
export default function Hero() {
  const poster = assetPath(videos.heroPoster);
  // 포스터를 먼저 받아 첫 화면(LCP)을 빠르게 그립니다.
  preload(poster, { as: "image", fetchPriority: "high" });

  return (
    <section className="relative isolate overflow-hidden bg-ivory">
      {/* 배경 영상
          · 모바일: 화면 위쪽 68%에 영상, 얼굴이 가운데 오도록 맞추고 텍스트는 그 아래
          · 데스크톱: 섹션 전체 배경, 인물이 오른쪽이라 텍스트는 왼쪽 */}
      <HeroVideo
        src={assetPath(videos.hero)}
        poster={poster}
        className="absolute inset-x-0 top-0 h-[68svh] w-full object-[60%_center] lg:inset-y-0 lg:h-full lg:object-center"
      />

      {/* 가독성용 그라데이션 — 모바일: 영상 아래쪽을 아이보리로 녹임 / 데스크톱: 왼쪽 → 오른쪽 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[68svh] bg-linear-to-t from-ivory from-0% via-ivory/50 via-25% to-ivory/0 to-55% lg:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden bg-linear-to-r from-ivory/95 from-0% via-ivory/75 via-30% to-ivory/0 to-60% lg:block"
      />

      <div className="container-page flex flex-col pb-16 pt-[54svh] lg:min-h-[calc(100svh-164px)] lg:justify-center lg:py-24">
        <div className="max-w-xl lg:max-w-[500px]">
          <p className="eyebrow animate-fade-up">{site.tagline}</p>
          <h1
            className="mt-5 animate-rise font-serif-kr text-[2.35rem] leading-[1.35] text-ink sm:text-5xl sm:leading-[1.3] xl:text-[3.5rem]"
            style={{ animationDelay: "100ms" }}
          >
            피부 본연의 빛을,{" "}
            <br />
            가장 <em className="not-italic text-gold-deep">정직한</em> 방법으로
          </h1>
          <p
            className="mt-6 max-w-md animate-rise text-ink-soft md:text-[17px]"
            style={{ animationDelay: "200ms" }}
          >
            피부과 전문의가 직접 진단하고, 정품·정량 원칙으로 시술합니다.
            <br className="hidden sm:block" />
            과하지 않게, 오래 아름답도록.
          </p>
          <div
            className="mt-9 flex animate-fade-up flex-wrap gap-3"
            style={{ animationDelay: "300ms" }}
          >
            <ButtonLink href="/reservation">예약 · 상담하기</ButtonLink>
            <ButtonLink href="/treatments" variant="outline" className="bg-white/60 backdrop-blur-sm">
              진료과목 보기
            </ButtonLink>
          </div>

          <dl
            className="mt-12 grid max-w-md animate-fade-up grid-cols-3 border-t border-ink/15 pt-6"
            style={{ animationDelay: "400ms" }}
          >
            {[
              ["3인", "피부과 전문의"],
              ["1:1", "맞춤 진단"],
              ["100%", "정품 · 정량"],
            ].map(([num, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-3xl text-ink">{num}</dd>
                <dd className="mt-1 text-[13px] text-ink-soft">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
