import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, getServicesByCategory, type ServiceCategory } from "@/data/services";
import { SectionTitle, TextLink } from "@/components/ui";

const keys = Object.keys(categories) as ServiceCategory[];

export default function Services() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionTitle eyebrow="Services" title="상황에 맞는 업무를 찾아보세요" desc="사업, 재산, 분쟁. 세 갈래로 나누어 필요한 업무를 바로 확인할 수 있습니다." />
          <TextLink href="/services">업무분야 전체보기</TextLink>
        </div>
        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          {keys.map((key) => (
            <div key={key} data-reveal className="premium-card p-7">
              <p className="eyebrow">{categories[key].en}</p>
              <h3 className="mt-2 font-serif-kr text-2xl text-ink">{categories[key].ko}</h3>
              <ul className="mt-6 border-t border-ink/15">
                {getServicesByCategory(key).map((s) => (
                  <li key={s.slug} className="border-b border-ink/15">
                    <Link href={`/services/${s.slug}`} className="group flex items-start justify-between gap-4 py-5">
                      <span>
                        <span className="block text-[17px] font-semibold text-ink group-hover:text-gold-deep">{s.ko}</span>
                        <span className="mt-1 block text-sm text-ink-soft">{s.summary}</span>
                      </span>
                      <ArrowUpRight aria-hidden="true" className="mt-1 size-5 shrink-0 text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
