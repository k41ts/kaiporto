"use client";

import { useEffect, useRef } from "react";

const PHRASE: [string, string][] = [
  ["全層構築", "Full-stack"],
  ["表", "Interface"],
  ["裏", "Backend"],
  ["蔵", "Data"],
  ["携", "Mobile"],
  ["礎", "Architecture"],
];

/** Pita hitam berjalan. Pelan saat diam, ngebut dan miring mengikuti kecepatan scroll. */
export function Band() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let off = 0;
    let lastY = scrollY;
    let vel = 0;
    let raf = 0;
    const loop = () => {
      const dy = scrollY - lastY;
      lastY = scrollY;
      vel += (dy - vel) * 0.12;
      off += 0.6 + Math.abs(vel) * 0.5;
      const half = el.scrollWidth / 2 || 1;
      el.style.transform = `translateX(${-(off % half)}px) skewX(${Math.max(-10, Math.min(10, -vel * 0.3)).toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const half = (
    <span>
      {PHRASE.map(([k, w]) => (
        <span key={w} style={{ display: "contents" }}>
          <span className="kj">{k}</span>
          {w}
          <i />
        </span>
      ))}
    </span>
  );

  return (
    <div className="band" aria-hidden="true">
      <div className="band-track" ref={track}>
        {half}
        {half}
      </div>
    </div>
  );
}
