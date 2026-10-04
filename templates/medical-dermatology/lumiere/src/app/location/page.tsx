import { Car, MapPin, Phone, TrainFront } from "lucide-react";
import { site } from "@/data/site";
import { ButtonLink, CtaBand, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "오시는 길",
  description:
    `${site.address}. ${site.subway}. 평일 10:00–20:00, 토요일 10:00–16:00 진료, 일요일·공휴일 휴진.`,
  path: "/location",
});

export default function LocationPage() {
  const info = [
    { Icon: MapPin, label: "주소", value: site.address },
    { Icon: TrainFront, label: "지하철", value: site.subway },
    { Icon: Car, label: "주차", value: site.parking },
    { Icon: Phone, label: "전화", value: site.phone, href: site.phoneHref },
  ];

  return (
    <>
      <PageHero
        path="/location"
        eyebrow="Location"
        title="오시는 길"
        desc="강남역 3번 출구에서 도보 3분 거리에 있습니다."
        crumbs={[{ label: "오시는 길" }]}
      />

      <section className="bg-white py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          {/* Map placeholder — replace with Naver/Kakao map embed */}
          <div
            data-reveal
            className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-cream lg:col-span-7 lg:aspect-auto lg:min-h-[480px]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-60 [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:48px_48px]"
            />
            <div className="relative flex flex-col items-center gap-3 text-center">
              <span className="inline-flex size-14 items-center justify-center rounded-full bg-ink text-gold-soft shadow-lg">
                <MapPin aria-hidden="true" className="size-6" />
              </span>
              <p className="font-display text-2xl tracking-[0.2em] text-ink">LUMIÈRE</p>
              <p className="text-sm text-ink-soft">지도 API 연동 영역</p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ul data-reveal className="divide-y divide-line border-y border-line">
              {info.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex gap-5 py-6">
                  <Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-gold" strokeWidth={1.5} />
                  <div>
                    <p className="text-[13px] text-ink-mute">{label}</p>
                    {href ? (
                      <a href={href} className="mt-1 block text-ink hover:text-gold-deep">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-ink">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div data-reveal className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={site.links.naverMap} external>
                네이버 지도
              </ButtonLink>
              <ButtonLink href={site.links.kakaoMap} variant="outline" external>
                카카오맵
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-4">
            <p className="eyebrow">Clinic Hours</p>
            <h2 className="mt-4 font-serif-kr text-3xl text-ink">진료시간</h2>
            <p className="mt-4 text-ink-soft">원활한 진료를 위해 예약 후 내원을 권해 드립니다.</p>
          </div>
          <dl data-reveal className="border-t border-ink lg:col-span-8">
            {site.hours.map((h) => (
              <div key={h.day} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-6">
                <dt className="text-lg text-ink">{h.day}</dt>
                <dd className="text-right">
                  <span className="font-display text-2xl tabular-nums text-ink">{h.time}</span>
                  {"note" in h && h.note && <span className="block text-[13px] text-ink-mute">{h.note}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
