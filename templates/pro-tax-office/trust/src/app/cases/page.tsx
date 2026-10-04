import { cases } from "@/data/content";
import { CtaBand, MedicalNotice, PageHero } from "@/components/ui";
import { CaseCard } from "@/components/blocks/Cases";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "업무 사례",
  description: "상속세, 기장대리, 세무조사 대응, 경정청구 등 업무 유형별 진행 예시를 소개합니다.",
  path: "/cases",
});

export default function CasesPage() {
  return (
    <>
      <PageHero path="/cases" eyebrow="Cases" title="업무 사례" desc="어떤 상황에서 어떻게 진행하는지 유형별 예시로 보여 드립니다." crumbs={[{ label: "업무 사례" }]} />
      <section className="py-20 md:py-28">
        <div className="container-page">
          <MedicalNotice text="아래 사례는 업무 유형을 설명하기 위한 예시이며 특정 고객의 실제 결과가 아닙니다. 결과는 개별 사실관계에 따라 달라집니다." />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {cases.map((c) => (
              <CaseCard key={c.title} c={c} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
