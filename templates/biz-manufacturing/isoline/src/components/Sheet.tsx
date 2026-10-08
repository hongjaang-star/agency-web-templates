import Link from "next/link";
import ProductImage from "./ProductImage";
import { categoryOf, type Product } from "@/data/catalog";

// 부품 한 장: 선화 + 이미지 설명 + 사양 표
export default function Sheet({ p }: { p: Product }) {
  const cat = categoryOf(p.category);
  return (
    <article className="sheet">
      <figure>
        <Link href={`/parts/${p.id}/`} aria-label={`${p.name} 상세 보기`}><ProductImage p={p} /></Link>
        <figcaption>{p.id} · AI 제작 제품 예시</figcaption>
      </figure>
      <div>
        <span className="code num">{p.id}</span>
        <h3><Link href={`/parts/${p.id}/`}>{p.name}</Link></h3>
        <p className="cat">{cat.name} · {cat.desc}</p>
        <p>{p.summary}</p>
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
