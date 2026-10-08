import FieldRing from "@/components/FieldRing";
import Ld from "@/components/Ld";
import PageTop from "@/components/PageTop";
import { applications } from "@/data/catalog";
import { crumbs } from "@/lib/schema";
import { meta } from "@/lib/seo";

export const metadata = meta("적용 분야", `${applications.map((a) => a.name).join(", ")} 분야별로 먼저 보는 조건과 맞는 알루미늄 부품 도면을 한 장씩 보여 드립니다.`, "/fields");

export default function FieldsPage() {
  return (
    <>
      <PageTop kicker="Application" title="어디에 쓰실 부품인가요?" lead="분야를 선택하면 설계에서 확인할 조건과 관련 제품을 함께 보여 드립니다. 제품 이름을 눌러 상세 사양과 가공 옵션을 확인하세요." trail={[{ href: "/fields/", label: "적용 분야" }]} />
      <section className="sec flush"><FieldRing /></section>
      <Ld data={crumbs([{ href: "/fields", label: "적용 분야" }])} />
    </>
  );
}
