"use client";

import { useState } from "react";
import { DeviceFrame } from "@/components/work/DeviceFrame";
import type { Ratio } from "@/lib/layout";
import type { Shot } from "@/lib/types";

type Shape = Exclude<Ratio, "none">;

/**
 * Bingkai yang bentuknya ngikut gambarnya, bukan kolom `device` entrinya.
 *
 * Dulu bentuknya diputusin dari `device`: entri bertanda mobile selalu dapat
 * bodi HP 9:19.5. Itu keliru buat cover, karena cover sering banner yang
 * sengaja didesain melintang — dijejelin ke kotak setinggi HP, yang kelihatan
 * cuma lajur tengahnya.
 *
 * Aturannya sekarang: gambar melintang dapat bingkai browser dengan rasio
 * persis file aslinya, gambar tegak dapat bodi HP. `initialRatio` cuma
 * tebakan sebelum gambarnya kebaca, biar nggak ada kotak salah ukuran yang
 * keburu kelihatan.
 */
export function AdaptiveFrame({
  shot,
  initialRatio,
  sizes,
  priority = false,
}: {
  shot?: Shot;
  initialRatio: Shape;
  sizes: string;
  priority?: boolean;
}) {
  const [ratio, setRatio] = useState<Shape>(initialRatio);
  const [aspect, setAspect] = useState<string | undefined>(undefined);

  return (
    <DeviceFrame
      ratio={ratio}
      shot={shot}
      priority={priority}
      sizes={sizes}
      aspect={aspect}
      onLoad={(w, h) => {
        const landscape = w >= h;
        // Yang tegak selalu jadi bodi HP. Yang melintang tetap pakai bingkai
        // browser — kalau tebakannya tadi HP, dinaikin ke bingkai desktop.
        setRatio(landscape ? (initialRatio === "mobile" ? "desktop" : initialRatio) : "mobile");
        setAspect(landscape ? `${w} / ${h}` : undefined);
      }}
    />
  );
}
