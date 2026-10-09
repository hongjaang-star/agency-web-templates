import { site } from "@/data/site";

export default function VisitMap() {
  return <section className="sec" id="visit"><div className="sec-head"><div><p className="kicker">Visit us / demo location</p><h2>오시는 길</h2></div><p className="lead">시화국가산업단지 일대의 지도 예시입니다.<br />가상 공장의 실제 방문 주소는 제공하지 않습니다.</p></div>
    <div className="visit-layout"><div className="map-panel"><iframe title="시화국가산업단지 일대 지도 · 가상 공장 위치 예시" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=126.69%2C37.30%2C126.76%2C37.35&layer=mapnik" /><div className="map-label">시화국가산업단지 · 지역 지도 예시</div></div><div className="visit-info"><h3>세로결정밀 / 생산동</h3><p>{site.address}</p><dl><dt>운영 시간</dt><dd>{site.hours}</dd><dt>방문·납품 안내 예시</dt><dd>방문 일정과 목적, 차량·납품 품목을 사전에 확인하는 흐름입니다. 실제 방문 시에는 해당 업체의 주소와 안내를 확인하세요.</dd><dt>준비 자료</dt><dd>도면 개정번호, 샘플, 검토할 치수와 요청 수량</dd></dl><div className="request-actions"><a className="go" href="https://www.openstreetmap.org/#map=14/37.3250/126.7250" target="_blank" rel="noreferrer">큰 지도 보기 ↗</a><a className="outline-button" href="https://map.naver.com/p/search/%EC%8B%9C%ED%99%94%EA%B5%AD%EA%B0%80%EC%82%B0%EC%97%85%EB%8B%A8%EC%A7%80" target="_blank" rel="noreferrer">네이버 지도 검색 ↗</a></div><small className="hint">지도 연결이 원활하지 않으면 큰 지도 보기로 확인하세요.</small></div></div>
  </section>;
}
