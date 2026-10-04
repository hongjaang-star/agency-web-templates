import Image from "next/image";
import { MapPin, TrainFront } from "lucide-react";
import { images, site } from "@/data/site";
import { ButtonLink, SectionTitle } from "@/components/ui";
import { assetPath } from "@/lib/config";

export default function Visit() {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden lg:col-span-6 lg:aspect-auto">
          <Image
            src={assetPath(images.visit)}
            alt="정갈하게 놓인 타월과 스킨케어 용품"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
        <div className="lg:col-span-6">
          <SectionTitle eyebrow="Visit Us" title="뤼미에르에서 기다리겠습니다" />
          <dl data-reveal className="mt-10 divide-y divide-line border-y border-line">
            {site.hours.map((h) => (
              <div key={h.day} className="flex items-center justify-between py-4">
                <dt className="text-ink-soft">{h.day}</dt>
                <dd className="font-medium tabular-nums text-ink">{h.time}</dd>
              </div>
            ))}
          </dl>
          <div data-reveal className="mt-8 space-y-3 text-[15px] text-ink-soft">
            <p className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold" />
              {site.address}
            </p>
            <p className="flex gap-3">
              <TrainFront aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold" />
              {site.subway}
            </p>
          </div>
          <div data-reveal className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/reservation">예약 · 상담하기</ButtonLink>
            <ButtonLink href="/location" variant="outline">
              오시는 길
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
