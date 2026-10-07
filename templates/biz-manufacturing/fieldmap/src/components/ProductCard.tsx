import Link from "next/link";
import Drawing from "./Drawing";
import QuoteToggle from "./QuoteToggle";
import { applicationOf, categoryOf, type Product } from "@/data/catalog";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="prod">
      <figure>
        <span className="code">{p.id}</span>
        <Drawing category={p.category} />
        <figcaption><b>이미지 설명</b> {p.image}</figcaption>
      </figure>
      <div className="prod-body">
        <h3><Link href={`/products/${p.id}/`}>{p.name}</Link></h3>
        <div className="tags">
          <span>{categoryOf(p.category).name}</span>
          {p.apps.map((a) => <span key={a}>{applicationOf(a).name}</span>)}
        </div>
        <dl className="spec">
          {Object.entries(p.spec).map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
          <div><dt>최소 주문</dt><dd>{p.moq}</dd></div>
          <div><dt>납기</dt><dd>{p.lead}</dd></div>
        </dl>
        <QuoteToggle id={p.id} />
      </div>
    </article>
  );
}
