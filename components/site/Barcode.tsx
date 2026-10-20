/** Batang barcode dekoratif. Pakai seed tetap, jadi bentuknya sama tiap kunjungan dan sama di server maupun klien. */
export function Barcode({ seed, className = "barcode", style }: { seed: number; className?: string; style?: React.CSSProperties }) {
  const bars: { x: number; w: number }[] = [];
  let s = seed;
  let x = 0;
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  while (x < 1000) {
    const w = 2 + Math.floor(rnd() * 14);
    const gap = 3 + Math.floor(rnd() * 12);
    bars.push({ x, w });
    x += w + gap;
  }
  return (
    <svg className={className} viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true" style={style}>
      <g fill="#0b0b0d">
        {bars.map((b, i) => (
          <rect key={i} x={b.x} y={0} width={b.w} height={100} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </g>
    </svg>
  );
}
