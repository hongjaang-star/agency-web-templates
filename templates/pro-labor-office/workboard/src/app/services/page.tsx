import PageHero from "@/components/PageHero"; import ServiceExplorer from "@/components/ServiceExplorer"; import Link from "next/link";
export const metadata={title:"업무영역"};
export default function Services(){return <><PageHero eyebrow="PRACTICE AREAS" title="문제의 이름보다, 해결의 순서를 봅니다." desc="업무를 선택하면 주요 쟁점, 준비 자료, 진행 방식을 한눈에 확인할 수 있습니다."/><section className="section"><ServiceExplorer/></section><section className="notice"><b>FIRST CHECK</b><p>아직 어떤 업무에 해당하는지 모르셔도 괜찮습니다. 날짜와 자료를 먼저 보내주시면 확인 순서를 안내합니다.</p><Link className="btn primary" href="/contact">내 상황 정리하기</Link></section></>}
