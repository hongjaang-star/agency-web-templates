import { equipment } from "@/data/content";
import { SectionTitle, TextLink } from "@/components/ui";

export default function EquipmentStrip() {
  return (
    <section className="border-y border-line bg-cream py-20 md:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-4">
          <SectionTitle
            eyebrow="Equipment"
            title="검증된 정품 장비"
            desc="FDA·식약처 허가를 받은 정품 장비만 사용하며, 정기 점검으로 최상의 상태를 유지합니다."
          />
          <div data-reveal className="mt-8">
            <TextLink href="/equipment">보유장비 전체보기</TextLink>
          </div>
        </div>
        <ul data-reveal className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:col-span-8 lg:grid-cols-4">
          {equipment.slice(0, 8).map((e) => (
            <li key={e.en} className="border-b border-r border-line bg-ivory/60 px-5 py-6">
              <p className="font-display text-lg leading-tight text-ink">{e.en}</p>
              <p className="mt-1 text-[13px] text-ink-mute">{e.type}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
