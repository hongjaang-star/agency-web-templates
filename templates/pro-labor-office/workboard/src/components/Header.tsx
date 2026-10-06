import Link from "next/link";
const nav = [["사무소", "/office"], ["업무영역", "/services"], ["상담절차", "/process"], ["노무자료", "/resources"], ["문의", "/contact"]];
export default function Header(){return <><div className="demo">가상 업체 포트폴리오 데모 · 실제 사무소가 아닙니다</div><header className="header"><Link className="brand" href="/"><span>사이</span> LABOR OFFICE</Link><nav aria-label="주 메뉴">{nav.map(([n,h])=><Link key={h} href={h}>{n}</Link>)}</nav><Link className="headCta" href="/contact">상담 준비</Link></header></>}
