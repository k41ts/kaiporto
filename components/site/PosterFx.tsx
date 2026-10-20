"use client";

import { useEffect, useRef } from "react";

/** Titik mata di gambar topeng, dalam pecahan lebar/tinggi gambarnya. */
const EYES: [number, number][] = [
  [0.387, 0.406],
  [0.613, 0.406],
];

/**
 * Efek poster: poster tenggelam & topeng naik waktu lembar putih menutupinya,
 * dan reticle yang mengikuti kursor lalu mengunci ke mata topeng.
 */
export function PosterFx() {
  const ret = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLElement>(null);

  useEffect(() => {
    const poster = document.getElementById("top");
    const mask = document.getElementById("mask");
    if (!poster || !mask) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: (() => void)[] = [];

    if (!reduce && matchMedia("(min-width: 761px)").matches) {
      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const p = Math.min(1, scrollY / innerHeight);
          poster.style.transform = `scale(${1 - p * 0.06})`;
          poster.style.filter = `brightness(${1 - p * 0.4})`;
          mask.style.transform = `translateY(${-p * 10}%) scale(${1 + p * 0.08})`;
          ticking = false;
        });
      };
      addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => removeEventListener("scroll", onScroll));
    }

    const r = ret.current;
    if (fine && !reduce && r) {
      let tx = 0, ty = 0, cx = 0, cy = 0, inside = false, raf = 0;
      const loop = () => {
        cx += (tx - cx) * 0.25;
        cy += (ty - cy) * 0.25;
        r.style.transform = `translate(${cx}px, ${cy}px)`;
        raf = inside || Math.abs(tx - cx) > 0.5 ? requestAnimationFrame(loop) : 0;
      };
      const move = (e: PointerEvent) => {
        inside = true;
        r.classList.add("on");
        let x = e.clientX, y = e.clientY, lock = false;
        const box = mask.getBoundingClientRect();
        for (const [fx, fy] of EYES) {
          const ex = box.left + box.width * fx, ey = box.top + box.height * fy;
          if (Math.hypot(ex - x, ey - y) < 90) { x = ex; y = ey; lock = true; }
        }
        tx = x; ty = y;
        r.classList.toggle("lock", lock);
        if (label.current) label.current.textContent = lock ? "LOCK 般若" : `X ${String(Math.round(x)).padStart(4, "0")}  Y ${String(Math.round(y)).padStart(4, "0")}`;
        if (!raf) raf = requestAnimationFrame(loop);
      };
      const leave = () => { inside = false; r.classList.remove("on"); };
      poster.addEventListener("pointermove", move);
      poster.addEventListener("pointerleave", leave);
      cleanups.push(() => { poster.removeEventListener("pointermove", move); poster.removeEventListener("pointerleave", leave); cancelAnimationFrame(raf); });
    }
    return () => cleanups.forEach((f) => f());
  }, []);

  return (
    <div className="reticle" ref={ret} aria-hidden="true">
      <i /><i /><i /><i />
      <b ref={label}>SCAN</b>
    </div>
  );
}
