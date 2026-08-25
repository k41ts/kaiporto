import { getSiteUrl } from "@/lib/content";

/**
 * IndexNow — ngasih tahu mesin pencari kalau ada halaman baru atau berubah,
 * tanpa nunggu mereka mampir sendiri.
 *
 * Yang ikut protokol ini: Bing, Yandex, Naver, Seznam. Satu kiriman nyampe ke
 * semuanya. **Google nggak ikut** dan nggak punya padanannya buat halaman
 * biasa — Indexing API mereka cuma sah buat lowongan kerja dan siaran
 * langsung, dan ping sitemap udah dimatikan sejak 2023. Buat Google jalannya
 * tetap sitemap yang selalu segar plus Search Console.
 *
 * Kuncinya sengaja nggak rahasia: dia harus bisa diunduh siapa pun di
 * /<kunci>.txt, dan itu justru cara mesin pencari mastiin yang ngirim memang
 * pemilik domainnya.
 */
export const INDEXNOW_KEY = "0500852a58a30b44d2c499078503b061";

const ENDPOINT = "https://api.indexnow.org/indexnow";

/**
 * Kirim daftar URL. Gagal di sini nggak boleh ngerusak apa pun — entri yang
 * udah kesimpen tetap kesimpen walau mesin pencarinya lagi ngambek.
 */
export async function pingIndexNow(paths: string[]): Promise<void> {
  const base = getSiteUrl();
  const host = new URL(base).hostname;

  // Localhost nggak ada gunanya dikirim, dan cuma bikin log penuh error.
  if (host === "localhost" || host.endsWith(".local") || host.startsWith("127.")) return;

  const urlList = [...new Set(paths)].map((p) => `${base}${p}`);
  if (urlList.length === 0) return;

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${base}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
      // Kalau mereka lambat, kita nggak nungguin. Ini kabar, bukan transaksi.
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.warn(`IndexNow nolak: ${res.status} ${res.statusText}`);
  } catch (error) {
    console.warn("IndexNow gagal dikirim:", error instanceof Error ? error.message : error);
  }
}
