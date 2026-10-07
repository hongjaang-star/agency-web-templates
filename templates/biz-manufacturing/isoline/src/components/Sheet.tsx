import Link from "next/link";
import PartLines from "./PartLines";
import { categoryOf, type Product } from "@/data/catalog";

// 부품 한 장: 선화 + 이미지 설명 + 사양 표
export default function Sheet({ p }: { p: Product }) {
  const cat = categoryOf(p.category);
  return (
    <article className="sheet">
      <figure>
        <PartLines category={p.category} />
        <figcaption><b>이미지 설명</b> {p.image}</figcaption>
      </figure>
      <div>
        <span className="code num">{p.id}</span>
        <h3><Link href={`/parts/${p.id}/`}>{p.name}</Link></h3>
        <p className="cat">{cat.name} · {cat.desc}</p>
        <table className="spec">
          <tbody>
            {Object.entries(p.spec).map(([k, v]) => (<tr key={k}><th scope="row">{k}</th><td className="num">{v}</td></tr>))}
            <tr><th scope="row">최소 주문 · 납기</th><td className="num">{p.moq} · {p.lead}</td></tr>
          </tbody>
        </table>
      </div>
    </article>
  );
}
