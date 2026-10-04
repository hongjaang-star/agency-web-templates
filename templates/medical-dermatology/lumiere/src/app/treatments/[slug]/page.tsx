import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Plus } from "lucide-react";
import { categories, getTreatment, treatments } from "@/data/treatments";
import { medicalNotice, site } from "@/data/site";
import { ButtonLink, MedicalNotice, PageHero } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { doctors } from "@/data/content";
import { pageMetadata, toDescription } from "@/lib/seo";
import { treatmentSchema } from "@/lib/schema";

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/treatments/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) return {};
  return pageMetadata({
    title: t.ko,
    description: toDescription([`${t.summary}.`, t.intro]),
    path: `/treatments/${t.slug}`,
  });
}

export default async function TreatmentDetailPage({ params }: PageProps<"/treatments/[slug]">) {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) notFound();

  const idx = treatments.findIndex((x) => x.slug === t.slug);
  const prev = treatments[(idx - 1 + treatments.length) % treatments.length];
  const next = treatments[(idx + 1) % treatments.length];
  const category = categories[t.category];
  const reviewer = doctors.find((d) => d.name === t.reviewer);

  return (
    <>
      <JsonLd data={treatmentSchema(t)} />
      <PageHero
        path={`/treatments/${t.slug}`}
        eyebrow={t.en}
        title={t.ko}
        desc={t.summary}
        crumbs={[
          { href: "/treatments", label: "진료과목" },
          { href: `/treatments#${t.category}`, label: category.ko },
          { label: t.ko },
        ]}
      />

      {/* Overview + info */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Overview</p>
            <h2 className="mt-4 font-serif-kr text-2xl leading-snug text-ink md:text-3xl">
              {category.ko} · {t.ko}
            </h2>
            <p className="mt-6 text-ink-soft md:text-[17px]">{t.intro}</p>
            {reviewer && (
              <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-5 text-[13px] text-ink-soft">
                <span className="font-medium text-ink">
                  감수 {reviewer.name} {reviewer.role}
                </span>
                <span>피부과 전문의 · {reviewer.specialty}</span>
                <span aria-hidden="true" className="h-3 w-px bg-line" />
                <span>
                  최종 검토 <time dateTime={t.reviewedAt}>{t.reviewedAt.replaceAll("-", ".")}</time>
                </span>
              </p>
            )}
          </div>
          <dl className="grid grid-cols-2 self-start border-l border-t border-line lg:col-span-5">
            {t.info.map((i) => (
              <div key={i.label} className="border-b border-r border-line p-6">
                <dt className="text-[13px] text-ink-mute">{i.label}</dt>
                <dd className="mt-2 font-medium text-ink">{i.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Recommend */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-4">
            <p className="eyebrow">Recommended</p>
            <h2 className="mt-4 font-serif-kr text-2xl text-ink md:text-3xl">이런 분께 권합니다</h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {t.recommend.map((r, i) => (
              <li
                key={r}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
                className="flex items-start gap-4 bg-white p-6"
              >
                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-gold text-gold-deep">
                  <Check aria-hidden="true" className="size-3.5" />
                </span>
                <span className="text-ink">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-page">
          <div data-reveal>
            <p className="eyebrow">Process</p>
            <h2 className="mt-4 font-serif-kr text-2xl text-ink md:text-3xl">진료 과정</h2>
          </div>
          <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {t.process.map((p, i) => (
              <li
                key={p.title}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                className="border-t border-ink pt-6 lg:pr-8"
              >
                <span className="font-display text-sm tracking-[0.2em] text-gold-deep">STEP {String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-[15px] text-ink-soft">{p.desc}</p>
              </li>
            ))}
          </ol>

          {t.equipment.length > 0 && (
            <div data-reveal className="mt-16 flex flex-wrap items-center gap-3 border-t border-line pt-8">
              <span className="mr-2 text-sm text-ink-mute">사용 장비</span>
              {t.equipment.map((e) => (
                <Link
                  key={e}
                  href="/equipment"
                  className="border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-gold hover:text-gold-deep"
                >
                  {e}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ivory py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-4 font-serif-kr text-2xl text-ink md:text-3xl">자주 묻는 질문</h2>
          </div>
          <div data-reveal className="border-t border-ink lg:col-span-8">
            {t.faq.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="mr-3 font-display text-xl text-gold-deep">Q.</span>
                    {f.q}
                  </span>
                  <Plus
                    aria-hidden="true"
                    className="size-5 shrink-0 text-ink-soft transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <p className="pb-7 pl-9 text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + notice */}
      <section className="bg-white py-20">
        <div className="container-page space-y-12">
          <div
            data-reveal
            className="flex flex-col items-start justify-between gap-8 bg-ink p-10 text-ivory md:flex-row md:items-center md:p-14"
          >
            <div>
              <p className="eyebrow !text-gold-soft">Consultation</p>
              <p className="mt-3 font-serif-kr text-2xl md:text-3xl">{t.ko}, 전문의와 먼저 상담하세요</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/reservation" variant="light">
                예약 · 상담하기
              </ButtonLink>
              <a
                href={site.phoneHref}
                className="inline-flex h-12 items-center border border-white/30 px-7 text-[15px] font-medium transition-colors hover:border-white"
              >
                {site.phone}
              </a>
            </div>
          </div>

          <MedicalNotice text={medicalNotice} />

          <nav aria-label="다른 진료과목" className="grid grid-cols-2 border-t border-line pt-8">
            <Link href={`/treatments/${prev.slug}`} className="group flex flex-col gap-1">
              <span className="inline-flex items-center gap-2 text-[13px] text-ink-mute">
                <ArrowLeft aria-hidden="true" className="size-3.5 transition-transform group-hover:-translate-x-1" />
                이전
              </span>
              <span className="font-medium text-ink group-hover:text-gold-deep">{prev.ko}</span>
            </Link>
            <Link href={`/treatments/${next.slug}`} className="group flex flex-col items-end gap-1 text-right">
              <span className="inline-flex items-center gap-2 text-[13px] text-ink-mute">
                다음
                <ArrowRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="font-medium text-ink group-hover:text-gold-deep">{next.ko}</span>
            </Link>
          </nav>
        </div>
      </section>
    </>
  );
}
