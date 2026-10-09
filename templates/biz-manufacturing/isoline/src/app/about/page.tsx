import Ld from "@/components/Ld";
import PageTop from "@/components/PageTop";
import { about } from "@/data/content";
import { site } from "@/data/site";
import { crumbs } from "@/lib/schema";
import { meta } from "@/lib/seo";
import Link from "next/link";
import HistoryStory from "@/components/HistoryStory";
import GrowthChart from "@/components/GrowthChart";
import Certificates from "@/components/Certificates";
import PartnerMarquee from "@/components/PartnerMarquee";
import VisitMap from "@/components/VisitMap";

export const metadata = meta("회사 소개", `${site.nameKo}의 가상 연혁과 시대별 공장 이미지, 성장 그래프, 가상 인증서와 산업 분야, 지역 지도 예시를 소개합니다.`, "/about");

export default function AboutPage() {
  return (
    <>
      <PageTop kicker="About" title="선을 읽는 공장" lead={about.intro} trail={[{ href: "/about/", label: "ABOUT" }]} />
      <nav className="company-jump" aria-label="회사 소개 바로가기"><a href="#history">연혁</a><a href="#growth">성장 지표</a><a href="#certificates">인증과 기록</a><a href="#visit">오시는 길</a></nav>
      <HistoryStory />
      <GrowthChart />
      <PartnerMarquee />
      <section className="sec"><p className="kicker">Working together</p><h2>설계부터 양산 검토까지</h2><div className="quality-grid">
        <article><h3>도면 검토</h3><p>소재와 공차, 표면처리를 확인하고 압출·절삭·접합 중 제품에 맞는 가공 경로를 정합니다.</p><Link className="more" href="/parts/">제품과 가공 옵션 →</Link></article>
        <article><h3>시제품 확인</h3><p>장착면과 조립성을 먼저 확인합니다. 수정할 치수와 검사 항목을 정리해 양산 도면의 기준으로 삼습니다.</p><Link className="more" href="/process/">제작·검사 흐름 →</Link></article>
        <article><h3>반복 생산 준비</h3><p>도면 개정, 발주 수량, 검사 성적서와 포장 조건을 정리합니다. 납기는 소재·공정·수량에 따라 협의합니다.</p><Link className="more" href="/rfq/">견적 준비 →</Link></article>
      </div></section>
      <Certificates />
      <VisitMap />
      <Ld data={crumbs([{ href: "/about", label: "회사" }])} />
    </>
  );
}
