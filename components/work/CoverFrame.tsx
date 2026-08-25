"use client";

import { useState } from "react";
import { DeviceFrame } from "@/components/work/DeviceFrame";
import type { Device, Shot } from "@/lib/types";

/**
 * Bingkai cover di halaman detail.
 *
 * Sebelumnya bentuk bingkainya diambil dari kolom `device`: entri bertanda
 * mobile selalu dapat bodi HP 9:19.5. Itu keliru buat cover, karena cover
 * nggak selalu tangkapan layar — sering banner yang sengaja didesain lebar.
 * Banner 16:9 yang dijejelin ke kotak setinggi HP kepotong jadi lajur sempit,
 * dan yang kelihatan cuma bagian tengahnya.
 *
 * Sekarang bentuknya ngikut gambarnya sendiri: lebar dapat bingkai browser,
 * tegak dapat bodi HP. `device` cuma dipakai buat tebakan awal sebelum
 * gambarnya kebaca, biar nggak ada kotak salah ukuran yang keburu kelihatan.
 */
export function CoverFrame({ shot, device, sizes }: { shot?: Shot; device: Device; sizes: string }) {
  const [ratio, setRatio] = useState<"mobile" | "banner">(device === "mobile" ? "mobile" : "banner");
  // Buat cover melintang, kotaknya dibikin sama persis dengan rasio gambarnya.
  // Rasio tetap 16:7 bakal motong banner 16:9 di bagian atas dan bawah, dan
  // yang kepotong itu justru sering baris terakhir teksnya.
  const [aspect, setAspect] = useState<string | undefined>(undefined);

  return (
    <DeviceFrame
      ratio={ratio}
      shot={shot}
      priority
      sizes={sizes}
      aspect={aspect}
      onLoad={(w, h) => {
        const landscape = w >= h;
        setRatio(landscape ? "banner" : "mobile");
        setAspect(landscape ? `${w} / ${h}` : undefined);
      }}
    />
  );
}
