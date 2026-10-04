import Link from "next/link";
import Almanac from "@/components/Almanac";
import Folio from "@/components/Folio";
import SectionHead from "@/components/SectionHead";
import { deadlines, monthlyDeadlines } from "@/data/content";
import { getService } from "@/data/services";
import { almanacCopy, calendarCopy as K, home, pages, seoPages } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

const P = pages.calendar;
export const metadata = pageMetadata({ ...seoPages.calendar, path: "/calendar" });

export default function CalendarPage() {
  return (
    <>
      <Folio path="/calendar" kicker={P.no} title={P.title} lead={P.desc} crumbs={[{ label: P.no }]} />
      <section className="sec" aria-labelledby="now-h">
        <div className="wrap">
          <SectionHead id="now-h" no={home.sections.almanac.no} title={home.sections.almanac.title} />
          <Almanac />
        </div>
      </section>
      <section className="sec" aria-labelledby="all-h">
        <div className="wrap">
          <SectionHead id="all-h" no={K.table.no} title={K.table.title} />
          <table className="ledger rise">
            <thead>
              <tr>{K.cols.map((c) => <th scope="col" key={c}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {deadlines.map((d) => {
                const s = d.service ? getService(d.service) : undefined;
                return (
                  <tr key={d.item + d.month}>
                    <th scope="row">{d.month}월</th>
                    <td className="date">{d.month}월 {d.day}일</td>
                    <td><b>{d.item}</b><span>{d.who}</span></td>
                    <td>{s && <Link href={`/services/${s.slug}`}>{s.ko} →</Link>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {monthlyDeadlines.map((m) => (
            <p className="monthly" key={m.item}><span className="sec-no">{K.monthly}</span><b>{m.day}일 · {m.item}</b><span>{m.who}</span></p>
          ))}
          <p className="alm-note">{almanacCopy.note}</p>
        </div>
      </section>
    </>
  );
}
