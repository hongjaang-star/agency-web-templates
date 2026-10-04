import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, getService, services } from "@/data/services";
import { site } from "@/data/site";
import { CtaBand, MedicalNotice, PageHero } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMetadata({ title: `${s.ko} 상담`, description: `${site.area} ${s.ko} 상담. ${s.summary}`, path: `/services/${s.slug}` });
}

export default async function ServiceDetail({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const others = services.filter((o) => o.category === s.category && o.slug !== s.slug);
  const blocks = [
    { title: "이런 분께 필요합니다", items: s.forWho },
    { title: "진행 범위", items: s.scope },
    { title: "준비 서류", items: s.documents },
  ];
  return (
    <>
      <PageHero
        path={`/services/${s.slug}`}
        eyebrow={categories[s.category].en}
        title={s.ko}
        desc={s.summary}
        crumbs={[{ href: "/services", label: "업무분야" }, { label: s.ko }]}
      />
      <JsonLd data={serviceSchema(s)} />
      <section className="py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            {blocks.map((b) => (
              <div key={b.title} data-reveal>
                <h2 className="font-serif-kr text-2xl text-ink">{b.title}</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {b.items.map((it) => (
                    <li key={it} className="border-l-2 border-gold bg-cream px-5 py-4 text-[15px] text-ink">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <MedicalNotice text="안내된 내용은 일반적인 기준입니다. 공제·감면 적용 여부와 세액은 개별 사실관계를 검토한 뒤 확정됩니다." />
          </div>
          <aside className="h-fit border border-line bg-ivory p-8 lg:sticky lg:top-28 lg:col-span-4">
            <p className="eyebrow">Deadline</p>
            <p className="mt-2 font-serif-kr text-lg text-ink">{s.timing}</p>
            <a href={site.phoneHref} className="mt-6 block bg-ink px-5 py-4 text-center text-ivory hover:bg-gold-deep">
              전화 상담 {site.phone}
            </a>
            {others.length > 0 && (
              <>
                <p className="mt-8 text-sm font-semibold text-ink">같은 분야 업무</p>
                <ul className="mt-3 space-y-2 text-[15px]">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link href={`/services/${o.slug}`} className="text-ink-soft hover:text-gold-deep">
                        {o.ko}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
