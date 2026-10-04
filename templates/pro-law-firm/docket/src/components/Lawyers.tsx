import { lawyers } from "@/data/content";
import { attorneysCopy } from "@/data/site";

export default function Lawyers({ full = false }: { full?: boolean }) {
  return (
    <div className="lawyers up">
      {lawyers.map((l) => (
        <article className="lawyer" key={l.id} id={l.id}>
          <div className="mono" aria-hidden="true">{l.mark}</div>
          <h3>{l.name}</h3>
          <p className="role">{l.role} · {attorneysCopy.focus} {l.focus}</p>
          <q>{l.quote}</q>
          {full && (
            <ul aria-label={`${l.name} ${attorneysCopy.career}`}>
              {l.career.map((c) => <li key={c}>{c}</li>)}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}
