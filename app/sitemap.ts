import type { MetadataRoute } from "next";
import { getPublishedEntries, getSiteUrl } from "@/lib/content";

/** Dibangkitkan dari isi konten — begitu entri diterbitkan, URL-nya langsung masuk. */
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
    lastModified: new Date(entry.publishedAt),
    changeFrequency: "yearly",
    priority: entry.featured ? 0.8 : 0.7,
  }));

  return [...staticRoutes, ...entryRoutes];
}
