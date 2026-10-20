"use client";

import { useEffect, useRef } from "react";

const POOL = "般若鬼侍兜表裏蔵携礎全層構築開発者設計守攻面心刀電脳";

/**
 * Kanji yang "ter-decode": karakter acak lalu mengendap jadi kata aslinya.
 * `when="mount"` jalan sekali waktu halaman kebuka, `when="view"` waktu masuk layar.
 * HTML awal selalu berisi kata aslinya, jadi tanpa skrip tetap terbaca.
 */
export function Decode({ text, className, when = "view" }: { text: string; className?: string; when?: "mount" | "view" }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const final = [...text];
    let raf = 0;
    const run = () => {
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / 1400);
        el.textContent = final
          .map((c, i) => (p > (i + 1) / (final.length + 1) + 0.15 ? c : POOL[(Math.random() * POOL.length) | 0]))
          .join("");
        if (p < 1) raf = requestAnimationFrame(step);
        else el.textContent = text;
      };
      raf = requestAnimationFrame(step);
    };
    if (when === "mount") {
      document.fonts.ready.then(run);
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) {
        run();
        io.disconnect();
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, when]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
