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
      <PageTop kicker="Application" title="적용 분야" lead="분야 이름을 누르면 그 분야에서 먼저 보는 조건과 맞는 부품 도면이 펼쳐집니다. 주소 끝의 #분야 로 바로 공유할 수 있습니다." trail={[{ href: "/fields/", label: "FIELDS" }]} />
      <section className="sec flush"><FieldRing /></section>
      <Ld data={crumbs([{ href: "/fields", label: "적용 분야" }])} />
    </>
  );
}
