import type { MetadataRoute } from "next";
import { getPublishedEntries, getSiteUrl } from "@/lib/content";

/**
 * Tanpa baris ini sitemap dibangkitkan sekali waktu build lalu dibekukan —
 * entri yang diterbitkan lewat Studio nggak akan pernah masuk sampai ada
 * deploy berikutnya. Halaman /work nggak kena karena dia punya ISR sendiri,
 * jadi bedanya gampang kelewat: daftarnya kelihatan terbarui padahal yang
 * dibaca mesin pencari masih daftar lama.
 */
export const revalidate = 60;

/** Dibangkitkan dari isi konten yang statusnya published. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/work`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const published = await getPublishedEntries();
  const entryRoutes: MetadataRoute.Sitemap = published.map((entry) => ({
    url: `${base}/work/${entry.slug}`,
    // `lastmod` diambil dari kapan entrinya terakhir diubah, bukan kapan
    // diterbitkan. Kalau pakai tanggal terbit, entri yang ditulis ulang total
    // tetap kelihatan basi buat mesin pencari dan nggak dijemput ulang.
    lastModified: new Date(entry.updatedAt || entry.publishedAt),
    changeFrequency: "yearly",
    priority: entry.featured ? 0.8 : 0.7,
  }));

  return [...staticRoutes, ...entryRoutes];
}
