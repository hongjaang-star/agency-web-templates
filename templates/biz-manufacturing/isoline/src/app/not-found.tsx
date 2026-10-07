import Link from "next/link";

export default function NotFound() {
  return (
    <section className="ptop">
      <p className="kicker">404 · Sheet not found</p>
      <h1>없는 도면입니다.</h1>
      <p className="lead">품번이나 주소가 바뀌었을 수 있습니다. 부품 도면 목록에서 다시 찾아보세요.</p>
      <p><Link className="go" href="/parts/">부품 도면 목록</Link></p>
    </section>
  );
}
