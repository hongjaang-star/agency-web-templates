import { contactCopy as C, home, site } from "@/data/site";

export default function Visit() {
  return (
    <div className="visit up">
      <p className="big">
        {home.sections.visit.lines.map((l) => <span key={l}>{l}<br /></span>)}
        <a href={site.phoneHref}>{site.phone}</a>
      </p>
      <dl>
        <dt>{C.labels.address}</dt><dd>{site.address}</dd>
        <dt>{C.labels.walk}</dt><dd>{site.walk}</dd>
        <dt>{C.labels.hours}</dt><dd>{site.hours.map((h) => <span key={h.day}>{h.day} {h.time}<br /></span>)}</dd>
        <dt>{C.labels.parking}</dt><dd>{site.parking}</dd>
      </dl>
    </div>
  );
}
