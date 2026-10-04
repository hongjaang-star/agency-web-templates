"use client";

import { useEffect } from "react";

/**
 * Observes every [data-reveal] element (including ones added by client navigation)
 * and marks it visible when it enters the viewport.
 * Content stays readable without JS; the `.js` class on <html> opts into the animation.
 *
 * No "already observed" flag is kept on the element: observing the same element twice
 * is a no-op, and a flag would survive React Strict Mode's effect re-run while the
 * observer that set it is disconnected — leaving content invisible in development.
 */
export default function RevealObserver() {
  useEffect(() => {
    const show = (el: Element) => ((el as HTMLElement).dataset.visible = "true");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const scan = () =>
      document.querySelectorAll("[data-reveal]:not([data-visible])").forEach((el) => io.observe(el));

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
