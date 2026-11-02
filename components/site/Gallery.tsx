"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Shot } from "@/content/site";
import { ChevronLeft, ChevronRight, Close } from "@/components/site/icons";

/**
 * Screenshot satu proyek. Layar HP (lebih tinggi dari lebar) dijajarkan, layar
 * desktop jadi grid dengan yang pertama paling besar. Klik buka lightbox.
 */
export function Gallery({ shots, name }: { shots: Shot[]; name: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [idx, setIdx] = useState(0);
  const go = (i: number) => setIdx((i + shots.length) % shots.length);
  const phone = shots[0] && shots[0].height > shots[0].width;
  const shot = shots[idx];

  return (
    <>
      <div className={phone ? "gallery phone" : "gallery desk"} data-rv>
        {shots.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Open screenshot ${i + 1} of ${shots.length}: ${s.alt}`}
            onClick={(e) => {
              opener.current = e.currentTarget;
              setIdx(i);
              dialog.current?.showModal();
            }}
          >
            <Image src={s.src} alt="" width={s.width} height={s.height} sizes={phone ? "(max-width: 560px) 45vw, 180px" : i === 0 ? "(max-width: 980px) 100vw, 720px" : "(max-width: 980px) 50vw, 360px"} />
          </button>
        ))}
      </div>

      <dialog
        className="lb"
        ref={dialog}
        aria-label={`${name} screenshots`}
        onClose={() => opener.current?.focus()}
        onClick={(e) => { if (e.target === dialog.current) dialog.current?.close(); }}
        onKeyDown={(e) => { if (e.key === "ArrowRight") go(idx + 1); if (e.key === "ArrowLeft") go(idx - 1); }}
      >
        <div className="lb-bar">
          <span className="mono count">{name} · {idx + 1} of {shots.length}</span>
          <button type="button" onClick={() => go(idx - 1)} aria-label="Previous screenshot"><ChevronLeft /></button>
          <button type="button" onClick={() => go(idx + 1)} aria-label="Next screenshot"><ChevronRight /></button>
          <button type="button" onClick={() => dialog.current?.close()} aria-label="Close"><Close /></button>
        </div>
        {shot && (
          <figure>
            <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="(max-width: 1100px) 94vw, 1060px" />
            <figcaption>{shot.alt}.</figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
