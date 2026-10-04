import { ArrowUpRight, CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { site } from "@/data/site";
import { PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "예약 · 상담",
  description:
    "카카오톡 상담, 네이버 실시간 예약, 전화 예약 중 편한 방법으로 문의하세요. 강남역 뤼미에르 피부과 예약·상담과 첫 방문 준비사항 안내.",
  path: "/reservation",
});

const channels = [
  {
    Icon: MessageCircle,
    en: "KakaoTalk",
    title: "카카오톡 상담",
    desc: "사진과 함께 궁금한 점을 편하게 남겨 주세요. 진료시간 내 순차적으로 답변드립니다.",
    cta: "카카오톡 채널 열기",
    href: site.links.kakao,
    external: true,
  },
  {
    Icon: CalendarCheck,
    en: "Naver Booking",
    title: "네이버 예약",
    desc: "원하는 날짜와 시간을 직접 선택해 실시간으로 예약할 수 있습니다.",
    cta: "네이버 예약하기",
    href: site.links.naverBooking,
    external: true,
    featured: true,
  },
  {
    Icon: Phone,
    en: "Call",
    title: "전화 예약",
    desc: `진료시간 내 전화 주시면 바로 예약을 도와드립니다.`,
    cta: site.phone,
    href: site.phoneHref,
    external: false,
  },
];

const notes = [
  "첫 방문 시 신분증을 지참해 주세요.",
  "시술 당일에는 가급적 메이크업을 가볍게 해 주세요.",
  "복용 중인 약이나 최근 받은 시술이 있다면 상담 시 알려 주세요.",
  "예약 변경·취소는 하루 전까지 연락 부탁드립니다.",
];

export default function ReservationPage() {
  return (
    <>
      <PageHero
        path="/reservation"
        eyebrow="Reservation"
        title="예약 · 상담"
        desc="편하신 방법으로 문의해 주세요. 전문의 상담으로 가장 알맞은 진료를 안내해 드립니다."
        crumbs={[{ label: "예약 · 상담" }]}
      />

      <section className="bg-white py-20 md:py-28">
        <div className="container-page">
          <ul className="grid gap-6 lg:grid-cols-3">
            {channels.map(({ Icon, en, title, desc, cta, href, external, featured }, i) => (
              <li key={title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group flex h-full flex-col p-8 transition-all duration-500 hover:-translate-y-1 md:p-10 ${
                    featured
                      ? "bg-ink text-ivory hover:shadow-[0_30px_60px_-30px_rgba(28,25,23,0.6)]"
                      : "border border-line bg-white hover:border-gold hover:shadow-[0_30px_60px_-35px_rgba(127,100,52,0.45)]"
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.25}
                    className={`size-10 ${featured ? "text-gold-soft" : "text-gold"}`}
                  />
                  <p className={`mt-10 font-display text-lg italic ${featured ? "text-gold-soft" : "text-gold-deep"}`}>
                    {en}
                  </p>
                  <h2 className="mt-1 font-serif-kr text-2xl">{title}</h2>
                  <p className={`mt-4 flex-1 text-[15px] ${featured ? "text-ivory/75" : "text-ink-soft"}`}>{desc}</p>
                  <span
                    className={`mt-10 flex items-center justify-between border-t pt-6 font-medium ${
                      featured ? "border-white/15" : "border-line"
                    }`}
                  >
                    {cta}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                  {external && <span className="sr-only">(새 창)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ivory py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-4">
            <p className="eyebrow">Before Visit</p>
            <h2 className="mt-4 font-serif-kr text-3xl text-ink">내원 전 안내</h2>
          </div>
          <div className="grid gap-12 lg:col-span-8 md:grid-cols-2">
            <ol data-reveal className="space-y-5">
              {notes.map((n, i) => (
                <li key={n} className="flex gap-4 text-ink-soft">
                  <span className="font-display text-lg text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                  {n}
                </li>
              ))}
            </ol>
            <dl data-reveal className="border-t border-ink">
              {site.hours.map((h) => (
                <div key={h.day} className="flex justify-between border-b border-line py-4 text-[15px]">
                  <dt className="text-ink-soft">{h.day}</dt>
                  <dd className="font-medium tabular-nums text-ink">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
