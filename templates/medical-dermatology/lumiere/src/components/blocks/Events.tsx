import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { events } from "@/data/content";
import { SectionTitle, TextLink } from "@/components/ui";

export default function Events() {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionTitle eyebrow="Events" title="이달의 뤼미에르" />
          <div data-reveal>
            <TextLink href="/events">이벤트 전체보기</TextLink>
          </div>
        </div>
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {events.map((ev, i) => (
            <li
              key={ev.slug}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              <Link
                href={`/events#${ev.slug}`}
                className="group flex h-full flex-col border border-line bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-[0_30px_60px_-35px_rgba(127,100,52,0.45)]"
              >
                <span className="font-display text-lg italic text-gold-deep">{ev.tag}</span>
                <h3 className="mt-4 font-serif-kr text-xl text-ink">{ev.title}</h3>
                <p className="mt-3 flex-1 text-[15px] text-ink-soft">{ev.subtitle}</p>
                <p className="mt-8 flex items-center justify-between border-t border-line pt-5 text-[13px] text-ink-mute">
                  {ev.period}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 text-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
