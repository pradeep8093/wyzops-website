"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One tiny client island that powers the site's ambient interactions, so the
 * sections themselves can stay Server Components:
 *
 *  • [data-reveal]     → gets [data-visible] once scrolled into view
 *  • [data-anim]       → gets [data-inview] while visible (loops pause off-screen)
 *  • [data-spotlight]  → receives --mx / --my for the cursor-following glow
 */
export function SiteEffects() {
  const pathname = usePathname();

  // Scroll reveals + off-screen animation pausing (re-run per route).
  useEffect(() => {
    const revealEls = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-visible])");
    const animEls = document.querySelectorAll<HTMLElement>("[data-anim]");

    if (!("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.setAttribute("data-visible", ""));
      animEls.forEach((el) => el.setAttribute("data-inview", ""));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "");
            revealObserver.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );

    const animObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.toggleAttribute("data-inview", entry.isIntersecting);
        }
      },
      { rootMargin: "120px 0px" },
    );

    revealEls.forEach((el) => revealObserver.observe(el));
    animEls.forEach((el) => animObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      animObserver.disconnect();
    };
  }, [pathname]);

  // Cursor spotlight (fine pointers only), throttled to one write per frame.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let lastEvent: PointerEvent | null = null;

    const update = () => {
      frame = 0;
      const event = lastEvent;
      if (!event) return;
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-spotlight]");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      target.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    const onMove = (event: PointerEvent) => {
      lastEvent = event;
      if (!frame) frame = requestAnimationFrame(update);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
