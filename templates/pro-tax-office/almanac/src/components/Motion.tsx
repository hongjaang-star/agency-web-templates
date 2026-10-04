"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** .draw(괘선 그리기)·.rise(떠오름) 요소가 화면에 들어오면 .on 을 붙인다. JS 가 없으면 처음부터 보인다. */
export default function Motion() {
  const pathname = usePathname();
  useEffect(() => {
    const els = document.querySelectorAll(".draw:not(.on), .rise:not(.on)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("on"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
