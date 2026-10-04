"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/data/site";

export default function MastNav() {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  return (
    <nav aria-label="주요 메뉴">
      <ul>
        {nav.map((n) => {
          const current = pathname === n.href || pathname.startsWith(n.href + "/");
          return (
            <li key={n.href}>
              <Link href={n.href} aria-current={current ? "page" : undefined}>
                {n.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
