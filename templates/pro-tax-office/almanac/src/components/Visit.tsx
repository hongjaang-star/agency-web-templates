import { home, site } from "@/data/site";

export default function Visit() {
  return (
    <div className="visit rise">
      <p className="big">
        {home.sections.visit.lines.map((l) => (
          <span key={l}>
            {l}
            <br />
          </span>
        ))}
        <a href={site.phoneHref}>{site.phone}</a>
      </p>
      <dl>
        <dt>주소</dt>
        <dd>{site.address}</dd>
        <dt>지하철</dt>
        <dd>{site.subway}</dd>
        <dt>상담 시간</dt>
        <dd>
          {site.hours.map((h) => (
            <span key={h.day}>
              {h.day} {h.time}
              <br />
            </span>
          ))}
        </dd>
        <dt>주차</dt>
        <dd>{site.parking}</dd>
      </dl>
    </div>
  );
}
