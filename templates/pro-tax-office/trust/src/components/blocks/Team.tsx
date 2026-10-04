import { team } from "@/data/content";
import { SectionTitle, TextLink } from "@/components/ui";

export default function Team() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionTitle eyebrow="Our People" title="분야별 세무사가 직접 맡습니다" />
          <TextLink href="/about">사무소 소개</TextLink>
        </div>
        <ul className="mt-14 grid gap-8 md:grid-cols-3">
          {team.map((m) => (
            <li key={m.name} data-reveal className="border-t-2 border-ink pt-8">
              <div className="flex items-center gap-5">
                <span aria-hidden="true" className="flex size-16 items-center justify-center rounded-full bg-ink font-serif-kr text-2xl text-gold-soft">
                  {m.name[0]}
                </span>
                <div>
                  <p className="font-serif-kr text-2xl text-ink">{m.name}</p>
                  <p className="text-sm text-gold-deep">{m.role}</p>
                </div>
              </div>
              <p className="mt-6 text-[15px] font-semibold text-ink">{m.focus}</p>
              <ul className="mt-3 space-y-1 text-sm text-ink-soft">
                {m.career.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="mt-6 border-l-2 border-gold pl-4 text-[15px] italic text-ink-soft">“{m.quote}”</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
