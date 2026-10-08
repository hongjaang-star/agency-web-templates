"use client";
import Link from "next/link";
import { useQuote } from "./quote-store";

export default function QuoteCount() {
  const n = useQuote().length;
  return (
    <Link className="quote-btn" href="/quote/">
      견적 요청{n > 0 && <span className="badge" aria-label={`담은 제품 ${n}개`}>{n}</span>}
    </Link>
  );
}
