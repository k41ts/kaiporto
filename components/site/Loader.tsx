"use client";

import { useEffect, useState } from "react";
import { INTRO_KEY, profile } from "@/content/site";



/** Baris status mengikuti persentase. */
const LINES: [number, string][] = [
  [0, "Booting profile"],
  [22, "Loading capabilities"],
  [48, "Compiling the FundChain scene"],
  [74, "Fetching shipped products"],
  [100, "Ready"],
];

/**
 * Layar intro 0–100%. Angkanya mengikuti loading sungguhan (font + event
 * `load`), dengan durasi minimum supaya animasinya terbaca dan batas maksimum
 * supaya koneksi lambat nggak tertahan. Muncul sekali per sesi; skrip kecil di
 * <head> (layout.tsx) menyembunyikannya sebelum paint kalau sudah pernah lihat.
 */
export function Loader() {
  const [gone, setGone] = useState(false);
  const [pct, setPct] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.intro === "seen") {
      setGone(true);
      return;
    }
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Pendek: pengunjung dari LinkedIn langsung lihat isi, bukan nunggu animasi.
    const MIN = reduce ? 300 : 900, MAX = 2500;
    const t0 = performance.now();
    const timers: ReturnType<typeof setTimeout>[] = [];
    let ready = false, raf = 0, shown = 0;

    const loaded = new Promise<void>((r) => (document.readyState === "complete" ? r() : addEventListener("load", () => r(), { once: true })));
    Promise.all([document.fonts?.ready, loaded]).then(() => (ready = true));

    const finish = () => {
      timers.push(setTimeout(() => setExit(true), 120));
      timers.push(setTimeout(() => {
        html.dataset.intro = "seen";
        html.classList.remove("intro-lock");
        try { sessionStorage.setItem(INTRO_KEY, "1"); } catch {}
        setGone(true);
      }, reduce ? 500 : 900));
    };
    const tick = (now: number) => {
      // timestamp rAF bisa sedikit lebih awal dari t0, jadi jangan sampai negatif
      const t = Math.max(0, now - t0);
      const cap = (ready && t > MIN) || t > MAX ? 100 : Math.min(92, (t / MIN) * 92);
      shown += (cap - shown) * (reduce ? 1 : .12);
      if (cap === 100 && shown > 99.5) shown = 100;
      setPct(Math.max(0, Math.min(100, Math.floor(shown))));
      if (shown < 100) raf = requestAnimationFrame(tick);
      else finish();
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
  }, []);

  if (gone) return null;
  const steps = LINES.slice(0, -1);

  return (
    <div className={exit ? "intro out" : "intro"} aria-hidden="true" style={{ "--p": pct / 100 } as React.CSSProperties}>
      <div className="intro-grid" />
      <div className="intro-in">
        <div className="intro-copy">
          <span className="eyebrow">Booting zaidan.profile</span>
          <b className="intro-name">{profile.name}</b>
          <span className="intro-role">Full-stack engineer and tech lead · {profile.location}</span>
          <ol className="intro-log">
            {steps.map(([at, text], i) => {
              const next = (steps[i + 1]?.[0] ?? 100);
              const state = pct >= next ? "done" : pct >= at ? "run" : "wait";
              return (
                <li key={text} className={state}>
                  <span className="mark">{state === "done" ? "✓" : state === "run" ? <i className="spin" /> : "·"}</span>
                  <span>{text}</span>
                  <span className="mono">{state === "done" ? "ok" : state === "run" ? "…" : ""}</span>
                </li>
              );
            })}
          </ol>
          <div className="intro-meter">
            <div className={pct === 100 ? "intro-num tab done" : "intro-num tab"}>{pct}<sup>%</sup></div>
            <div className="intro-bar"><i /></div>
          </div>
        </div>

        <div className="intro-console">
          <div className="console-bar">
            <i /><i /><i />
            <span className="mono">zaidan.profile</span>
            <span className="mono live"><span className={pct === 100 ? "dot" : "dot wait"} />{pct === 100 ? "Ready" : "Loading"}</span>
          </div>
          <div className="intro-shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/zaidan-head.webp" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
