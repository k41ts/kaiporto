/**
 * Logo: huruf Z dengan kursor terminal di sebelahnya.
 *
 * Digambar pakai `currentColor`, jadi warnanya ngikut teks di sekitarnya dan
 * nggak perlu versi kedua buat tema gelap. Sudutnya sengaja tajam — bentuknya
 * ngikut nada monospace di kepala jendela, bukan melawannya.
 */
export function Logo({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Zaidan Ikram"
      focusable="false"
    >
      <path
        d="M12 20 H40 L12 44 H36"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Alasnya rata dengan kaki Z (y=44). Waktu kursornya menggantung
          lebih rendah, di ukuran kecil dia kebaca sebagai koma, bukan kursor. */}
      <rect x="46" y="24" width="9" height="20" fill="currentColor" />
    </svg>
  );
}
