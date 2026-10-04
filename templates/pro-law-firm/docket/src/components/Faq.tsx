import { faqs } from "@/data/content";

export default function Faq({ limit }: { limit?: number }) {
  return (
    <div className="faq up">
      {faqs.slice(0, limit).map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
