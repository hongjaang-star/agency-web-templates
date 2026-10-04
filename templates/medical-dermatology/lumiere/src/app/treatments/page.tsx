import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, getTreatmentsByCategory, type TreatmentCategory } from "@/data/treatments";
import { CtaBand, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "진료과목",
  description:
    "리프팅, 레이저 토닝·기미, 스킨부스터, 보톡스·필러 등 피부 미용과 여드름, 흉터, 아토피, 점 제거 등 피부 질환까지. 강남역 뤼미에르 피부과 진료과목 안내.",
  path: "/treatments",
});

const categoryKeys = Object.keys(categories) as TreatmentCategory[];

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        path="/treatments"
        eyebrow="Treatments"
        title="진료과목"
        desc="미용과 치료, 두 영역 모두 피부과 전문의가 원인을 먼저 진단합니다."
        crumbs={[{ label: "진료과목" }]}
      />

      {/* In-page anchors */}
      <nav aria-label="진료 분류" className="sticky top-[72px] z-20 border-b border-line bg-ivory/95 backdrop-blur md:top-[120px]">
        <ul className="container-page flex gap-8">
          {categoryKeys.map((key) => (
            <li key={key}>
              <a
                href={`#${key}`}
                className="inline-flex h-14 items-center gap-2 text-[15px] font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {categories[key].ko}
                <span className="font-display text-sm italic text-gold-deep">{categories[key].en}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {categoryKeys.map((key, ci) => (
        <section
          key={key}
          id={key}
          aria-labelledby={`${key}-title`}
          className={`scroll-mt-40 py-20 md:py-28 ${ci % 2 === 0 ? "bg-white" : "bg-ivory"}`}
        >
          <div className="container-page grid gap-12 lg:grid-cols-12">
            <div data-reveal className="lg:col-span-4">
              <p className="eyebrow">{categories[key].en}</p>
              <h2 id={`${key}-title`} className="mt-4 font-serif-kr text-3xl text-ink md:text-4xl">
                {categories[key].ko}
              </h2>
              <p className="mt-4 text-ink-soft">{categories[key].desc}</p>
            </div>
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-8">
              {getTreatmentsByCategory(key).map((t, i) => (
                <li key={t.slug} data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                  <Link
                    href={`/treatments/${t.slug}`}
                    className="group flex h-full flex-col bg-white p-8 transition-colors duration-300 hover:bg-cream md:p-10"
                  >
                    <span className="font-display text-sm text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-6 text-xl font-semibold text-ink">{t.ko}</h3>
                    <p className="mt-1 font-display text-base tracking-wide text-ink-mute">{t.en}</p>
                    <p className="mt-5 flex-1 text-[15px] text-ink-soft">{t.summary}</p>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink">
                      자세히 보기
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <CtaBand />
    </>
  );
}
