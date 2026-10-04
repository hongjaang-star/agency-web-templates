import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, getServicesByCategory, type ServiceCategory } from "@/data/services";
import { CtaBand, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "업무분야",
  description: "기장대리, 종합소득세·부가세, 법인세, 양도소득세, 상속세, 증여세, 세무조사 대응, 경정청구까지 업무분야별 안내.",
  path: "/services",
});

const keys = Object.keys(categories) as ServiceCategory[];

export default function ServicesPage() {
  return (
    <>
      <PageHero path="/services" eyebrow="Services" title="업무분야" desc="필요한 업무를 선택하면 대상, 진행 범위, 준비 서류, 신고 시기를 확인할 수 있습니다." crumbs={[{ label: "업무분야" }]} />
      {keys.map((key, i) => (
        <section key={key} className={`py-20 md:py-24 ${i % 2 ? "bg-cream" : ""}`}>
          <div className="container-page grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">{categories[key].en}</p>
              <h2 className="mt-3 font-serif-kr text-3xl text-ink">{categories[key].ko}</h2>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
              {getServicesByCategory(key).map((s) => (
                <li key={s.slug} className="premium-card">
                  <Link href={`/services/${s.slug}`} className="group flex h-full flex-col p-8">
                    <span className="flex items-start justify-between gap-4">
                      <span className="font-serif-kr text-xl text-ink group-hover:text-gold-deep">{s.ko}</span>
                      <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 text-gold" />
                    </span>
                    <span className="mt-3 text-[15px] text-ink-soft">{s.summary}</span>
                    <span className="mt-auto pt-6 text-xs text-ink-mute">신고 시기 · {s.timing}</span>
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
