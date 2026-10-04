import Image from "next/image";
import { images } from "@/data/site";
import { assetPath } from "@/lib/config";
import { promises, spaces } from "@/data/content";
import { CtaBand, PageHero, SectionTitle } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "병원소개",
  description:
    "강남역 뤼미에르 피부과는 피부과 전문의 직접 진단, 정품·정량 원칙, 끝까지 책임지는 사후 관리를 약속합니다. 1인 1실 시술실과 프라이빗한 공간을 소개합니다.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        path="/about"
        eyebrow="About"
        title="병원소개"
        desc="피부 본연의 빛을, 가장 정직한 방법으로."
        crumbs={[{ label: "병원소개" }]}
      />

      {/* Philosophy */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionTitle
              eyebrow="Philosophy"
              title={
                <>
                  Lumière, 빛.
                  <br />
                  모든 피부에는 저마다의 빛이 있습니다
                </>
              }
            />
            <div data-reveal className="mt-8 space-y-5 text-ink-soft md:text-[17px]">
              <p>
                뤼미에르는 새로운 얼굴을 만드는 곳이 아닙니다. 시간과 환경, 습관 속에서 가려진 피부 본래의 빛을
                되찾도록 돕는 곳입니다.
              </p>
              <p>
                그래서 우리는 시술보다 진단에 더 많은 시간을 씁니다. 필요한 것만 권하고, 사용하는 모든 약제와
                장비를 투명하게 공개합니다. 그것이 오래 신뢰받는 피부과의 가장 기본이라고 믿습니다.
              </p>
            </div>
            <p data-reveal className="mt-10 font-serif-kr text-lg text-ink">
              대표원장 한서윤
            </p>
          </div>
          <div data-reveal className="relative aspect-[4/5] overflow-hidden rounded-t-full lg:col-span-5 lg:col-start-8">
            <Image
              src={assetPath(images.philosophy)}
              alt="하얀 천 위에 놓인 스킨케어 제품"
              fill
              sizes="(min-width: 1024px) 38vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="bg-ink py-24 text-ivory md:py-32">
        <div className="container-page">
          <div data-reveal className="max-w-2xl">
            <p className="eyebrow !text-gold-soft">Our Promise</p>
            <h2 className="mt-4 font-serif-kr text-3xl leading-snug md:text-4xl">뤼미에르의 세 가지 약속</h2>
          </div>
          <ol className="mt-16 grid gap-px bg-white/10 md:grid-cols-3">
            {promises.map((p, i) => (
              <li
                key={p.no}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}
                className="bg-ink p-8 md:p-10"
              >
                <span className="font-display text-5xl text-gold">{p.no}</span>
                <p className="mt-8 font-display text-sm tracking-[0.25em] text-ivory/50 uppercase">{p.en}</p>
                <h3 className="mt-2 font-serif-kr text-2xl">{p.title}</h3>
                <p className="mt-4 text-ivory/70">{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Space */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="container-page">
          <SectionTitle
            eyebrow="Space"
            title="머무는 시간까지 편안하도록"
            desc="프라이빗한 동선과 1인 1실 시술실로 설계된 뤼미에르의 공간입니다."
          />
          <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {spaces.map((s, i) => (
              <li key={s.label} data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                <div className="relative aspect-square overflow-hidden">
                  <Image src={assetPath(s.image)} alt={`${s.name} — AI로 생성된 참고용 이미지`} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw" className="object-cover" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">{s.name}</h3>
                <p className="mt-2 text-[15px] text-ink-soft">{s.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
