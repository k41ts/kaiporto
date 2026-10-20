"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Shot } from "@/content/site";
import { ChevronLeft, ChevronRight, Close } from "@/components/site/icons";

/** Urutan HP di kipas (indeks ke daftar shot): tengah = layar utama. */
const ORDER = [1, 3, 0, 2, 4];
const LABELS = ["home", "add record", "transaction history", "spending analytics", "parent pairing"];

/** Lima layar KaiCash yang terbuka seperti kipas; tiap layar bisa dibuka di lightbox. */
export function KaiCashFan({ shots }: { shots: Shot[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [idx, setIdx] = useState(0);
  const go = (i: number) => setIdx((i + shots.length) % shots.length);
  const shot = shots[idx];

  return (
    <>
      <div className="fan" data-in>
        {ORDER.map((i) => (
          <button
            key={i}
            className="phone"
            type="button"
            aria-label={`Open the ${LABELS[i]} screen`}
            onClick={(e) => {
              opener.current = e.currentTarget;
              setIdx(i);
              dialog.current?.showModal();
            }}
          >
            <Image src={shots[i].src} alt="" width={shots[i].width} height={shots[i].height} sizes="210px" />
          </button>
        ))}
      </div>

      <dialog
        className="lb"
        ref={dialog}
        aria-label="KaiCash screen"
        onClose={() => opener.current?.focus()}
        onClick={(e) => { if (e.target === dialog.current) dialog.current?.close(); }}
        onKeyDown={(e) => { if (e.key === "ArrowRight") go(idx + 1); if (e.key === "ArrowLeft") go(idx - 1); }}
      >
        <div className="lb-bar">
          <span className="count">{idx + 1} of {shots.length}</span>
          <button type="button" onClick={() => go(idx - 1)} aria-label="Previous screen"><ChevronLeft /></button>
          <button type="button" onClick={() => go(idx + 1)} aria-label="Next screen"><ChevronRight /></button>
          <button type="button" onClick={() => dialog.current?.close()} aria-label="Close"><Close /></button>
        </div>
        <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="420px" />
        <p>{shot.alt}.</p>
      </dialog>
    </>
  );
}
