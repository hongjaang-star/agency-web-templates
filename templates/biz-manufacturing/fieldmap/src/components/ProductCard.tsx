import Link from "next/link";
import ProductImage from "./ProductImage";
import QuoteToggle from "./QuoteToggle";
import { applicationOf, categoryOf, type Product } from "@/data/catalog";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="prod">
      <figure>
        <span className="code">{p.id}</span>
        <Link href={`/products/${p.id}/`} aria-label={`${p.name} 상세 보기`}><ProductImage p={p} /></Link>
      </figure>
      <div className="prod-body">
        <h3><Link href={`/products/${p.id}/`}>{p.name}</Link></h3>
        <p className="product-summary">{p.summary}</p>
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
