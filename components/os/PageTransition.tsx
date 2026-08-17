"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Transisi antar-halaman waktu tab diganti.
 *
 * `initial={false}` di AnimatePresence penting: waktu halaman pertama kali
 * dibuka, elemen langsung dirender di kondisi akhirnya. Kalau nggak, HTML dari
 * server dan render pertama di klien beda — persis penyebab peringatan
 * hydration yang kemarin. Animasi masuk-keluar cuma jalan buat perpindahan
 * berikutnya, dan itu memang satu-satunya saat orang butuh isyaratnya.
 *
 * MotionConfig reducedMotion="user" bikin seluruh gerak framer-motion nurut
 * setelan sistem tanpa perlu dicek satu-satu.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <MotionConfig reducedMotion="user">
      {/* Tanpa mode="wait" dengan sengaja. Mode itu nahan konten baru sampai
          animasi keluar selesai — jeda ~240ms yang kebaca sebagai situs nge-lag,
          bukan sebagai transisi. Sekarang konten baru langsung dipasang. */}
      <AnimatePresence initial={false}>
        <motion.div
          key={pathname}
          className="page"
          // Opacity nggak pernah turun ke 0. Kalau animasinya macet di tengah,
          // yang paling buruk terjadi cuma isinya agak pudar — bukan hilang.
          // Aturan yang sama dipakai di seluruh animasi masuk, lihat globals.css.
          initial={{ opacity: 0.6, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.16, ease: [0.22, 0.9, 0.28, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
