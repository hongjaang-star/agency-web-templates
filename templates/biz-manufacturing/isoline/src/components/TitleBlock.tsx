import { categoryOf, type Product } from "@/data/catalog";

// 도면 표제란: 품번·명칭·재질·분류·최소 주문·납기
export default function TitleBlock({ p }: { p: Product }) {
  const material = p.spec["재질"] ?? "-";
  return (
    <dl className="tblock">
      <div className="wide"><dt>명칭</dt><dd>{p.name}</dd></div>
      <div><dt>품번</dt><dd className="num">{p.id}</dd></div>
      <div><dt>분류</dt><dd>{categoryOf(p.category).name}</dd></div>
      <div><dt>재질</dt><dd className="num">{material}</dd></div>
      <div><dt>최소 주문</dt><dd className="num">{p.moq}</dd></div>
      <div><dt>납기</dt><dd className="num">{p.lead}</dd></div>
      <div><dt>척도</dt><dd className="num">NTS</dd></div>
    </dl>
  );
}
