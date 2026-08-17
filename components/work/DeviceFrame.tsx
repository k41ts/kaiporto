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
}: {
  ratio: Exclude<Ratio, "none">;
  shot?: Shot;
  priority?: boolean;
  sizes?: string;
}) {
  const screen = (
    <div className="shot" data-ratio={ratio}>
      {shot?.src ? (
        <Image
          className="shot-img"
          src={shot.src}
          alt={shot.alt}
          fill
          sizes={sizes}
          priority={priority}
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
