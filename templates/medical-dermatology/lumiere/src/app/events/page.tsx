import { CalendarDays, Check } from "lucide-react";
import { events } from "@/data/content";
import { medicalNotice } from "@/data/site";
import { ButtonLink, MedicalNotice, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "이벤트",
  description:
    "강남역 뤼미에르 피부과 이달의 이벤트. 첫 방문 피부 정밀 진단, 가을 스킨부스터 프로그램, 시그니처 리프팅 프로그램을 안내합니다.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <>
      <PageHero
        path="/events"
        eyebrow="Events"
        title="이벤트"
        desc="계절과 피부 컨디션에 맞춘 뤼미에르의 프로그램을 소개합니다."
        crumbs={[{ label: "이벤트" }]}
      />

      <section className="bg-white py-20 md:py-28">
        <div className="container-page space-y-8">
          {events.map((ev) => (
            <article
              key={ev.slug}
              id={ev.slug}
              data-reveal
              aria-labelledby={`${ev.slug}-title`}
              className="grid scroll-mt-40 border border-line md:grid-cols-12"
            >
              <div className="flex flex-col justify-between gap-10 bg-cream p-8 md:col-span-4 md:p-10">
                <span className="font-display text-4xl italic text-gold-deep">{ev.tag}</span>
                <p className="inline-flex items-center gap-2 text-sm text-ink-soft">
                  <CalendarDays aria-hidden="true" className="size-4 text-gold" />
                  {ev.period}
                </p>
              </div>
              <div className="p-8 md:col-span-8 md:p-12">
                <h2 id={`${ev.slug}-title`} className="font-serif-kr text-2xl text-ink md:text-3xl">
                  {ev.title}
                </h2>
                <p className="mt-4 text-ink-soft md:text-[17px]">{ev.subtitle}</p>
                <ul className="mt-8 space-y-3 border-t border-line pt-8">
                  {ev.items.map((it) => (
                    <li key={it} className="flex items-center gap-3 text-[15px] text-ink">
                      <Check aria-hidden="true" className="size-4 text-gold" />
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <ButtonLink href="/reservation">이벤트 상담하기</ButtonLink>
                </div>
              </div>
            </article>
          ))}

          <MedicalNotice text={`이벤트 내용은 병원 사정에 따라 변경되거나 조기 종료될 수 있습니다. ${medicalNotice}`} />
        </div>
      </section>
    </>
  );
}
