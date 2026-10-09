import {site} from "@/data/site";
export default function CompanyDirections(){return <section className="band company-directions">
 <div className="company-section-head"><div><p className="eyebrow">VISIT & CONTACT</p><h2>오시는 길.</h2></div><p>현재 업체 주소는 가상 정보입니다.<br/>아래는 반월 산업단지 일대의 참고 지도입니다.</p></div>
 <div className="directions-layout"><div className="company-map"><iframe title="반월 산업단지 일대 참고 지도 — 실제 사업장 위치 아님" src="https://www.openstreetmap.org/export/embed.html?bbox=126.72%2C37.29%2C126.83%2C37.35&layer=mapnik" loading="lazy"/><div className="map-caption"><span>REFERENCE MAP / 사업장 핀 없음</span><a href="https://www.openstreetmap.org/#map=13/37.32/126.775" target="_blank" rel="noopener noreferrer">지도 크게 보기 ↗</a></div></div>
 <div className="directions-contact"><p className="eyebrow">SEROGYEOL PRECISION</p><h3>방문 전에 연락해 주세요.</h3><p>공장 방문과 샘플 상담은 사전 예약을 기준으로 안내합니다. 실제 납품 시 사업장 주소와 연락처로 교체합니다.</p><dl><div><dt>주소</dt><dd>{site.address}</dd></div><div><dt>대표전화</dt><dd>{site.phone}</dd></div><div><dt>이메일</dt><dd>{site.email}</dd></div><div><dt>근무 시간</dt><dd>{site.hours}</dd></div></dl><a className="btn" href="mailto:quote@example.co.kr">방문 상담 메일 작성 ↗</a></div></div>
 </section>;}
