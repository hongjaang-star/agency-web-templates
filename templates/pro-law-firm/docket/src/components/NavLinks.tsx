"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/data/site";

export default function NavLinks() {
  const path = usePathname().replace(/\/$/, "") || "/";
  return (
    <ul>
      {nav.map((n) => (
        <li key={n.href}>
          <Link href={n.href} aria-current={path === n.href || path.startsWith(n.href + "/") ? "page" : undefined}>
            {n.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
