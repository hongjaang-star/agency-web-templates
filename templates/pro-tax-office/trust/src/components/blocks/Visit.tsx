import { Clock, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui";

export default function Visit() {
  return (
    <section className="border-t border-line bg-cream py-24 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
        <div data-reveal>
          <p className="eyebrow">Visit</p>
          <h2 className="mt-4 font-serif-kr text-3xl text-ink md:text-4xl">{site.cta.text}</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={site.phoneHref}>전화 상담 {site.phone}</ButtonLink>
            <ButtonLink href={site.links.kakao} variant="outline" external>
              카카오톡 상담
            </ButtonLink>
          </div>
        </div>
        <dl data-reveal className="space-y-6 border-l-2 border-gold pl-8 text-[15px]">
          <div className="flex gap-4">
            <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold" />
            <div>
              <dt className="sr-only">주소</dt>
              <dd className="text-ink">{site.address}</dd>
              <dd className="text-ink-soft">{site.subway}</dd>
            </div>
          </div>
          <div className="flex gap-4">
            <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold" />
            <div>
              <dt className="sr-only">상담 시간</dt>
              {site.hours.map((h) => (
                <dd key={h.day} className="text-ink-soft">
                  <span className="mr-3 text-ink">{h.day}</span>
                  {h.time}
                </dd>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <Phone aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold" />
            <div>
              <dt className="sr-only">연락처</dt>
              <dd className="text-ink">{site.phone}</dd>
              <dd className="text-ink-soft">{site.email}</dd>
            </div>
          </div>
        </dl>
      </div>
    </section>
  );
}
