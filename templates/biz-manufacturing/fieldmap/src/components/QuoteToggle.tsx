"use client";
import { toggleQuote, useQuote } from "./quote-store";

export default function QuoteToggle({ id, wide = false }: { id: string; wide?: boolean }) {
  const list = useQuote();
  const on = list.includes(id);
  return (
    <button type="button" className={`add${wide ? " wide" : ""}`} aria-pressed={on} onClick={() => toggleQuote(id)}>
      {on ? "견적에 담김 ✓" : "견적에 담기"}
    </button>
  );
}
