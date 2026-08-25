import Image from "next/image";
import type { Ratio } from "@/lib/layout";
import type { Shot } from "@/lib/types";

/**
 * Bingkai ngikutin perangkatnya (§03): desktop dapat bar browser dan rasio
 * 16:10, HP dapat bodi ber-poni dan rasio 9:19.5. Satu komponen ini dipakai di
 * grid, di halaman detail, dan di galeri.
 */
export function DeviceFrame({
  ratio,
  shot,
  priority = false,
  sizes = "(max-width: 720px) 100vw, 50vw",
  onLoad,
  aspect,
}: {
  ratio: Exclude<Ratio, "none">;
  shot?: Shot;
  priority?: boolean;
  sizes?: string;
  /** Ukuran asli gambarnya, buat pemanggil yang bentuk bingkainya ngikut isi. */
  onLoad?: (naturalWidth: number, naturalHeight: number) => void;
  /** Rasio khusus, mis. "16 / 9". Nimpa rasio bawaan `ratio`. */
  aspect?: string;
}) {
  const screen = (
    <div className="shot" data-ratio={ratio} style={aspect ? { aspectRatio: aspect } : undefined}>
      {shot?.src ? (
        <Image
          className="shot-img"
          src={shot.src}
          alt={shot.alt}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={onLoad ? (e) => onLoad(e.currentTarget.naturalWidth, e.currentTarget.naturalHeight) : undefined}
          // Gambar yang udah ada di cache kadang selesai sebelum React sempat
          // pasang handler, dan `onLoad` nggak pernah kepanggil. Jadi ukurannya
          // juga dibaca langsung waktu elemennya nempel, kalau sudah selesai.
          ref={
            onLoad
              ? (el) => {
                  if (el?.complete && el.naturalWidth) onLoad(el.naturalWidth, el.naturalHeight);
                }
              : undefined
          }
        />
      ) : (
        <span className="shot-empty" aria-hidden="true">
          no screenshot yet
        </span>
      )}
    </div>
  );

  if (ratio === "mobile") {
    return <div className="frame-mobile">{screen}</div>;
  }

  return (
    <div className="frame-desktop">
      <div className="bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <i className="url" />
      </div>
      {screen}
    </div>
  );
}
