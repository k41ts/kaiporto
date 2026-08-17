import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/studio" }],
    sitemap: `${base}/sitemap.xml`,
  };
}
