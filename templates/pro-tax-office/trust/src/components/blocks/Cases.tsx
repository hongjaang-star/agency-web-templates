import { cases } from "@/data/content";
import { SectionTitle, TextLink } from "@/components/ui";

export function CaseCard({ c }: { c: (typeof cases)[number] }) {
  return (
    <article data-reveal className="premium-card flex h-full flex-col p-8">
      <p className="inline-flex w-fit bg-night px-3 py-1 text-xs tracking-wider text-paper">{c.tag}</p>
      <h3 className="mt-5 font-serif-kr text-xl text-ink">{c.title}</h3>
      <dl className="mt-5 space-y-3 text-[15px]">
        {[["상황", c.situation], ["진행", c.action], ["결과", c.result]].map(([k, v]) => (
          <div key={k} className="grid grid-cols-[3rem_1fr] gap-3">
            <dt className="font-semibold text-gold-deep">{k}</dt>
            <dd className="text-ink-soft">{v}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export default function Cases() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionTitle eyebrow="Cases" title="업무 사례" desc="유형별 예시입니다. 결과는 개별 사실관계에 따라 달라집니다." />
          <TextLink href="/cases">사례 더 보기</TextLink>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cases.slice(0, 2).map((c) => (
            <CaseCard key={c.title} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
