import { team } from "@/data/content";
import { SectionTitle, TextLink } from "@/components/ui";
import Image from "next/image";
import { assetPath } from "@/lib/config";

export default function Team() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionTitle eyebrow="Our People" title="분야별 세무사가 직접 맡습니다" />
          <TextLink href="/about">사무소 소개</TextLink>
        </div>
        <ul className="mt-14 grid gap-8 md:grid-cols-3">
          {team.map((m) => (
            <li key={m.name} data-reveal className="premium-card">
              <div className="portrait-frame relative aspect-[3/4] bg-night">
                <Image src={assetPath(m.image)} alt={`${m.name} ${m.role}의 가상 프로필 사진`} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover object-top" />
                <p className="absolute bottom-3 left-4 text-[10px] text-paper/65">AI로 생성된 참고용 이미지</p>
              </div>
              <div className="p-7">
              <div className="flex items-center gap-5">
                <div>
                  <p className="font-serif-kr text-2xl text-ink">{m.name}</p>
                  <p className="text-sm text-gold-deep">{m.role}</p>
                </div>
              </div>
              <p className="mt-6 text-[15px] font-semibold text-ink">{m.focus}</p>
              <ul className="mt-3 space-y-1 text-sm text-ink-soft">
                {m.career.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="mt-6 border-l-2 border-gold pl-4 text-[15px] italic text-ink-soft">“{m.quote}”</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
