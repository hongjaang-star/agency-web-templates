import { site } from "@/data/site";
import { team } from "@/data/content";
import { CtaBand, PageHero, SectionTitle } from "@/components/ui";
import Team from "@/components/blocks/Team";
import JsonLd from "@/components/JsonLd";
import { teamSchemas } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "사무소 소개",
  description: `${site.area} ${site.nameShort}의 원칙과 구성원을 소개합니다. 국세청 출신 대표 세무사와 분야별 세무사가 직접 상담합니다.`,
  path: "/about",
});

const principles = [
  { title: "직접 상담", desc: "상담과 검토는 담당 세무사가 직접 합니다. 처음 상담한 사람이 끝까지 맡습니다." },
  { title: "사전 설명", desc: "예상 세액, 진행 방식, 보수를 시작 전에 문서로 설명합니다." },
  { title: "기한 관리", desc: "신고 기한과 준비 자료를 미리 알려 드리고 진행 상황을 공유합니다." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero path="/about" eyebrow="About" title="사무소 소개" desc={site.footerIntro.join(" ")} crumbs={[{ label: "사무소 소개" }]} />
      <JsonLd data={teamSchemas()} />

      <section className="py-24 md:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionTitle eyebrow="Greeting" title="세금은 결과보다 과정을 이해할 때 덜 불안합니다" />
          </div>
          <div data-reveal className="space-y-5 text-ink-soft md:text-[17px] lg:col-span-7">
            <p>
              세무 상담을 찾는 분들은 대개 기한과 금액 사이에서 불안해하십니다. {site.nameShort}은 그 불안을 줄이는 가장
              확실한 방법이 정확한 설명이라고 생각합니다.
            </p>
            <p>
              어떤 선택지가 있는지, 각각 세 부담이 어떻게 달라지는지, 무엇을 준비해야 하는지를 먼저 말씀드립니다. 결정은
              고객이 하고, 그 결정이 기한 안에 정확하게 신고되도록 끝까지 챙기는 것이 저희 일입니다.
            </p>
            <p className="pt-4 font-serif-kr text-xl text-ink">
              대표 세무사 {team[0].name}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-28">
        <div className="container-page">
          <SectionTitle eyebrow="Principles" title="일하는 원칙" align="center" />
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title} data-reveal className="border-t-2 border-ink bg-ivory p-8">
                <span className="font-display text-3xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-serif-kr text-xl text-ink">{p.title}</h3>
                <p className="mt-2 text-[15px] text-ink-soft">{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Team />
      <CtaBand />
    </>
  );
}
