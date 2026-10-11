import EquipmentGallery from "@/components/EquipmentGallery";
import ManufacturingMotion from "@/components/ManufacturingMotion";
import PageHead from "@/components/PageHead";
import JsonLd from "@/components/JsonLd";
import CategoryProcesses from "@/components/CategoryProcesses";
import { capability } from "@/data/content";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "설비·공정",
  description: "다이 설계부터 압출, 교정·절단, CNC 가공, 표면처리, 검사·포장까지 6단계 공정과 보유 설비, 카테고리별 제작 공정을 소개합니다.",
  path: "/capability",
});

export default function CapabilityPage() {
  return (
    <>
      <PageHead eyebrow="CAPABILITY" title="설비·공정" lead="도면 한 장에서 출하 검사까지 한 공장 안에서 진행합니다. 아래 설비와 수치는 데모용 가상 정보입니다." crumbs={[{ href: "/capability/", label: "설비·공정" }]} />
      <ManufacturingMotion />
      <section className="band">
        <div className="nums">{capability.numbers.map((n) => (<div key={n.label}><b>{n.value}</b><span>{n.unit} {n.label}</span></div>))}</div>
      </section>
      <section className="band">
        <h2>공정 6단계</h2>
        <ol className="steps">{capability.steps.map((s) => (<li key={s.no}><span className="mono">{s.no}</span><b>{s.title}</b><p>{s.body}</p></li>))}</ol>
      </section>
      <EquipmentGallery />
      <CategoryProcesses />
      <JsonLd data={breadcrumbSchema([{ href: "/capability", label: "설비·공정" }])} />
    </>
  );
}
