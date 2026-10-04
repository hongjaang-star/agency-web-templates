import { equipment } from "@/data/content";
import Image from "next/image";
import { assetPath } from "@/lib/config";
import { CtaBand, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "보유장비",
  description:
    "울쎄라, 써마지 FLX, 피코슈어, 엑셀V, 포텐자 등 강남역 뤼미에르 피부과의 보유장비를 소개합니다. 허가받은 정품 장비만 사용하고 정기 점검합니다.",
  path: "/equipment",
});

export default function EquipmentPage() {
  return (
    <>
      <PageHero
        path="/equipment"
        eyebrow="Equipment"
        title="보유장비"
        desc="허가받은 정품 장비만 사용하며, 정기 점검으로 최상의 상태를 유지합니다."
        crumbs={[{ label: "보유장비" }]}
      />

      <section className="bg-white py-20 md:py-28">
        <p className="container-page mb-8 text-sm text-ink-soft">포트폴리오용 AI 참고 이미지입니다. 장비의 외형과 세부 구성은 실제 제품과 다를 수 있습니다.</p>
        <ul className="container-page grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((e, i) => (
            <li key={e.en} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={assetPath(e.image)} alt={`${e.name} 분류의 AI 참고 이미지 — 실제 제품 외형과 다를 수 있음`} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="object-cover" />
              </div>
              <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-line pb-4">
                <h2 className="text-xl font-semibold text-ink">{e.name}</h2>
                <span className="shrink-0 text-[13px] text-gold-deep">{e.type}</span>
              </div>
              <p className="mt-1 font-display text-base tracking-wide text-ink-mute">{e.en}</p>
              <p className="mt-3 text-[15px] text-ink-soft">{e.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
