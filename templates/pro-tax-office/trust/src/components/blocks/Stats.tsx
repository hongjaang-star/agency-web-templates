import { stats } from "@/data/content";

export default function Stats() {
  return (
    <section aria-label="사무소 현황" className="border-b border-line bg-ivory">
      <dl className="container-page grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            data-reveal
            style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            className="border-line py-10 text-center odd:border-r md:border-r md:last:border-r-0"
          >
            <dd className="font-display text-4xl text-ink md:text-5xl">{s.value}</dd>
            <dt className="mt-2 text-sm text-ink-soft">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
