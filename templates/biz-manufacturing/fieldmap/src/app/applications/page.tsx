import Link from "next/link";
import PageHead from "@/components/PageHead";
import JsonLd from "@/components/JsonLd";
import { applications, productsFor } from "@/data/catalog";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "적용 분야",
  description: "전기차 배터리, 반도체 장비, LED 조명, 로봇·자동화, 통신 장비, 의료기기 분야별로 필요한 조건과 맞는 알루미늄 부품을 정리했습니다.",
  path: "/applications",
});

export default function ApplicationsPage() {
  return (
    <>
      <PageHead eyebrow="APPLICATIONS" title="적용 분야" lead="분야마다 먼저 확인하는 조건이 다릅니다. 분야를 고르면 조건과 맞는 모델, 견적 때 알려 주실 내용을 볼 수 있습니다." crumbs={[{ href: "/applications/", label: "적용 분야" }]} />
      <section className="band">
        <ol className="app-list">
          {applications.map((a, i) => (
            <li key={a.id}>
              <Link href={`/applications/${a.id}/`}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <b>{a.name}</b>
                <span>{a.summary}</span>
                <em>{productsFor(a.id).length}종 →</em>
              </Link>
            </li>
          ))}
        </ol>
      </section>
      <JsonLd data={breadcrumbSchema([{ href: "/applications", label: "적용 분야" }])} />
    </>
  );
}
