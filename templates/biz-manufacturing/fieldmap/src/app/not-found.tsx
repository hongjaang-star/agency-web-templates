import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-head">
      <p className="eyebrow">404</p>
      <h1>찾는 페이지가 없습니다.</h1>
      <p className="lead">품번이나 주소가 바뀌었을 수 있습니다. 제품 찾기에서 분야와 카테고리로 다시 찾아보세요.</p>
      <p><Link className="btn" href="/products/">제품 찾기</Link></p>
    </section>
  );
}
