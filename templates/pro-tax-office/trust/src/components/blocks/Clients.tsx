import { Building2, Home, Laptop, Store } from "lucide-react";
import { clients } from "@/data/content";
import { SectionTitle } from "@/components/ui";

const icons = { store: Store, building: Building2, laptop: Laptop, home: Home } as const;

export default function Clients() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <SectionTitle eyebrow="Who We Help" title="이런 분들과 함께합니다" align="center" />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {clients.map((c) => {
            const Icon = icons[c.icon];
            return (
              <li key={c.title} data-reveal className="premium-card p-8">
                <Icon aria-hidden="true" className="size-8 text-gold" strokeWidth={1.4} />
                <h3 className="mt-6 font-serif-kr text-xl text-ink">{c.title}</h3>
                <p className="mt-2 text-[15px] text-ink-soft">{c.desc}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
