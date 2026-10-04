import Link from "next/link";
import { site } from "@/data/site";

export default function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const main = tone === "dark" ? "text-ink" : "text-ivory";
  return (
    <Link href="/" className="group inline-flex flex-col leading-none">
      <span className={`font-display text-[1.7rem] font-medium tracking-[0.18em] ${main}`}>{site.nameEn}</span>
      <span
        className={`mt-1 text-[10px] font-medium tracking-[0.42em] ${
          tone === "dark" ? "text-gold-deep" : "text-gold-soft"
        }`}
      >
        {site.logoSub}
      </span>
      <span className="sr-only">{site.nameShort} 홈</span>
    </Link>
  );
}
