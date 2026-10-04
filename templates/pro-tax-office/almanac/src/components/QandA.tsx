import { faqs } from "@/data/content";

export default function QandA({ limit }: { limit?: number }) {
  return (
    <div className="qa rise">
      {faqs.slice(0, limit).map((f, i) => (
        <details key={f.q}>
          <summary>
            <span>Q{i + 1}</span>
            <span>{f.q}</span>
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
