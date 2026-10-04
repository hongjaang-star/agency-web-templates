import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, getTreatmentsByCategory, type TreatmentCategory } from "@/data/treatments";
import { SectionTitle, TextLink } from "@/components/ui";

const categoryKeys = Object.keys(categories) as TreatmentCategory[];

export default function Treatments() {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionTitle
            eyebrow="Treatments"
            title="아름다움과 건강, 두 가지 모두를 위한 진료"
            desc="미용 시술부터 피부 질환 치료까지, 전문의가 원인을 먼저 봅니다."
          />
          <div data-reveal>
            <TextLink href="/treatments">진료과목 전체보기</TextLink>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {categoryKeys.map((key) => (
            <div key={key} data-reveal>
              <div className="flex items-baseline justify-between border-b border-ink pb-4">
                <h3 className="font-serif-kr text-xl text-ink">{categories[key].ko}</h3>
                <span className="font-display text-lg italic text-gold-deep">{categories[key].en}</span>
              </div>
              <ul>
                {getTreatmentsByCategory(key).map((t) => (
                  <li key={t.slug} className="border-b border-line">
                    <Link
                      href={`/treatments/${t.slug}`}
                      className="group grid grid-cols-[1fr_auto] items-center gap-4 py-6 transition-colors"
                    >
                      <div>
                        <p className="flex flex-wrap items-baseline gap-x-3">
                          <span className="text-lg font-semibold text-ink transition-colors group-hover:text-gold-deep">
                            {t.ko}
                          </span>
                          <span className="font-display text-[15px] tracking-wide text-ink-mute">{t.en}</span>
                        </p>
                        <p className="mt-1 text-[15px] text-ink-soft">{t.summary}</p>
                      </div>
                      <span className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink-soft transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-ivory">
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                      </span>
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
