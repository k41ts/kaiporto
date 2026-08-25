import { AdaptiveFrame } from "@/components/work/AdaptiveFrame";
import type { Device, Shot } from "@/lib/types";

/** Cover halaman detail. Bentuknya diurus [AdaptiveFrame]. */
export function CoverFrame({ shot, device, sizes }: { shot?: Shot; device: Device; sizes: string }) {
  return (
    <AdaptiveFrame
      shot={shot}
      initialRatio={device === "mobile" ? "mobile" : "banner"}
      sizes={sizes}
      priority
    />
  );
}
