import { doctors } from "@/data/content";
import Image from "next/image";
import { assetPath } from "@/lib/config";
import { CtaBand, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { physicianSchemas } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "의료진 소개",
  description:
    "리프팅·안티에이징, 색소·레이저, 여드름·피부질환을 각각 전문으로 하는 피부과 전문의 3인이 직접 진단하고 시술합니다. 강남역 뤼미에르 피부과 의료진 소개.",
  path: "/doctors",
});

export default function DoctorsPage() {
  return (
    <>
      <JsonLd data={physicianSchemas()} />
      <PageHero
        path="/doctors"
        eyebrow="Doctors"
        title="의료진 소개"
        desc="각 분야를 깊이 있게 다뤄 온 피부과 전문의가 직접 진료합니다."
        crumbs={[{ label: "의료진" }]}
      />

      <section className="bg-white py-20 md:py-28">
        <div className="container-page space-y-24 md:space-y-32">
          {doctors.map((d, i) => (
            <article
              key={d.name}
              aria-labelledby={`doctor-${i}`}
              className="grid gap-10 md:grid-cols-12 md:items-center md:gap-12"
            >
              <div
                data-reveal
                className={`md:col-span-5 ${i % 2 === 1 ? "md:order-2 md:col-start-8" : ""}`}
              >
                <div className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-t-full">
                  <Image src={assetPath(d.image)} alt={`${d.name} 원장 설정의 AI 생성 참고용 인물`} fill sizes="(min-width: 768px) 384px, 90vw" className="object-cover" />
                </div>
              </div>
              <div
                data-reveal
                className={`md:col-span-6 ${i % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}
              >
                <p className="eyebrow">{d.specialty}</p>
                <h2 id={`doctor-${i}`} className="mt-4 font-serif-kr text-3xl text-ink md:text-4xl">
                  {d.name}
                  <span className="ml-3 text-lg text-ink-soft">{d.role}</span>
                </h2>
                <blockquote className="mt-8 border-l-2 border-gold pl-6 font-serif-kr text-lg leading-relaxed text-ink-soft">
                  “{d.quote}”
                </blockquote>
                <ul className="mt-10 space-y-3 border-t border-line pt-8 text-[15px] text-ink-soft">
                  {d.career.map((c) => (
                    <li key={c} className="flex items-center gap-3">
                      <span aria-hidden="true" className="size-1 rounded-full bg-gold" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
