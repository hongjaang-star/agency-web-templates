import Link from "next/link";
import Ld from "@/components/Ld";
import PageTop from "@/components/PageTop";
import PartLines from "@/components/PartLines";
import { categories, products } from "@/data/catalog";
import { crumbs } from "@/lib/schema";
import { meta } from "@/lib/seo";

export const metadata = meta("부품 도면 목록", `방열판, 압출 프로파일, 하우징·케이스, 정밀 가공 브래킷 ${products.length}종을 선화와 품번, 재질, 납기로 정리한 도면 목록입니다.`, "/parts");

export default function PartsPage() {
  return (
    <>
      <PageTop kicker="Drawing index" title="부품 도면 목록" lead="카테고리별로 부품을 도면 한 장씩 모았습니다. 장을 누르면 표제란과 사양, 이미지 설명이 있는 상세 도면이 열립니다." trail={[{ href: "/parts/", label: "PARTS" }]} />
      {categories.map((cat, i) => (
        <section key={cat.id} id={cat.id} className="sec cat-sec">
          <div className="cat-head"><span className="num">DWG-{String(i + 1).padStart(2, "0")}</span><h2>{cat.name}</h2><p>{cat.desc}</p><p className="num proc">{cat.process}</p></div>
          <ul className="cards">
            {products.filter((p) => p.category === cat.id).map((p) => (
              <li key={p.id}>
                <Link href={`/parts/${p.id}/`}>
                  <PartLines category={p.category} dims />
                  <span className="num code">{p.id}</span>
                  <b>{p.name}</b>
                  <small className="num">{p.spec["재질"]} · MOQ {p.moq} · {p.lead}</small>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <Ld data={crumbs([{ href: "/parts", label: "부품 도면 목록" }])} />
    </>
  );
}
