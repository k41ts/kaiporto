"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Lapisan gerak yang tenang: `[data-rv]` naik pelan sekali waktu masuk layar
 * (bertahap antar saudara), `[data-in]` cuma dapat kelas `.in`. Tanpa skrip
 * atau dengan reduced motion, semuanya langsung tampil.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = [...document.querySelectorAll<HTMLElement>("[data-rv], [data-in]")];
    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((el) => {
      if (el.hasAttribute("data-rv")) {
        const sibs = [...(el.parentElement?.children ?? [])].filter((s) => s.hasAttribute("data-rv"));
        el.style.setProperty("--d", Math.min(sibs.indexOf(el), 5) * 80 + "ms");
        el.classList.add("rv");
      }
      io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
