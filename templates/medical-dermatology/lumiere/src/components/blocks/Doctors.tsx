import { doctors } from "@/data/content";
import Image from "next/image";
import { assetPath } from "@/lib/config";
import { SectionTitle, TextLink } from "@/components/ui";

export default function Doctors() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-page">
        <SectionTitle
          align="center"
          eyebrow="Doctors"
          title="피부과 전문의가 직접 진료합니다"
          desc="각 분야를 깊이 있게 다뤄 온 세 명의 전문의가 협진합니다."
        />
        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {doctors.map((d, i) => (
            <li
              key={d.name}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-full">
                <Image src={assetPath(d.image)} alt={`${d.name} 원장 설정의 AI 생성 참고용 인물`} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="object-cover" />
              </div>
              <div className="mt-6 text-center">
                <p className="text-[13px] tracking-wider text-gold-deep">{d.specialty}</p>
                <p className="mt-2 font-serif-kr text-2xl text-ink">
                  {d.name} <span className="text-base text-ink-soft">{d.role}</span>
                </p>
                <p className="mt-1 text-sm text-ink-mute">피부과 전문의</p>
              </div>
            </li>
          ))}
        </ul>
        <div data-reveal className="mt-14 text-center">
          <TextLink href="/doctors">의료진 소개</TextLink>
        </div>
      </div>
    </section>
  );
}
