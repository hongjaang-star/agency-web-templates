import { site } from "@/data/site";
import { taxCalendar } from "@/data/content";
import { ButtonLink } from "@/components/ui";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-night text-paper">
      {/* 장부 격자 패턴 */}
      <svg aria-hidden="true" className="absolute inset-0 size-full opacity-[0.07]">
        <defs>
          <pattern id="ledger" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ledger)" />
      </svg>
      <div className="container-page relative grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
        <div className="animate-rise lg:col-span-7">
          <p className="eyebrow !text-gold-soft">{site.tagline}</p>
          <h1 className="mt-6 font-serif-kr text-[2.25rem] leading-tight md:text-6xl md:leading-[1.15]">
            숫자는 정확하게,
            <br />
            설명은 쉽게.
          </h1>
          <p className="mt-7 max-w-xl text-paper/75 md:text-lg">
            {site.area} {site.nameShort}. 기장대리부터 양도·상속·증여, 세무조사 대응까지 대표 세무사가 직접
            상담하고 신고까지 책임집니다.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={site.cta.href} variant="light">
              {site.cta.label}
            </ButtonLink>
            <ButtonLink href="/services" className="border border-paper/40 text-paper hover:bg-paper/10" variant="outline">
              업무분야 보기
            </ButtonLink>
          </div>
        </div>
        <aside
          aria-label="주요 신고 일정"
          className="premium-card p-7 backdrop-blur-sm md:p-9 lg:col-span-5"
        >
          <p className="eyebrow !text-gold-soft">Tax Calendar</p>
          <p className="mt-2 font-serif-kr text-xl">놓치기 쉬운 주요 신고 일정</p>
          <ul className="mt-6 divide-y divide-paper/10">
            {taxCalendar.map((t) => (
              <li key={t.month} className="flex items-baseline gap-5 py-3.5">
                <span className="w-12 shrink-0 font-display text-2xl text-gold-soft">{t.month}</span>
                <span className="text-[15px] text-paper/85">{t.item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-paper/50">개인 상황에 따라 신고 대상과 기한이 다를 수 있습니다.</p>
        </aside>
      </div>
    </section>
  );
}
