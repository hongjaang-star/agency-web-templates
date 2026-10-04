import { spaces } from "@/data/content";
import Image from "next/image";
import { assetPath } from "@/lib/config";
import { SectionTitle, TextLink } from "@/components/ui";

export default function Space() {
  const [main, ...rest] = spaces;
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionTitle
            eyebrow="Space"
            title="머무는 시간까지 편안하도록"
            desc="프라이빗한 동선과 1인 1실 시술실로 설계된 공간입니다."
          />
          <div data-reveal>
            <TextLink href="/about">병원 둘러보기</TextLink>
          </div>
        </div>
        <div className="mt-14 grid gap-x-5 gap-y-8 md:grid-cols-3">
          <figure data-reveal className="md:col-span-2 md:row-span-2">
            <div className="relative aspect-square overflow-hidden">
              <Image src={assetPath(main.image)} alt={`${main.name} — AI로 생성된 참고용 이미지`} fill sizes="(min-width: 768px) 60vw, 90vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[15px]">
              <span className="font-semibold text-ink">{main.name}</span>
              <span className="text-ink-soft">{main.desc}</span>
            </figcaption>
          </figure>
          {rest.slice(0, 2).map((s, i) => (
            <figure key={s.label} data-reveal style={{ ["--reveal-delay" as string]: `${(i + 1) * 90}ms` }}>
              <div className="relative aspect-square overflow-hidden">
                <Image src={assetPath(s.image)} alt={`${s.name} — AI로 생성된 참고용 이미지`} fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 text-[15px] font-semibold text-ink">{s.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
