"use client";

import { useEffect, useRef } from "react";
import { fundchain } from "@/content/site";

/**
 * Simulasi 3D peran Tech Lead di FundChain. Markup-nya dirender React (supaya
 * langkah-langkahnya tetap terbaca tanpa JS/WebGL); scene Three.js dimuat
 * belakangan lewat dynamic import biar nggak memberatkan bundle awal.
 */
export function LeadSim() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;
    import("./lead-sim.js").then(({ mountLeadSim }) => {
      if (cancelled || !root.current) return;
      dispose = mountLeadSim(root.current, {
        phases: fundchain.steps.map((s) => [s.title, s.caption]),
        streams: fundchain.streams,
      });
    });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <div ref={root}>
      <div className="sim" data-sim>
        <div className="sim-bar">
          <span className="mono">fundchain.sim</span>
          <span className="mono sim-phase" data-phase>01 · {fundchain.steps[0].title}</span>
          <div className="sim-ctl">
            <button type="button" data-prev aria-label="Previous step"><svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 3 5 8l5 5" /></svg></button>
            <button type="button" data-play aria-label="Pause">
              <span data-ic-pause style={{ display: "grid" }}><svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="3.5" height="12" rx="1" /><rect x="9.5" y="2" width="3.5" height="12" rx="1" /></svg></span>
              <span data-ic-play style={{ display: "grid" }} hidden><svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2.5v11l9-5.5z" /></svg></span>
            </button>
            <button type="button" data-next aria-label="Next step"><svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 3 5 5-5 5" /></svg></button>
          </div>
        </div>
        <div className="sim-stage" data-stage role="img" aria-label="3D scene: two hands shape scattered documents into a chrome figure, which stands, reaches out to the Backend, Blockchain, Frontend and UI, and QA workstreams, is let go, and becomes the core of a system running in production">
          <canvas data-gl />
          <div className="sim-tags" data-tags aria-hidden="true" />
          <div className="hud" aria-hidden="true">
            <i className="br a" /><i className="br b" /><i className="br c" /><i className="br d" />
            <span className="hud-tl mono">SIM / FUNDCHAIN · PROJECT BFD</span>
            <span className="hud-tr mono"><span className="dot" />LIVE · VERCEL + SEPOLIA</span>
            <span className="hud-bl mono" data-cam>AZ 000° · EL 25°</span>
            <span className="hud-br mono">DRAG TO ORBIT</span>
          </div>
          <p className="sim-cap" data-cap aria-live="polite"><b>{fundchain.steps[0].title}</b><span>{fundchain.steps[0].caption}</span></p>
          <p className="nogl-msg">This 3D view needs WebGL. The six steps below tell the same story.</p>
        </div>
        <div className="sim-progress" data-prog aria-hidden="true">
          {fundchain.steps.map((s) => <span key={s.title}><i /></span>)}
        </div>
      </div>
      <ol className="steps" data-steps>
        {fundchain.steps.map((s, i) => (
          <li key={s.title}>
            <button type="button" data-i={i} aria-current={i === 0 ? "step" : undefined}>
              <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              <span><b>{s.title}</b>{s.text}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
